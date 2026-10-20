import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import { postSchema } from '../lib/schema.ts';
import { validatePostSlugs } from '../lib/slugs.ts';

test('validates authored content independently of filenames and retains every migrated post', () => {
  const directory = new URL('../content/posts/', import.meta.url);
  assert.ok(existsSync(directory), 'Blog-owned content directory is missing');
  const files = readdirSync(directory).filter(name => name.endsWith('.md'));
  const originals = JSON.parse(readFileSync(new URL('./fixtures/posts.json', import.meta.url), 'utf8'));
  const entries = files.map(name => {
    const source = readFileSync(new URL(name, directory), 'utf8');
    const data = postSchema.parse(parseFrontmatter(source).frontmatter);
    return [name, data.slug];
  });
  validatePostSlugs(entries);
  for (const post of originals) assert.ok(entries.some(([, slug]) => slug === post.slug), post.slug);
});
