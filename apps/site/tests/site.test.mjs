import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const output = file => readFileSync(new URL(`../dist/${file}`, import.meta.url), 'utf8');

test('keeps the root entry linked to the separately mounted blog', () => {
  const html = output('index.html');
  assert.ok(html.includes('href="/blog/"'));
  assert.ok(html.includes('rel="canonical" href="https://youngyojun.github.io/blog/"'));
});

test('publishes a site sitemap index and robots entry pointing to the blog sitemap', () => {
  assert.match(output('sitemap.xml'), /<sitemapindex\b/);
  assert.ok(output('sitemap.xml').includes('<loc>https://youngyojun.github.io/blog/sitemap.xml</loc>'));
  assert.equal(output('robots.txt'), 'Sitemap: https://youngyojun.github.io/sitemap.xml\n');
});

test('provides a global error page with visible home and blog links', () => {
  const html = output('404.html');
  assert.ok(html.includes('페이지를 찾을 수 없습니다.'));
  assert.ok(html.includes('href="/"'));
  assert.ok(html.includes('href="/blog/"'));
  assert.ok(!html.includes('http-equiv="refresh"'));
});
