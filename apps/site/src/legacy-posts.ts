import type { MarkdownInstance } from 'astro';
import urls from './legacy-post-urls.json';

const modules = import.meta.glob<MarkdownInstance<{ title: string }>>('../../../_posts/*.md', { eager: true });

// Keep published Jekyll URLs fixed; add a verified mapping when adding a post.
export const posts = Object.entries(modules).map(([source, post]) => {
  const filename = source.split('/').at(-1)!;
  const url = urls[filename as keyof typeof urls];
  if (!url) throw new Error(`Missing legacy URL for ${filename}`);
  return { ...post, url };
});

if (posts.length !== Object.keys(urls).length || new Set(posts.map(post => post.url)).size !== posts.length) {
  throw new Error('Legacy post URL mappings must match the sources and be unique');
}
