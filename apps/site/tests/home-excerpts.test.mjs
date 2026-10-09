import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

// Excerpt text and authored links captured from the original Jekyll home pages.
const pages = JSON.parse(readFileSync(new URL('./fixtures/legacy-home-excerpts.json', import.meta.url), 'utf8'));
const output = path => readFileSync(new URL(`../dist/${decodeURIComponent(path.slice(1))}index.html`, import.meta.url), 'utf8');
const text = html => html.replace(/<[^>]*>/g, '').replace(/&#(x[\da-f]+|\d+);|&(amp|lt|gt|quot|apos|nbsp);/gi, (_, number, name) => number
  ? String.fromCodePoint(parseInt(number.replace(/^x/i, ''), /^x/i.test(number) ? 16 : 10))
  : { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }[name]).replace(/\s+/g, ' ').trim();

test('restores all legacy home excerpts and read-more links without shortening the CRLF article', () => {
  for (const { path, excerpts } of pages) {
    const articles = [...output(path).matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)];
    assert.equal(articles.length, 10, path);
    for (const [index, { url, text: expected, links }] of excerpts.entries()) {
      const article = articles[index][1];
      const excerpt = article.match(/<div class="post-body">([\s\S]*?)<\/div>\s*<p class="post-more">/)?.[1];
      assert.ok(excerpt, `Missing excerpt: ${url}`);
      assert.ok(article.includes(`href="${url}#"`), `Read more: ${url}`);
      assert.ok(article.includes('더 읽어보기 »'), url);
      if (expected !== null) {
        assert.equal(text(excerpt), expected, url);
        assert.deepEqual([...excerpt.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]), links, url);
      } else {
        const body = output(url).match(/<div class="post-body">([\s\S]*?)<\/div>\s*<\/article>/)?.[1];
        assert.equal(excerpt.trim(), body.trim(), 'Young tableaux originally shows the entire article');
        assert.equal([...excerpt.matchAll(/<img\b/g)].length, 7, 'Keep all original figures');
        assert.ok(excerpt.includes('\\('), 'Keep the article math');
      }
    }
  }
});

test('loads the same MathJax settings on home pages and articles', () => {
  const scripts = html => [...html.matchAll(/<script\b[^>]*(?:mathjax-config|cdn\.bootcss\.com\/mathjax)[^>]*>[\s\S]*?<\/script>/g)].map(match => match[0]);
  const expected = scripts(output('/secmem/2021/09/19/young-tableaux/'));
  assert.equal(expected.length, 2);
  for (const { path } of pages) assert.deepEqual(scripts(output(path)), expected, path);
});
