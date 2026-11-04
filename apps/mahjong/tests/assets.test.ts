import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';

test('keeps the complete tile set self-contained with its source license', () => {
  const root = new URL('../assets/tiles/', import.meta.url);
  const files = readdirSync(root).filter(file => file.endsWith('.svg'));
  assert.equal(files.length, 40);
  for (const file of files) {
    const svg = readFileSync(new URL(file, root), 'utf8');
    assert.match(svg, /<svg\b/);
    assert.doesNotMatch(svg, /<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/)/i);
  }
  assert.match(readFileSync(new URL('LICENSE.md', root), 'utf8'), /public domain/);
});

test('publishes the tool and app entry with canonical URLs and local tile images', () => {
  for (const path of ['', 'seating/']) {
    const html = readFileSync(new URL(`../dist/${path}index.html`, import.meta.url), 'utf8');
    assert.ok(html.includes(`rel="canonical" href="https://youngyojun.github.io/mahjong/${path}"`));
    const images = [...html.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map(match => match[1]);
    assert.ok(images.length >= 4);
    assert.ok(images.every(src => src.startsWith('/mahjong/')));
  }
});
