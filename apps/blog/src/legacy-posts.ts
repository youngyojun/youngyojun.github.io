import type { MarkdownInstance } from 'astro';
import urls from './legacy-post-urls.json';
import { validatePostSlugs } from './post-slugs';

const modules = import.meta.glob<MarkdownInstance<{
  title: string;
  slug: string;
  date?: string;
  categories: string[];
  tags?: string[] | null;
}>>('../../../_posts/*.md', { eager: true });

validatePostSlugs(Object.entries(modules).map(([source, post]) => [source, post.frontmatter.slug] as const));

export const posts = Object.entries(modules).map(([source, post]) => {
  const filename = source.split('/').at(-1)!;
  const legacyUrl = (urls as Partial<Record<string, string>>)[filename];
  const rawDate = post.frontmatter.date ?? `${filename.slice(0, 10)}T00:00:00Z`;
  const isoDate = rawDate.replace(' ', 'T').replace(/ ([+-]\d{2})(\d{2})$/, '$1:$2');
  // Jekyll's published dates use UTC when the source has no offset.
  const publishedAt = new Date(/(Z|[+-]\d{2}:\d{2})$/i.test(isoDate) ? isoDate : `${isoDate}Z`).toISOString();
  return {
    ...post,
    url: `/blog/posts/${post.frontmatter.slug}/`,
    legacyUrl,
    publishedAt,
    displayDate: publishedAt.slice(0, 10),
    categories: post.frontmatter.categories,
    tags: post.frontmatter.tags ?? [],
  };
}).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

const legacyUrls = posts.flatMap(post => post.legacyUrl ? [post.legacyUrl] : []);
if (legacyUrls.length !== Object.keys(urls).length || new Set(legacyUrls).size !== legacyUrls.length) {
  throw new Error('Legacy post URL mappings must match the sources and be unique');
}
