import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const output = file => readFileSync(new URL(`../dist/${file}`, import.meta.url), 'utf8');

test('publishes the personal About page at the site root and links to it from home', () => {
  assert.ok(existsSync(new URL('../dist/about/index.html', import.meta.url)));
  const html = output('about/index.html');
  assert.ok(html.includes('rel="canonical" href="https://youngyojun.github.io/about/"'));
  assert.match(html, /<html lang="ko">/);
  assert.match(html, /<h1\b[^>]*>저를 소개합니다! :D<\/h1>/);
  assert.ok(html.includes('Who Am I?'));
  assert.ok(html.includes('href="/blog/"'));
  assert.ok(!html.includes('/blog/about/'));
  assert.ok(!html.includes('http-equiv="refresh"'));
  assert.ok(output('index.html').includes('href="/about/"'));
  assert.ok(output('site-sitemap.xml').includes('<loc>https://youngyojun.github.io/about/</loc>'));
});

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
  assert.ok(!html.includes('youngyojun@gmail.com'));
  assert.ok(!html.includes('http-equiv="refresh"'));
  assert.ok(!html.includes('location.replace'));
});

test('publishes home and blog sitemaps through one index and robots entry', () => {
  assert.match(output('sitemap.xml'), /<sitemapindex\b/);
  assert.ok(output('sitemap.xml').includes('<loc>https://youngyojun.github.io/blog/sitemap.xml</loc>'));
  assert.ok(output('sitemap.xml').includes('<loc>https://youngyojun.github.io/mahjong/sitemap.xml</loc>'));
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
