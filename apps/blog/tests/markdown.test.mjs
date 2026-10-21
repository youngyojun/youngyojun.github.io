import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { markdownOptions } from '../lib/markdown.ts';
import { plainText } from '../lib/text.ts';

const renderer = await createMarkdownProcessor(markdownOptions);

test('renders mathcal, subscripts and literal set braces at build time', async () => {
  const { code } = await renderer.render(String.raw`$\mathcal{O}(n^2)$, $a_i$, $\{a_i\}$`);
  assert.ok(code.includes('class="katex"'));
  assert.match(code, /class="[^"]*\bmathcal\b/);
  assert.ok(code.includes('<math'));
  assert.ok(!code.includes('katex-error'));
  assert.ok(!code.includes('MathJax'));
});

test('keeps ordinary code mentioning math errors separate from a rendered math failure', async () => {
  const valid = await renderer.render('The identifier `katex-error` is code, not invalid math.');
  assert.ok(!/<span\b[^>]*class="katex-error"/.test(valid.code));
  await assert.rejects(renderer.render(String.raw`$\DefinitelyUnsupportedMathCommand$`), /Could not render math|Undefined control sequence/);
});

test('renders display math and table formulas without losing code or HTML captions', async () => {
  const source = String.raw`$$
\sum_{i=0}^{n} a_i = \frac{n(n+1)}{2}
$$

| 수식 | 설명 |
| --- | --- |
| $\lvert x\rvert$ | 절댓값 |

<figure><figcaption>그림 설명</figcaption></figure>

\`\`\`cpp
const char* latex = "\\mathcal{O}";
\`\`\`
`.replaceAll('\\`', '`');
  const { code } = await renderer.render(source);
  assert.ok(code.includes('katex-display'));
  assert.ok(code.includes('<table>'));
  assert.ok(code.includes('<figcaption>그림 설명</figcaption>'));
  assert.ok(code.includes('data-language="cpp"'));
  assert.ok(!code.includes('katex-error'));
});

test('renders math inside HTML captions and headings while preserving attributes and literal code', async () => {
  const { code } = await renderer.render(String.raw`#### Lemma 3. $D _{*, *}$의 행의 단조성

<figure><figcaption style="text-align: center;"><b>그림 $X$</b>: $D _{i, *}$ &amp; 설명 <code>$literal$</code></figcaption></figure>

<p style="text-align: center;">두 문자열 $X$, $Y$에 대하여, $x _i = y _j$인 모든 위치쌍 $(i, j)$</p>`);
  const caption = code.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/)?.[1];
  assert.ok(caption?.includes('class="katex"'), caption);
  assert.ok(!caption.includes('$X$'));
  assert.ok(!caption.includes('$D'));
  assert.ok(plainText(caption).includes('& 설명'));
  assert.ok(caption.includes('<code>$literal$</code>'));
  assert.match(code, /<h4\b[^>]*>Lemma 3\. <span class="katex"/);
  assert.match(code, /<p style="text-align: center;">두 문자열 <span class="katex"/);
  await assert.rejects(renderer.render(String.raw`<figcaption>$\DefinitelyUnsupportedMathCommand$</figcaption>`), /Could not render math|Undefined control sequence/);
});

test('leaves escaped Markdown dollars and code literal when expanding HTML math', async () => {
  const { code } = await renderer.render(String.raw`Escaped \$x\$ and \`$code$\`.

<p title="$attribute$">Escaped \$y\$ and <code>$code$</code>, but $z$ is math.</p>`.replaceAll('\\`', '`'));
  assert.equal((code.match(/class="katex"/g) ?? []).length, 1);
  assert.ok(plainText(code).includes('Escaped $x$ and $code$.'));
  assert.ok(code.includes('title="$attribute$"'));
});
