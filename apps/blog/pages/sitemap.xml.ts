import type { APIContext } from 'astro';
import { publicDir } from 'astro:config/server';
import { readdirSync } from 'node:fs';
import { posts, groupPosts } from '../lib/posts';
import { paginate } from '../lib/pagination';
import { escapeXml } from '../lib/xml';

export function GET({ site }: APIContext) {
  if (!site) throw new Error('Sitemap requires a configured site URL');
  const pages = [
    ...paginate(posts, '/blog/').map(page => page.url),
    '/blog/archives/', '/blog/about/', '/blog/tags/', '/blog/categories/',
    ...(['tags', 'categories'] as const).flatMap(kind => groupPosts(kind).flatMap(group => paginate(group.posts, group.url).map(page => page.url))),
  ];
  const pdfs = readdirSync(publicDir, { recursive: true })
    .map(String).filter(path => path.endsWith('.pdf')).map(path => `/${path.split('/').map(encodeURIComponent).join('/')}`);
  const entries = [
    ...posts.map(post => ({ path: post.url, date: post.data.date })),
    ...[...pages, ...pdfs].map(path => ({ path, date: undefined })),
  ];
  return new Response(`<?xml version="1.0" encoding="utf-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.map(entry => `<url><loc>${escapeXml(new URL(entry.path, site).href)}</loc>${entry.date ? `<lastmod>${entry.date}</lastmod>` : ''}</url>`).join('')}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
