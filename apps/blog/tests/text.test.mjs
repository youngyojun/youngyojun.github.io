import assert from 'node:assert/strict';
import { test } from 'node:test';
import { plainText, description } from '../lib/text.ts';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { markdownOptions } from '../lib/markdown.ts';

test('extracts readable text and decodes entities for search and metadata', () => {
  assert.equal(plainText('<p>한글 <strong>English</strong> &amp; &lt;code&gt;</p>'), '한글 English & <code>');
  assert.equal(description('<h1>제목</h1><p>첫 <em>문단</em></p><p>다음 문단</p>'), '첫 문단');
  assert.equal(description(`<p>${'가'.repeat(200)}</p>`), `${'가'.repeat(180)}…`);
});

test('indexes each rendered formula once, without its hidden TeX source', async () => {
  const renderer = await createMarkdownProcessor(markdownOptions);
  const { code } = await renderer.render(String.raw`Cost $N$ and $a_i + \mathcal{O}(n^2)$.`);
  assert.equal(plainText(code), 'Cost N and ai+O(n2).');
  assert.equal(description(code), 'Cost N and ai+O(n2).');
});
