import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('publishes blog navigation as directly accessible static pages', () => {
  for (const path of ['index.html', 'page/2/index.html', 'page/3/index.html', 'tags/ICPC/index.html', 'categories/Linear Algebra/index.html', 'archives/index.html', 'about/index.html']) {
    assert.ok(existsSync(new URL(`../dist/${path}`, import.meta.url)), path);
  }
  const index = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.ok(index.includes('/blog/page/2/'));
});
