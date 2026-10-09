import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { postSchema } from './post-schema';

const posts = defineCollection({
  loader: glob({
    base: '../../_posts',
    pattern: '**/*.md',
    // Keep entries separate until the authored slugs have been checked for duplicates.
    generateId: ({ entry }) => entry,
  }),
  schema: postSchema,
});

export const collections = { posts };
