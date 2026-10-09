import { getCollection } from 'astro:content';
import urls from './legacy-post-urls.json';
import { validatePostSlugs } from './post-slugs';

const entries = await getCollection('posts');

validatePostSlugs(entries.map(post => [post.filePath ?? post.id, post.data.slug] as const));

export const posts = entries.map(post => {
  if (post.body === undefined || !post.rendered) {
    throw new Error(`Missing Markdown content for ${post.filePath ?? post.id}`);
  }
  const legacyUrl = (urls as Partial<Record<string, string>>)[post.data.slug];
  const publishedAt = post.data.date;
  return {
    ...post,
    body: post.body,
    html: post.rendered.html,
    url: `/blog/posts/${post.data.slug}/`,
    legacyUrl,
    publishedAt,
    displayDate: publishedAt.slice(0, 10),
    categories: post.data.categories,
    tags: post.data.tags,
  };
}).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

const legacyUrls = posts.flatMap(post => post.legacyUrl ? [post.legacyUrl] : []);
if (legacyUrls.length !== Object.keys(urls).length || new Set(legacyUrls).size !== legacyUrls.length) {
  throw new Error('Legacy post URL mappings must match the sources and be unique');
}
