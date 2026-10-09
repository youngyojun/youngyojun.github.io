import type { MarkdownInstance } from 'astro';
import urls from './legacy-post-urls.json';

const modules = import.meta.glob<MarkdownInstance<{
  title: string;
  date?: string;
  categories: string[];
  tags?: string[] | null;
}>>('../../../_posts/*.md', { eager: true });

// Keep published Jekyll URLs fixed; add a verified mapping when adding a post.
export const posts = Object.entries(modules).map(([source, post]) => {
  const filename = source.split('/').at(-1)!;
  const url = urls[filename as keyof typeof urls];
  if (!url) throw new Error(`Missing legacy URL for ${filename}`);
  const rawDate = post.frontmatter.date ?? `${filename.slice(0, 10)}T00:00:00Z`;
  const isoDate = rawDate.replace(' ', 'T').replace(/ ([+-]\d{2})(\d{2})$/, '$1:$2');
  // Jekyll's published dates use UTC when the source has no offset.
  const publishedAt = new Date(/(Z|[+-]\d{2}:\d{2})$/i.test(isoDate) ? isoDate : `${isoDate}Z`).toISOString();
  return {
    ...post,
    url,
    publishedAt,
    displayDate: publishedAt.slice(0, 10),
    categories: post.frontmatter.categories,
    tags: post.frontmatter.tags ?? [],
  };
}).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

if (posts.length !== Object.keys(urls).length || new Set(posts.map(post => post.url)).size !== posts.length) {
  throw new Error('Legacy post URL mappings must match the sources and be unique');
}
