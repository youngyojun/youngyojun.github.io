import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, symlinkSync } from 'node:fs';
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
  assembleSite([{ directory: source, mount: '/' }], output);
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
  assert.throws(() => assembleSite([{ directory: source, mount: '/' }, { directory: other, mount: '/' }], output), /mount|collision/i);
  assert.equal(readFileSync(join(output, 'index.html'), 'utf8'), 'previous release');
});

test('refuses a source or parent directory as the destination', () => {
  const { root, source, output } = fixture();
  mkdirSync(output);
  assert.throws(() => assembleSite([{ directory: output, mount: '/' }], output), /overlap/);
  assert.throws(() => assembleSite([{ directory: root, mount: '/' }], output), /overlap/);
  const child = join(output, 'child');
  mkdirSync(child);
  assert.throws(() => assembleSite([{ directory: child, mount: '/' }], output), /overlap/);
  assert.throws(() => assembleSite([{ directory: source, mount: '/' }], source));
  assert.throws(() => assembleSite([{ directory: source, mount: '/' }], root));
  assert.equal(readFileSync(join(source, 'index.html'), 'utf8'), 'blog');
});

test('mounts independent app builds without nesting their source public folders', () => {
  const { root, source, output } = fixture();
  const site = join(root, 'site');
  mkdirSync(site);
  writeFileSync(join(site, 'index.html'), 'home');
  mkdirSync(join(source, 'images'));
  writeFileSync(join(source, 'images', 'figure.png'), 'original figure');
  assembleSite([{ directory: site, mount: '/' }, { directory: source, mount: '/blog/' }], output);
  assert.equal(readFileSync(join(output, 'index.html'), 'utf8'), 'home');
  assert.equal(readFileSync(join(output, 'blog', 'index.html'), 'utf8'), 'blog');
  assert.equal(readFileSync(join(output, 'blog', 'images', 'figure.png'), 'utf8'), 'original figure');
  assert.equal(readFileSync(join(source, 'index.html'), 'utf8'), 'blog');
});

test('rejects invalid and overlapping mounts before changing the previous release', () => {
  const { source, output } = fixture();
  mkdirSync(output);
  writeFileSync(join(output, 'index.html'), 'previous release');
  for (const mount of ['/../', '/blog', 'blog/', '/blog//', '/%2e%2e/', '/blog\\/']) {
    assert.throws(() => assembleSite([{ directory: source, mount }], output), /mount/i);
  }
  assert.throws(() => assembleSite([{ directory: source, mount: '/blog/' }, { directory: source, mount: '/blog/admin/' }], output), /mount/i);
  assert.equal(readFileSync(join(output, 'index.html'), 'utf8'), 'previous release');
});

test('prevents the root app from writing inside another app namespace', () => {
  const { root, source, output } = fixture();
  const site = join(root, 'site');
  mkdirSync(join(site, 'blog'), { recursive: true });
  writeFileSync(join(site, 'blog', 'unexpected.html'), 'wrong owner');
  mkdirSync(output);
  writeFileSync(join(output, 'index.html'), 'previous release');
  assert.throws(() => assembleSite([{ directory: site, mount: '/' }, { directory: source, mount: '/blog/' }], output), /namespace|mount/i);
  assert.equal(readFileSync(join(output, 'index.html'), 'utf8'), 'previous release');
});

test('refuses symbolic inputs and app-owned deployment markers without replacing a release', () => {
  for (const symbolic of [true, false]) {
    const { source, output } = fixture();
    mkdirSync(output);
    writeFileSync(join(output, 'index.html'), 'previous release');
    if (symbolic) symlinkSync(join(source, 'index.html'), join(source, 'linked.html'));
    else writeFileSync(join(source, '.nojekyll'), 'unexpected app output');
    assert.throws(() => assembleSite([{ directory: source, mount: '/' }], output), /symlink|owns/i);
    assert.equal(readFileSync(join(output, 'index.html'), 'utf8'), 'previous release');
  }
});
