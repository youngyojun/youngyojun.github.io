export function redirectTarget(to: string, kind: string | undefined, hash: string): string {
  if (kind === 'archives' && hash.startsWith('#/')) return to;
  if ((kind === 'tags' || kind === 'categories') && hash.startsWith('#/')) {
    const match = hash.match(/^#\/([^/]+)(?:\/page([1-9]\d*))?\/?$/);
    if (!match) return to;
    try {
      const name = encodeURIComponent(decodeURIComponent(match[1]));
      return `${to}${name}/${match[2] && match[2] !== '1' ? `page/${match[2]}/` : ''}`;
    } catch { return to; }
  }
  return to + hash;
}
