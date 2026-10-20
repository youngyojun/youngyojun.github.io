import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import { plainText } from '../lib/text.ts';

const originals = JSON.parse(readFileSync(new URL('./fixtures/posts.json', import.meta.url), 'utf8'));
const aliases = JSON.parse(readFileSync(new URL('./fixtures/post-urls.json', import.meta.url), 'utf8'));
const page = path => readFileSync(new URL(`../dist/${decodeURIComponent(path.slice(1))}index.html`, import.meta.url), 'utf8');

test('publishes every original article with its title, UTC date and classifications', () => {
  for (const original of originals) {
    const html = page(`/blog/posts/${original.slug}/`);
    const header = html.match(/<header class="article-header">([\s\S]*?)<\/header>/)?.[1];
    assert.ok(header, original.slug);
    assert.equal(plainText(header.match(/<h1>([\s\S]*?)<\/h1>/)[1]), original.title);
    assert.ok(header.includes(`datetime="${original.date}"`), original.slug);
    for (const category of original.categories) assert.ok(header.includes(`/blog/categories/${encodeURIComponent(category)}/`), category);
    for (const tag of original.tags) assert.ok(header.includes(`/blog/tags/${encodeURIComponent(tag)}/`), tag);
    assert.ok(html.includes(`href="https://youngyojun.github.io/blog/posts/${original.slug}/"`));
    assert.ok(!html.includes('katex-error'), original.slug);
    assert.ok(!html.includes('MathJax'), original.slug);
  }
});

test('old article URLs contain a canonical and a visible link to the new address', () => {
  for (const [old, destination] of Object.entries(aliases)) {
    const html = page(old);
    assert.ok(html.includes(`href="https://youngyojun.github.io${destination}"`), old);
    assert.ok(html.includes(`href="${destination}"`), old);
    assert.ok(html.includes(`0;url=${destination}`), old);
    assert.ok(!html.includes('class="prose"'), old);
  }
});

test('copies original article figures and all attachments without modifying their bytes', () => {
  for (const directory of ['assets/images/posts', 'downloadable_files']) {
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
  assert.ok(hunt.includes('/assets/images/posts/2022-03-20-Hunt-Szymanski/1.png'));
  const tableaux = page('/blog/posts/young-tableaux/');
  assert.ok(tableaux.includes('katex-display'));
  assert.equal([...tableaux.matchAll(/<img\b/g)].length, 7);
  const newton = page('/blog/posts/physicslab1-newton/');
  assert.equal([...newton.matchAll(/<img\b[^>]*src="https:\/\/lh/g)].length, 5);
});
