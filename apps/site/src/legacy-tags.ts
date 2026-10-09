import { posts } from './legacy-posts';

// Keep Jekyll's first-occurrence order in the tag index.
export const tags = [...new Set(posts.toReversed().flatMap(post => post.tags))].map(name => ({
  name,
  url: `/tag/#/${encodeURIComponent(name)}`,
  posts: posts.filter(post => post.tags.includes(name)),
}));
