import type { APIContext } from 'astro';
import { posts } from '../lib/posts';
import { escapeXml } from '../lib/xml';
import { site as identity } from '../lib/site';

export function GET({ site }: APIContext) {
  if (!site) throw new Error('Atom requires a configured site URL');
  const author = `<author><name>${escapeXml(identity.author)}</name></author>`;
  const latest = posts.slice(0, 10);
  const entries = latest.map(post => {
    const url = new URL(post.url, site).href;
    const html = post.html.replace(/\b(href|src)=(['"])(\/[^'"]*)\2/g, (_, attr, quote, path) => `${attr}=${quote}${new URL(path, site).href}${quote}`);
    return `<entry><title>${escapeXml(post.data.title)}</title><id>${url}</id><link href="${url}"/><published>${post.data.date}</published><updated>${post.data.date}</updated>${author}<summary>${escapeXml(post.description)}</summary><content type="html" xml:base="${url}">${escapeXml(html)}</content>${post.data.tags.map(tag => `<category term="${escapeXml(tag)}"/>`).join('')}</entry>`;
  });
  return new Response(`<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom"><id>${new URL('/atom.xml', site).href}</id><title>${escapeXml(identity.title)}</title><subtitle>${escapeXml(identity.description)}</subtitle><link href="${new URL('/atom.xml', site).href}" rel="self"/><link href="${new URL('/blog/', site).href}"/><updated>${latest[0]?.data.date ?? '1970-01-01T00:00:00.000Z'}</updated>${author}${entries.join('')}</feed>`, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
}
