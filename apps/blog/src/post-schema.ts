import { z } from 'astro/zod';

export const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  date: z.union([
    z.date(),
    z.string().transform(value => {
      const iso = value.replace(' ', 'T').replace(/ ([+-]\d{2})(\d{2})$/, '$1:$2');
      // Preserve the UTC meaning of original dates without an explicit offset.
      return /(Z|[+-]\d{2}:\d{2})$/i.test(iso) ? iso : `${iso}Z`;
    }).pipe(z.iso.datetime({ offset: true })),
  ]).pipe(z.coerce.date()).transform(value => value.toISOString()),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).nullish().transform(tags => tags ?? []),
}).strict();
