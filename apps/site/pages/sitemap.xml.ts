import type { APIContext } from 'astro';
import { appPaths } from '../../../site.config.ts';

export function GET({ site }: APIContext) {
  if (!site) throw new Error('Sitemap requires a configured site URL');
  const blog = new URL(`${appPaths.blog}sitemap.xml`, site).href;
  return new Response(`<?xml version="1.0" encoding="utf-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${blog}</loc></sitemap></sitemapindex>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
