import { posts } from './posts';

const pageSize = 10;

export const homePages = Array.from({ length: Math.ceil(posts.length / pageSize) }, (_, index) => ({
  number: index + 1,
  url: index === 0 ? '/' : `/page${index + 1}/`,
  posts: posts.slice(index * pageSize, (index + 1) * pageSize),
}));
