import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import { plainText } from '../lib/text.ts';

const originals = JSON.parse(readFileSync(new URL('./fixtures/posts.json', import.meta.url), 'utf8'));
const page = path => readFileSync(new URL(`../dist/${decodeURIComponent(path.slice('/blog/'.length))}index.html`, import.meta.url), 'utf8');

test('publishes every original article at its filename URL with the same instant and a KST display date', () => {
  for (const original of originals) {
    const html = page(`/blog/posts/${original.slug}/`);
    const header = html.match(/<header class="article-header">([\s\S]*?)<\/header>/)?.[1];
    assert.ok(header, original.slug);
    assert.equal(plainText(header.match(/<h1>([\s\S]*?)<\/h1>/)[1]), original.title);
    const time = header.match(/<time datetime="([^"]+)">([^<]+)<\/time>/);
    assert.ok(time, original.slug);
    assert.equal(new Date(time[1]).toISOString(), original.date, original.slug);
    const kstDay = new Date(Date.parse(original.date) + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    assert.equal(time[2], kstDay, original.slug);
    for (const category of original.categories) assert.ok(header.includes(`/blog/categories/${encodeURIComponent(category)}/`), category);
    for (const tag of original.tags) assert.ok(header.includes(`/blog/tags/${encodeURIComponent(tag)}/`), tag);
    assert.ok(html.includes(`href="https://youngyojun.github.io/blog/posts/${original.slug}/"`));
    assert.ok(!html.includes('katex-error'), original.slug);
    assert.ok(!html.includes('MathJax'), original.slug);
  }
});

test('Atom entry IDs use the canonical article URLs', () => {
  const feed = readFileSync(new URL('../dist/atom.xml', import.meta.url), 'utf8');
  const entries = [...feed.matchAll(/<entry>[\s\S]*?<id>([^<]+)<\/id>[\s\S]*?<link href="([^"]+)"\/>/g)];
  assert.equal(entries.length, 10);
  for (const [, id, link] of entries) {
    assert.equal(id, link);
    assert.match(id, /^https:\/\/youngyojun\.github\.io\/blog\/posts\/[a-z0-9-]+\/$/);
  }
});

test('copies original article figures and all attachments without modifying their bytes', () => {
  for (const directory of ['images', 'attachments']) {
    const source = new URL(`../public/${directory}/`, import.meta.url);
    for (const entry of readdirSync(source, { recursive: true, withFileTypes: true })) {
      if (!entry.isFile()) continue;
      const input = readFileSync(`${entry.parentPath}/${entry.name}`);
      const relative = `${entry.parentPath.slice(source.pathname.length)}${entry.parentPath.endsWith('/') ? '' : '/'}${entry.name}`;
      const output = new URL(`../dist/${directory}/${relative.replace(/^\//, '')}`, import.meta.url);
      assert.equal(createHash('sha256').update(readFileSync(output)).digest('hex'), createHash('sha256').update(input).digest('hex'), output.pathname);
    }
  }
});

test('renders code, figures, display formulas and mathcal in representative articles', () => {
  const hunt = page('/blog/posts/hunt-szymanski/');
  assert.ok(hunt.includes('data-language="c++"'));
  assert.match(hunt, /class="[^"]*\bmathcal\b/);
  assert.ok(hunt.includes('/blog/images/hunt-szymanski/1.png'));
  const tableaux = page('/blog/posts/young-tableaux/');
  assert.ok(tableaux.includes('katex-display'));
  assert.equal([...tableaux.matchAll(/<img\b/g)].length, 7);
  const newton = page('/blog/posts/physicslab1-newton/');
  assert.equal([...newton.matchAll(/<img\b[^>]*src="https:\/\/lh/g)].length, 5);
});
