import assert from 'node:assert/strict';
import { test } from 'node:test';
import { postSchema } from '../lib/schema.ts';

const post = { title: '수학 이야기', slug: 'math-notes', date: '2026-10-20T12:00:00+09:00' };

test('normalizes explicit ISO publication times and defaults classifications', () => {
  const parsed = postSchema.parse(post);
  assert.equal(parsed.date, '2026-10-20T03:00:00.000Z');
  assert.deepEqual(parsed.tags, []);
  assert.deepEqual(parsed.categories, []);
});

test('rejects missing metadata, impossible dates and legacy ambiguous dates', () => {
  for (const key of ['title', 'slug', 'date']) {
    const invalid = { ...post };
    delete invalid[key];
    assert.equal(postSchema.safeParse(invalid).success, false);
    assert.equal(postSchema.safeParse({ ...post, [key]: '' }).success, false);
  }
  for (const date of ['2026-02-30T00:00:00Z', '2026-10-20 12:00:00', '2026-10-20', null, 0]) {
    assert.equal(postSchema.safeParse({ ...post, date }).success, false, String(date));
  }
  assert.equal(postSchema.safeParse({ ...post, tags: '수학' }).success, false);
  assert.equal(postSchema.safeParse({ ...post, tag: ['typo'] }).success, false);
});

test('rejects taxonomy names that escape or divide a static URL path', () => {
  for (const name of ['.', '..', 'foo/bar', 'foo\\bar', 'C#', 'what?']) {
    for (const field of ['tags', 'categories']) assert.equal(postSchema.safeParse({ ...post, [field]: [name] }).success, false, name);
  }
  assert.ok(postSchema.safeParse({ ...post, tags: ['학교', 'Cut vertex'] }).success);
});
