import { posts } from './posts';

function groupPosts(field: 'tags' | 'categories') {
  const route = field === 'tags' ? 'tag' : 'category';
  // Keep Jekyll's first-occurrence order in each index.
  return [...new Set(posts.toReversed().flatMap(post => post[field]))].map(name => ({
    name,
    url: `/${route}/#/${encodeURIComponent(name)}`,
    posts: posts.filter(post => post[field].includes(name)),
  }));
}

export const tags = groupPosts('tags');
export const categories = groupPosts('categories');
