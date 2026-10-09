import type { APIContext } from 'astro';
import { publicDir } from 'astro:config/server';
import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homePages } from '../legacy-home-pages';
import { posts } from '../posts';
import { escapeXml } from '../xml';

export function GET({ site }: APIContext) {
  if (!site) throw new Error('The sitemap requires a configured site URL');
  const pages = [
    ...homePages.map(page => page.url),
    '/archives/', '/tags/', '/category/', '/categories/', '/tag/', '/about/',
  ];
  const downloads = new URL('downloadable_files/', publicDir);
  const pdfs = readdirSync(downloads, { recursive: true, withFileTypes: true })
    .filter(file => file.isFile() && file.name.endsWith('.pdf'))
    .map(file => {
      const path = join(file.parentPath, file.name);
      const name = relative(fileURLToPath(downloads), path).split(sep).map(encodeURIComponent).join('/');
      return { url: `/downloadable_files/${name}`, lastmod: statSync(path).mtime.toISOString() };
    });
  const entries = [
    ...posts.toReversed().map(post => ({ url: post.url, lastmod: post.publishedAt })),
    ...pages.map(url => ({ url, lastmod: undefined })),
    ...pdfs,
  ];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${entries.map(({ url, lastmod }) => `<url><loc>${escapeXml(new URL(url, site).href)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`).join('\n')}
    </urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
