import { z } from 'astro/zod';

export const pageSchema = z.object({ title: z.string().trim().min(1) }).strict();
const classification = z.string().trim().min(1).refine(value => !/[\/\\#?]/.test(value) && value !== '.' && value !== '..', 'Use a single taxonomy name without URL delimiters');

export const postSchema = z.object({
  title: z.string().trim().min(1),
  // Authors always write Korean Standard Time; keep the offset explicit in published metadata.
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'Use KST YYYY-MM-DD HH:mm:ss')
    .transform(value => `${value.replace(' ', 'T')}+09:00`)
    .pipe(z.iso.datetime({ offset: true })),
  description: z.string().trim().min(1).optional(),
  categories: z.array(classification).default([]),
  tags: z.array(classification).default([]),
}).strict();
