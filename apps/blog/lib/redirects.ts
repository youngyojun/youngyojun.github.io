import aliases from './post-aliases.json';
import { posts } from './posts';
import { paginate } from './pagination';

const slugs = new Set(posts.map(post => post.data.slug));
export const redirects = [
  ...Object.entries(aliases).map(([slug, from]) => {
    if (!slugs.has(slug)) throw new Error(`Redirect has no article: ${slug}`);
    return { from, to: `/blog/posts/${slug}/`, hashRoute: undefined };
  }),
  ...paginate(posts, '/blog/').slice(1).map(page => ({ from: `/page${page.number}/`, to: page.url, hashRoute: undefined })),
  { from: '/about/', to: '/blog/about/', hashRoute: undefined },
  { from: '/archives/', to: '/blog/archives/', hashRoute: 'archives' as const },
  { from: '/tags/', to: '/blog/tags/', hashRoute: undefined },
  { from: '/categories/', to: '/blog/categories/', hashRoute: undefined },
  { from: '/tag/', to: '/blog/tags/', hashRoute: 'tags' as const },
  { from: '/category/', to: '/blog/categories/', hashRoute: 'categories' as const },
];
