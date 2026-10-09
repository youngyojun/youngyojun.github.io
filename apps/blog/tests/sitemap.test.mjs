import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { test } from 'node:test';

// Original Jekyll sitemap; attachment dates depend on the checkout's file mtimes.
const postUrls = JSON.parse(readFileSync(new URL('./fixtures/post-urls.json', import.meta.url), 'utf8'));
const baseline = JSON.parse(readFileSync(new URL('./fixtures/legacy-sitemap.json', import.meta.url), 'utf8')).map(([url, lastmod]) => {
  const path = new URL(url).pathname;
  return [new URL(postUrls[path] ?? path, url).href, lastmod];
});
const excludedDocuments = ['/README.en/', '/assets/lib/fastclick/', '/assets/lib/jquery_lazyload/'];

function entries() {
  const file = new URL('../dist/sitemap.xml', import.meta.url);
  assert.ok(existsSync(file), 'The original /sitemap.xml URL must exist');
  const xml = readFileSync(file, 'utf8');
  assert.ok(xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, entry]) => ({
    url: entry.match(/<loc>([^<]+)<\/loc>/)?.[1],
    lastmod: entry.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
  }));
}

test('lists all migrated original pages and PDFs once, using their public canonical URLs', () => {
  const actual = entries();
  const expected = baseline.filter(([url]) => !excludedDocuments.includes(new URL(url).pathname));
  assert.deepEqual(actual.map(entry => entry.url).sort(), expected.map(([url]) => url).sort());
  assert.equal(new Set(actual.map(entry => entry.url)).size, actual.length, 'No duplicate URLs');
  for (const { url } of actual) {
    const path = new URL(url).pathname;
    const file = new URL(`../dist/${decodeURIComponent(path.slice(1))}${path.endsWith('/') ? 'index.html' : ''}`, import.meta.url);
    assert.ok(existsSync(file) && statSync(file).isFile(), `Missing sitemap target: ${url}`);
    if (path.endsWith('/')) {
      assert.ok(readFileSync(file, 'utf8').includes(`href="${url}"`), `Canonical URL: ${url}`);
    }
  }
});

test('preserves original post dates and PDF modification times without adding build dates to navigation pages', () => {
  for (const { url, lastmod } of entries()) {
    const path = new URL(url).pathname;
    if (path.endsWith('.pdf')) {
      const source = new URL(`../../../${path.slice(1)}`, import.meta.url);
      assert.equal(Math.floor(Date.parse(lastmod) / 1000), Math.floor(statSync(source).mtimeMs / 1000), url);
    } else {
      const original = baseline.find(([originalUrl]) => originalUrl === url);
      assert.ok(original, url);
      assert.equal(lastmod ? Date.parse(lastmod) : null, original[1] ? Date.parse(original[1]) : null, url);
    }
  }
});
