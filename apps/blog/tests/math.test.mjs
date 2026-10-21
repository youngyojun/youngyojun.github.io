import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderMathText } from '../lib/math.ts';
import { plainText } from '../lib/text.ts';

test('renders title math without interpreting surrounding text as HTML or Markdown', () => {
  const html = renderMathText(String.raw`Cost $\text{LCS}$ and $\mathcal{O}(N)$ <img src=x onerror=alert(1)> **literal** [link](https://example.com)`);
  assert.equal((html.match(/class="katex"/g) ?? []).length, 2);
  assert.ok(!html.includes('<img'));
  assert.ok(!html.includes('<a '));
  assert.ok(!html.includes('<strong>'));
  assert.equal(plainText(html), 'Cost LCS and O(N) <img src=x onerror=alert(1)> **literal** [link](https://example.com)');
  assert.throws(() => renderMathText(String.raw`Title $\DefinitelyUnsupportedMathCommand$`), /Undefined control sequence/);
});
