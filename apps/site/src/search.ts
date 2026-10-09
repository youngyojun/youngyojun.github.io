export interface SearchEntry {
  title: string;
  content: string;
  url: string;
}

export interface SearchHit {
  start: number;
  end: number;
}

function hits(text: string, keywords: string[]): SearchHit[] {
  const lower = text.toLowerCase();
  return keywords.flatMap(keyword => {
    const matches: SearchHit[] = [];
    for (let start = lower.indexOf(keyword); start !== -1; start = lower.indexOf(keyword, start + keyword.length)) {
      matches.push({ start, end: start + keyword.length });
    }
    return matches;
  }).sort((a, b) => a.start - b.start || b.end - a.end);
}

function mergeHits(matches: SearchHit[]): SearchHit[] {
  const merged: SearchHit[] = [];
  for (const hit of matches) {
    const previous = merged.at(-1);
    if (previous && hit.start < previous.end) previous.end = Math.max(previous.end, hit.end);
    else merged.push({ ...hit });
  }
  return merged;
}

export function searchPosts(entries: SearchEntry[], input: string) {
  const query = input.trim().toLowerCase();
  if (!query) return [];
  const words = query.split(/[\s-]+/).filter(Boolean);
  const keywords = [...new Set([...words, query])];

  return entries.flatMap((entry, index) => {
    const titleHits = hits(entry.title, keywords);
    const contentHits = hits(entry.content, keywords);
    if (!entry.title || !titleHits.length && !contentHits.length) return [];
    const passages = [];
    const merged = mergeHits(contentHits);
    for (let i = 0; i < merged.length;) {
      const start = Math.max(0, merged[i].start - 20);
      const end = Math.min(entry.content.length, Math.max(merged[i].start + 80, merged[i].end));
      const excerptHits = [];
      while (i < merged.length && merged[i].end <= end) {
        excerptHits.push({ start: merged[i].start - start, end: merged[i].end - start });
        i++;
      }
      const excerpt = entry.content.slice(start, end);
      passages.push({ excerpt, excerptHits, phrases: hits(excerpt, [query]).length, start });
    }
    passages.sort((a, b) => b.phrases - a.phrases || b.excerptHits.length - a.excerptHits.length || a.start - b.start);
    return [{
      title: entry.title,
      url: entry.url,
      titleHits: mergeHits(titleHits),
      excerpt: passages[0]?.excerpt ?? '',
      excerptHits: passages[0]?.excerptHits ?? [],
      phrases: hits(entry.title, [query]).length + hits(entry.content, [query]).length,
      count: titleHits.length + contentHits.length,
      index,
    }];
  }).sort((a, b) => b.phrases - a.phrases || b.count - a.count || b.index - a.index);
}
