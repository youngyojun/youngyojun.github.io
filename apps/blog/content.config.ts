import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { pageSchema, postSchema } from './lib/schema';

export const collections = {
  posts: defineCollection({
    loader: glob({ base: './content/posts', pattern: '*.md', generateId: ({ entry }) => entry }),
    schema: postSchema,
  }),
  pages: defineCollection({
    loader: glob({ base: './content/pages', pattern: '*.md' }),
    schema: pageSchema,
  }),
};
