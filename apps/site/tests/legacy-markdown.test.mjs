import assert from 'node:assert/strict';
import { test } from 'node:test';
import { satteri } from '@astrojs/markdown-satteri';
import config from '../astro.config.mjs';

const renderer = await (config.markdown?.processor ?? satteri()).createRenderer({});

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
