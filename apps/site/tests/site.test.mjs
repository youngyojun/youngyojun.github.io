import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const output = file => readFileSync(new URL(`../dist/${file}`, import.meta.url), 'utf8');

test('publishes a personal homepage with real writing links and its own canonical URL', () => {
  const html = output('index.html');
  assert.match(html, /<html lang="en">/);
  assert.doesNotMatch(html, /[가-힣]/);
  assert.match(html, /<h1\b[^>]*>[\s\S]*?Gyojun[\s\S]*?Youn/);
  assert.ok(html.includes('href="/blog/"'));
  assert.ok(html.includes('rel="canonical" href="https://youngyojun.github.io/"'));
  assert.ok(html.includes('href="/blog/posts/hunt-szymanski/"'));
  assert.ok(html.includes('href="/blog/posts/young-tableaux/"'));
  assert.ok(html.includes('id="latest-posts"'));
  assert.ok(html.includes('id="copyright-year"'));
  assert.ok(!html.includes('함께 나눌 이야기가 있다면.'));
  assert.ok(html.includes('href="mailto:youngyojun@gmail.com"'));
  assert.ok(!html.includes('http-equiv="refresh"'));
  assert.ok(!html.includes('location.replace'));
});

test('publishes home and blog sitemaps through one index and robots entry', () => {
  assert.match(output('sitemap.xml'), /<sitemapindex\b/);
  assert.ok(output('sitemap.xml').includes('<loc>https://youngyojun.github.io/blog/sitemap.xml</loc>'));
  assert.ok(output('sitemap.xml').includes('<loc>https://youngyojun.github.io/site-sitemap.xml</loc>'));
  assert.ok(output('site-sitemap.xml').includes('<loc>https://youngyojun.github.io/</loc>'));
  assert.equal(output('robots.txt'), 'Sitemap: https://youngyojun.github.io/sitemap.xml\n');
});

test('provides a global error page with visible home and blog links', () => {
  const html = output('404.html');
  assert.ok(html.includes('페이지를 찾을 수 없습니다.'));
  assert.ok(html.includes('href="/"'));
  assert.ok(html.includes('href="/blog/"'));
  assert.ok(!html.includes('http-equiv="refresh"'));
});
