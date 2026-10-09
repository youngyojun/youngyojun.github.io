import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

// Page boundaries observed in the UTC Jekyll homepage build.
const pages = [
  ['/', '/blog/posts/2025-icpc-seoul-finals-solutions/', '/blog/posts/physicslab1-wave/'],
  ['/page2/', '/blog/posts/generating-functions-1/', '/blog/posts/icpc-wf-practice-2021-03-07/'],
  ['/page3/', '/blog/posts/icpc-wf-practice-2021-03-04/', '/blog/posts/first-article/'],
];

function output(path) {
  const file = new URL(`../dist/${path.slice(1)}index.html`, import.meta.url);
  assert.ok(existsSync(file), `Missing original home page: ${path}`);
  return readFileSync(file, 'utf8');
}

test('publishes the original home pagination URLs with 10 chronological posts per page', () => {
  const links = [];
  for (const [path, first, last] of pages) {
    const html = output(path);
    const current = [...html.matchAll(/<a\b[^>]*class="post-title-link"[^>]*href="([^"]+)"/g)].map(match => match[1]);
    assert.equal(current.length, 10, path);
    assert.equal(current[0], first);
    assert.equal(current.at(-1), last);
    assert.ok(html.includes(`href="https://youngyojun.github.io${path}"`), `Canonical: ${path}`);
    links.push(...current);
  }
  assert.equal(new Set(links).size, 30, 'Pagination must not duplicate or lose posts');
  assert.ok(!existsSync(new URL('../dist/page1/index.html', import.meta.url)), 'The first page stays at /');
});

test('provides numbered pages and the correct previous/next links at both pagination boundaries', () => {
  for (const [index, [path]] of pages.entries()) {
    const nav = output(path).match(/<nav\b[^>]*aria-label="글 목록 페이지"[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? '';
    assert.ok(nav, path);
    for (const [url] of pages) assert.ok(nav.includes(`href="${url}"`), `Page link: ${url}`);
    assert.ok(new RegExp(`aria-current="page"[^>]*>${index + 1}<`).test(nav), `Current page: ${path}`);
    const previous = nav.match(/<a\b[^>]*href="([^"]+)"[^>]*rel="prev"/);
    const next = nav.match(/<a\b[^>]*href="([^"]+)"[^>]*rel="next"/);
    assert.equal(previous?.[1], pages[index - 1]?.[0], path);
    assert.equal(next?.[1], pages[index + 1]?.[0], path);
  }
});
