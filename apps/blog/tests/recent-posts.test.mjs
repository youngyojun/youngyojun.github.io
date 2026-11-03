import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const output = file => JSON.parse(readFileSync(new URL(`../dist/${file}`, import.meta.url), 'utf8'));

test('publishes the first three blog articles with KST dates and plain-text summaries', () => {
  const recent = output('recent-posts.json');
  const index = output('search.json');
  assert.equal(recent.length, Math.min(3, index.length));
  assert.deepEqual(recent.map(post => [post.title, post.url]), index.slice(0, 3).map(post => [post.title, post.url]));
  assert.deepEqual(recent.map(post => post.date), recent.map(post => post.date).sort().reverse());
  for (const post of recent) {
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+09:00$/);
    assert.equal(typeof post.description, 'string');
    assert.deepEqual(Object.keys(post).sort(), ['date', 'description', 'title', 'url']);
  }
});
