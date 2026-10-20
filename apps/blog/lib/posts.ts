import { getCollection } from 'astro:content';
import { validatePostSlugs } from './slugs.ts';
import { description, plainText } from './text.ts';

const entries = await getCollection('posts');
validatePostSlugs(entries.map(post => [post.filePath ?? post.id, post.id] as const));

export const posts = entries.map(entry => {
  if (!entry.rendered || entry.body === undefined) throw new Error(`Missing article content: ${entry.id}`);
  return {
    ...entry,
    slug: entry.id,
    html: entry.rendered.html,
    text: plainText(entry.rendered.html),
    description: entry.data.description ?? description(entry.rendered.html),
    url: `/blog/posts/${entry.id}/`,
    displayDate: entry.data.date.slice(0, 10),
  };
}).sort((a, b) => b.data.date.localeCompare(a.data.date) || a.slug.localeCompare(b.slug));

export type Post = typeof posts[number];

export function groupPosts(field: 'tags' | 'categories') {
  return [...new Set(posts.flatMap(post => post.data[field]))]
    .sort((a, b) => a.localeCompare(b, 'ko'))
    .map(name => ({
      name,
      url: `/blog/${field}/${encodeURIComponent(name)}/`,
      posts: posts.filter(post => post.data[field].includes(name)),
    }));
}
