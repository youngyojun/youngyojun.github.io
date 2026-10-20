import { z } from 'astro/zod';

export const pageSchema = z.object({ title: z.string().trim().min(1) }).strict();
const classification = z.string().trim().min(1).refine(value => !/[\/\\#?]/.test(value) && value !== '.' && value !== '..', 'Use a single taxonomy name without URL delimiters');

export const postSchema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().min(1),
  date: z.iso.datetime({ offset: true }).transform(value => new Date(value).toISOString()),
  description: z.string().trim().min(1).optional(),
  categories: z.array(classification).default([]),
  tags: z.array(classification).default([]),
}).strict();
