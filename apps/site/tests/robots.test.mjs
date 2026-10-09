import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const output = new URL('../dist/robots.txt', import.meta.url);

test('publishes the original robots.txt sitemap directive without changing crawl rules', () => {
  assert.ok(existsSync(output), 'The original /robots.txt URL must exist');
  assert.equal(readFileSync(output, 'utf8'), 'Sitemap: https://youngyojun.github.io/sitemap.xml\n');
  assert.ok(existsSync(new URL('../dist/sitemap.xml', import.meta.url)), 'The advertised sitemap must exist');
});

test('uses the configured site URL and serves robots.txt as UTF-8 plain text', async () => {
  assert.ok(existsSync(output), 'The original /robots.txt URL must exist');
  const { GET } = await import('../src/pages/robots.txt.ts');
  const response = GET({ site: new URL('https://example.com/') });
  assert.equal(response.headers.get('Content-Type'), 'text/plain; charset=utf-8');
  assert.equal(await response.text(), 'Sitemap: https://example.com/sitemap.xml\n');
  assert.throws(() => GET({}), /configured site URL/);
});
