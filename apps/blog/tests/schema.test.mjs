import assert from 'node:assert/strict';
import { test } from 'node:test';
import { postSchema } from '../lib/schema.ts';

const post = { title: '수학 이야기', date: '2026-10-20 12:00:00' };

test('reads local KST publication times without a slug field and defaults classifications', () => {
  const parsed = postSchema.parse(post);
  assert.equal(parsed.date, '2026-10-20T12:00:00+09:00');
  assert.deepEqual(parsed.tags, []);
  assert.deepEqual(parsed.categories, []);
});

test('preserves the KST calendar date at UTC day and year boundaries', () => {
  const parsed = postSchema.parse({ ...post, date: '2026-01-01 00:30:00' });
  assert.equal(parsed.date.slice(0, 10), '2026-01-01');
  assert.equal(new Date(parsed.date).toISOString(), '2025-12-31T15:30:00.000Z');
  assert.ok(postSchema.safeParse({ ...post, date: '2024-02-29 23:59:59' }).success);
});

test('rejects missing metadata, impossible KST dates and other date formats', () => {
  for (const key of ['title', 'date']) {
    const invalid = { ...post };
    delete invalid[key];
    assert.equal(postSchema.safeParse(invalid).success, false);
    assert.equal(postSchema.safeParse({ ...post, [key]: '' }).success, false);
  }
  for (const date of ['2026-02-30 00:00:00', '2025-02-29 12:00:00', '2026-10-20 24:00:00', '2026-10-20 12:60:00', '2026-10-20 12:00:60', '2026-10-20T12:00:00Z', '2026-10-20T12:00:00+09:00', '2026-10-20', '2026-10-20 12:00', null, 0]) {
    assert.equal(postSchema.safeParse({ ...post, date }).success, false, String(date));
  }
  assert.equal(postSchema.safeParse({ ...post, tags: '수학' }).success, false);
  assert.equal(postSchema.safeParse({ ...post, tag: ['typo'] }).success, false);
  assert.equal(postSchema.safeParse({ ...post, slug: 'ignored-override' }).success, false);
});

test('rejects taxonomy names that escape or divide a static URL path', () => {
  for (const name of ['.', '..', 'foo/bar', 'foo\\bar', 'C#', 'what?']) {
    for (const field of ['tags', 'categories']) assert.equal(postSchema.safeParse({ ...post, [field]: [name] }).success, false, name);
  }
  assert.ok(postSchema.safeParse({ ...post, tags: ['학교', 'Cut vertex'] }).success);
});
