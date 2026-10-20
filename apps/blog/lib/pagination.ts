import { site } from './site.ts';

export function paginate<T>(items: T[], base: string) {
  return Array.from({ length: Math.max(1, Math.ceil(items.length / site.pageSize)) }, (_, index) => ({
    number: index + 1,
    url: index ? `${base}page/${index + 1}/` : base,
    items: items.slice(index * site.pageSize, (index + 1) * site.pageSize),
  }));
}
