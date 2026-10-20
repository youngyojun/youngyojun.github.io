import assert from 'node:assert/strict';
import { test } from 'node:test';
import { paginate } from '../lib/pagination.ts';

test('keeps page boundaries, first page URLs and empty collections usable', () => {
  assert.deepEqual(paginate([], '/blog/'), [{ number: 1, url: '/blog/', items: [] }]);
  const pages = paginate(Array.from({ length: 21 }, (_, i) => i), '/blog/tags/ICPC/');
  assert.deepEqual(pages.map(page => page.items.length), [10, 10, 1]);
  assert.deepEqual(pages.map(page => page.url), ['/blog/tags/ICPC/', '/blog/tags/ICPC/page/2/', '/blog/tags/ICPC/page/3/']);
  assert.deepEqual(pages.flatMap(page => page.items), Array.from({ length: 21 }, (_, i) => i));
});
