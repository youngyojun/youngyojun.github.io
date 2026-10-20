import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { markdownOptions } from '../lib/markdown.ts';

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
