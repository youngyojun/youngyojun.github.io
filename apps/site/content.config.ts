import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
  pages: defineCollection({
    loader: glob({ base: './content/pages', pattern: '*.md' }),
    schema: z.object({ title: z.string().trim().min(1) }).strict(),
  }),
};
