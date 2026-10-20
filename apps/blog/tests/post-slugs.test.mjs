import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validatePostSlugs } from '../lib/slugs.ts';

test('accepts filename identifiers with meaningful years and sequence numbers', () => {
  const filenames = ['hunt-szymanski.md', 'icpc-wf-practice-2021-02-01.md', 'generating-functions-1.md', '2025-icpc-seoul-finals-solutions.md', 'a.md'];
  assert.doesNotThrow(() => validatePostSlugs(filenames.map(name => [name, name.slice(0, -3)])));
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
