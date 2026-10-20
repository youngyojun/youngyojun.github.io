import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { pageSchema, postSchema } from './lib/schema';

export const collections = {
  posts: defineCollection({
    // Preserve the filename verbatim so invalid URL identifiers fail validation instead of being rewritten.
    loader: glob({ base: './content/posts', pattern: '*.md', generateId: ({ entry }) => entry.slice(0, -3) }),
    schema: postSchema,
  }),
  pages: defineCollection({
    loader: glob({ base: './content/pages', pattern: '*.md' }),
    schema: pageSchema,
  }),
};
