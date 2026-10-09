import assert from 'node:assert/strict';
import { test } from 'node:test';
import { satteri } from '@astrojs/markdown-satteri';
import config from '../astro.config.mjs';

const renderer = await (config.markdown?.processor ?? satteri()).createRenderer({});

test('keeps bare about-page email addresses as text while preserving explicit email links', async () => {
  const source = 'contact@example.com and [Email](mailto:contact@example.com)';
  const { code } = await renderer.render(source, { fileURL: new URL('../../../about/index.md', import.meta.url) });
  assert.equal((code.match(/href="mailto:contact@example.com"/g) ?? []).length, 1);
  assert.ok(code.includes('contact@example.com and <a'));
  const post = await renderer.render(source);
  assert.equal((post.code.match(/href="mailto:contact@example.com"/g) ?? []).length, 2);
});

test('ignores the original about page Jekyll layout while preserving its other metadata and Astro layouts', async () => {
  const { metadata } = await renderer.render('# Who Am I?', {
    fileURL: new URL('../../../about/index.md', import.meta.url),
    frontmatter: { title: '저를 소개합니다! :D', layout: 'page', type: 'about' },
  });
  assert.deepEqual(metadata.frontmatter, { title: '저를 소개합니다! :D', type: 'about' });
  const astro = await renderer.render('# Page', {
    fileURL: new URL('../src/pages/example.md', import.meta.url),
    frontmatter: { layout: '../layouts/BaseLayout.astro' },
  });
  assert.equal(astro.metadata.frontmatter.layout, '../layouts/BaseLayout.astro');
  const other = await renderer.render('# Page', {
    fileURL: new URL('../src/pages/example.md', import.meta.url),
    frontmatter: { layout: 'page' },
  });
  assert.equal(other.metadata.frontmatter.layout, 'page');
});

test('preserves subscripts and Jekyll-escaped braces for MathJax', async () => {
  const { code } = await renderer.render(String.raw`$G_i \\{ e \\}$`);
  assert.ok(code.includes(String.raw`\(G_i \{ e \}\)`), code);
  assert.ok(!code.includes('<em>'), code);
});

test('keeps block math outside code blocks and preserves HTML captions', async () => {
  const { code } = await renderer.render('$$\nx_1\n$$\n\n<p>그림 $e$</p>');
  assert.ok(code.includes(String.raw`\[x_1\]`), code);
  assert.ok(!code.includes('<pre>'), code);
  assert.ok(code.includes('<p>그림 $e$</p>'), code);
});

test('leaves literal backslashes and dollars inside code unchanged', async () => {
  const { code } = await renderer.render('```text\n$cost \\\\{ e \\\\}\n```');
  assert.ok(code.includes(String.raw`$cost \\{ e \\}`), code);
  assert.ok(code.includes('<pre'), code);
});

test('serves same-site HTTP and HTTPS images from the preserved asset path', async () => {
  for (const protocol of ['http', 'https']) {
    const { code } = await renderer.render(`![graph](${protocol}://youngyojun.github.io/assets/images/graph.png)`);
    assert.ok(code.includes('/assets/images/graph.png'), code);
    assert.ok(!code.includes('youngyojun.github.io'), code);
  }
  const { code } = await renderer.render('![external](https://example.com/graph.png)');
  assert.ok(code.includes('https://example.com/graph.png'), code);
});

test('keeps Jekyll heading fragments, including numbered title collisions, per document', async () => {
  for (let i = 0; i < 2; i++) {
    const { code } = await renderer.render('# 풀이\n\n# 풀이\n\n# 풀이 1\n\n# 풀이 1\n\n# 실험 ① 결과');
    assert.deepEqual([...code.matchAll(/<h1 id="([^"]+)"/g)].map(match => match[1]), [
      '풀이', '풀이-1', '풀이-1', '풀이-1-1', '실험--결과',
    ]);
  }
});
