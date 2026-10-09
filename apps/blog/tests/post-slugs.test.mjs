import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validatePostSlugs } from '../src/post-slugs.ts';

test('accepts explicit lowercase slugs with meaningful years and sequence numbers', () => {
  assert.doesNotThrow(() => validatePostSlugs([
    ['renamed-source.md', 'hunt-szymanski'],
    ['practice.md', 'icpc-wf-practice-2021-02-01'],
    ['series.md', 'generating-functions-1'],
    ['contest.md', '2025-icpc-seoul-finals-solutions'],
    ['short.md', 'a'],
  ]));
});

test('rejects missing and non-string slugs and identifies the source', () => {
  for (const slug of [undefined, null, '', 123, {}, ['valid-slug']]) {
    assert.throws(() => validatePostSlugs([['missing.md', slug]]), /Invalid post slug.*missing\.md/);
  }
});

test('rejects slugs that cannot form one canonical lowercase URL segment', () => {
  for (const slug of [
    'Hunt-Szymanski', 'two words', 'two_words', '-start', 'end-', 'two--hyphens',
    'nested/path', 'post.md', '한글', 'encoded%20space', ' leading', 'trailing ',
    'query?x=1', 'fragment#part', 'trailing-newline\n', 'fullwidth-１',
  ]) {
    assert.throws(() => validatePostSlugs([['invalid.md', slug]]), /Invalid post slug.*invalid\.md/);
  }
});

test('rejects duplicate slugs across the collection and reports both sources', () => {
  assert.throws(() => validatePostSlugs([
    ['published.md', 'same-topic'],
    ['unrelated.md', 'different-topic'],
    ['draft.md', 'same-topic'],
  ]), error => {
    assert.match(error.message, /Duplicate post slug.*same-topic/);
    assert.ok(error.message.includes('published.md'));
    assert.ok(error.message.includes('draft.md'));
    return true;
  });
});
