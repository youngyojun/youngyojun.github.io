import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('publishes blog navigation as directly accessible static pages', () => {
  for (const path of ['blog/index.html', 'blog/page/2/index.html', 'blog/page/3/index.html', 'blog/tags/ICPC/index.html', 'blog/categories/Linear Algebra/index.html', 'blog/archives/index.html', 'blog/about/index.html']) {
    assert.ok(existsSync(new URL(`../dist/${path}`, import.meta.url)), path);
  }
  const index = readFileSync(new URL('../dist/blog/index.html', import.meta.url), 'utf8');
  assert.ok(index.includes('/blog/page/2/'));
});
