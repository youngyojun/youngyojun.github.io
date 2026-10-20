import assert from 'node:assert/strict';
import { test } from 'node:test';
import { redirectTarget } from '../lib/redirect-target.ts';

test('moves encoded old taxonomy hashes and pagination to static URLs', () => {
  assert.equal(redirectTarget('/blog/tags/', 'tags', '#/ICPC/page2'), '/blog/tags/ICPC/page/2/');
  assert.equal(redirectTarget('/blog/tags/', 'tags', '#/%ED%95%99%EA%B5%90'), '/blog/tags/%ED%95%99%EA%B5%90/');
  assert.equal(redirectTarget('/blog/categories/', 'categories', '#/Linear%20Algebra/page1'), '/blog/categories/Linear%20Algebra/');
  assert.equal(redirectTarget('/blog/tags/', 'tags', '#/%broken'), '/blog/tags/');
  assert.equal(redirectTarget('/blog/tags/', 'tags', '#/ICPC/page0'), '/blog/tags/');
  assert.equal(redirectTarget('/blog/archives/', 'archives', '#/page2'), '/blog/archives/');
});

test('preserves ordinary article and archive fragments', () => {
  assert.equal(redirectTarget('/blog/posts/hunt-szymanski/', undefined, '#결론'), '/blog/posts/hunt-szymanski/#결론');
  assert.equal(redirectTarget('/blog/archives/', 'archives', '#year-2021'), '/blog/archives/#year-2021');
});
