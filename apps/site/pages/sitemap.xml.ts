import type { APIContext } from 'astro';
import { appPaths } from '../../../site.config.ts';

export function GET({ site }: APIContext) {
  if (!site) throw new Error('Sitemap requires a configured site URL');
  const paths = ['site-sitemap.xml', ...Object.values(appPaths).filter(path => path !== appPaths.site).map(path => `${path}sitemap.xml`)];
  const sitemaps = paths.map(path => `<sitemap><loc>${new URL(path, site).href}</loc></sitemap>`).join('');
  return new Response(`<?xml version="1.0" encoding="utf-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps}</sitemapindex>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
