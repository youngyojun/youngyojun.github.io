import assert from 'node:assert/strict';
import { test } from 'node:test';
import { postSchema } from '../src/post-schema.ts';

const required = { title: '글 제목', slug: 'example-post', date: '2026-10-10T03:00:00Z' };

test('accepts timestamps already parsed as Date objects by Astro YAML', () => {
  const result = postSchema.safeParse({ ...required, date: new Date('2021-09-19T22:43:07+09:00') });
  assert.ok(result.success);
  assert.equal(result.data.date, '2021-09-19T13:43:07.000Z');
  assert.equal(postSchema.safeParse({ ...required, date: new Date('invalid') }).success, false);
});

test('normalizes publication times to UTC without depending on the filename or machine timezone', () => {
  for (const [date, expected] of [
    ['2021-02-02 01:17:40', '2021-02-02T01:17:40.000Z'],
    ['2021-09-19 22:43:07 +0900', '2021-09-19T13:43:07.000Z'],
    ['2026-10-10T12:00:00+09:00', '2026-10-10T03:00:00.000Z'],
    ['2020-02-29T00:00:00Z', '2020-02-29T00:00:00.000Z'],
  ]) {
    assert.equal(postSchema.parse({ ...required, date }).date, expected);
  }
});

test('requires a title, an explicit slug and an explicit publication date', () => {
  for (const field of ['title', 'slug', 'date']) {
    const input = { ...required };
    delete input[field];
    assert.equal(postSchema.safeParse(input).success, false, field);
    assert.equal(postSchema.safeParse({ ...required, [field]: '' }).success, false, field);
  }
});

test('rejects malformed and impossible dates instead of silently shifting the publication day', () => {
  for (const date of [null, 0, 'yesterday', '2021-02-29T00:00:00Z', '2021-04-31T00:00:00Z', '2021-01-01T25:00:00Z']) {
    assert.equal(postSchema.safeParse({ ...required, date }).success, false, String(date));
  }
});

test('defaults optional classifications to empty arrays and preserves authored names and order', () => {
  const post = postSchema.parse(required);
  assert.deepEqual(post.categories, []);
  assert.deepEqual(post.tags, []);
  assert.deepEqual(postSchema.parse({ ...required, tags: null }).tags, []);
  const classified = postSchema.parse({ ...required, categories: ['ICPC', 'Practice'], tags: ['학교', 'Algorithm'] });
  assert.deepEqual(classified.categories, ['ICPC', 'Practice']);
  assert.deepEqual(classified.tags, ['학교', 'Algorithm']);
  assert.equal(postSchema.safeParse({ ...required, categories: 'ICPC' }).success, false);
  assert.equal(postSchema.safeParse({ ...required, tags: [123] }).success, false);
});

test('rejects unknown metadata fields so authoring typos do not disappear silently', () => {
  assert.equal(postSchema.safeParse({ ...required, tag: ['ICPC'] }).success, false);
});
