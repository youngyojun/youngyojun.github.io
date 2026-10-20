import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import { fromHtml } from 'hast-util-from-html';
import { test } from 'node:test';

test('all built pages have valid internal links, heading fragments and local assets', () => {
  const directory = new URL('../dist/', import.meta.url);
  const root = decodeURIComponent(directory.pathname);
  const files = readdirSync(directory, { recursive: true }).map(String).filter(name => name.endsWith('.html'));
  const documents = new Map();
  function elements(node, output = []) {
    if (node.type === 'element') output.push(node);
    for (const child of node.children ?? []) elements(child, output);
    return output;
  }
  for (const file of files) documents.set(resolve(root, file), elements(fromHtml(readFileSync(new URL(file, directory), 'utf8'))));
  const broken = [];
  for (const [file, nodes] of documents) {
    const base = `https://youngyojun.github.io/${relative(root, file).split(sep).join('/').replace(/index\.html$/, '')}`;
    for (const node of nodes) {
      const attribute = node.tagName === 'img' || node.tagName === 'script' ? 'src' : ['a', 'link'].includes(node.tagName) ? 'href' : undefined;
      const value = attribute && node.properties?.[attribute];
      if (typeof value !== 'string' || !value) continue;
      const target = new URL(value, base);
      if (!['http:', 'https:'].includes(target.protocol) || target.hostname !== 'youngyojun.github.io') continue;
      let path = resolve(root, `.${decodeURIComponent(target.pathname)}`);
      if (target.pathname.endsWith('/')) path = resolve(path, 'index.html');
      if (!existsSync(path)) { broken.push(`${base} → ${value}`); continue; }
      if (target.hash && node.tagName === 'a' && documents.has(path)) {
        const id = decodeURIComponent(target.hash.slice(1));
        if (id && !documents.get(path).some(element => element.properties?.id === id)) broken.push(`${base} → ${value} (missing heading)`);
      }
    }
  }
  assert.deepEqual(broken, []);
});
