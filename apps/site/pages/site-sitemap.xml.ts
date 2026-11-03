import type { APIContext } from 'astro';
import { appPaths } from '../../../site.config.ts';

export function GET({ site }: APIContext) {
  if (!site) throw new Error('Sitemap requires a configured site URL');
  return new Response(`<?xml version="1.0" encoding="utf-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${new URL(appPaths.site, site).href}</loc></url></urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
