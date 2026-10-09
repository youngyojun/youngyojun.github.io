import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('builds a 404.html with a visible error message and a home link, without automatic redirection', () => {
  const file = new URL('../dist/404.html', import.meta.url);
  assert.ok(existsSync(file), 'Static hosting must have /404.html');
  const html = readFileSync(file, 'utf8');
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
  assert.match(main, /<h1\b[^>]*>[^<]*404[^<]*페이지를 찾을 수 없습니다[^<]*<\/h1>/);
  assert.match(main, /<a\b[^>]*href="\/"[^>]*>홈으로 돌아가기<\/a>/);
  assert.ok(!/http-equiv="refresh"/i.test(html), 'Keep the missing URL visible instead of redirecting');
  assert.match(html, /<meta\b[^>]*name="robots"[^>]*content="noindex"/);
  assert.ok(!html.includes('rel="canonical"'), 'An error page must not advertise a canonical content URL');
  const sitemap = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  assert.ok(!/<loc>[^<]*\/404(?:\.html|\/)?<\/loc>/.test(sitemap), 'Do not advertise the error page in the sitemap');
});

test('keeps normal pages indexable with their existing canonical URLs', () => {
  for (const path of ['/', '/about/', '/secmem/2022/03/20/Hunt-Szymanski/']) {
    const html = readFileSync(new URL(`../dist/${path.slice(1)}index.html`, import.meta.url), 'utf8');
    assert.ok(html.includes(`href="https://youngyojun.github.io${path}"`), path);
    assert.ok(!/<meta\b[^>]*name="robots"[^>]*content="noindex"/.test(html), path);
  }
});
