import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { assembleSite } from './assemble-site.ts';

function fixture() {
  // Keep test file operations separate from real app builds and deployment output.
  const root = mkdtempSync(join(tmpdir(), 'assemble-site-'));
  const source = join(root, 'blog');
  const output = join(root, 'dist');
  mkdirSync(source);
  writeFileSync(join(source, 'index.html'), 'blog');
  return { root, source, output };
}

test('assembles built files and regenerates only the destination', () => {
  const { root, source, output } = fixture();
  mkdirSync(output);
  writeFileSync(join(output, 'stale.html'), 'old');
  assembleSite([source], output);
  assert.equal(readFileSync(join(output, 'index.html'), 'utf8'), 'blog');
  assert.equal(readFileSync(join(source, 'index.html'), 'utf8'), 'blog');
  assert.equal(readFileSync(join(output, '.nojekyll'), 'utf8'), '');
  assert.throws(() => readFileSync(join(output, 'stale.html')));
});

test('fails on collisions before modifying an existing output', () => {
  const { root, source, output } = fixture();
  const other = join(root, 'site');
  mkdirSync(other);
  writeFileSync(join(other, 'index.html'), 'site');
  mkdirSync(output);
  writeFileSync(join(output, 'index.html'), 'previous release');
  assert.throws(() => assembleSite([source, other], output), /collision/i);
  assert.equal(readFileSync(join(output, 'index.html'), 'utf8'), 'previous release');
});

test('refuses a source or parent directory as the destination', () => {
  const { root, source } = fixture();
  assert.throws(() => assembleSite([source], source));
  assert.throws(() => assembleSite([source], root));
  assert.equal(readFileSync(join(source, 'index.html'), 'utf8'), 'blog');
});
