export function validatePostSlugs(entries: Iterable<readonly [source: string, slug: unknown]>): void {
  const sources = new Map<string, string>();
  for (const [source, slug] of entries) {
    if (typeof slug !== 'string' || slug.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)?.[0] !== slug) {
      throw new Error(`Invalid post slug in ${source}: use lowercase letters, digits, and single hyphens`);
    }
    if (sources.has(slug)) {
      throw new Error(`Duplicate post slug "${slug}" in ${sources.get(slug)} and ${source}`);
    }
    sources.set(slug, source);
  }
}
