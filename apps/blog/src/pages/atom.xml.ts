import type { APIContext } from 'astro';
import { legacyExcerptSource, legacyProcessor } from '../legacy-markdown';
import { posts } from '../legacy-posts';
import { escapeXml } from '../xml';

export async function GET({ site }: APIContext) {
  if (!site) throw new Error('The Atom feed requires a configured site URL');
  const renderer = await legacyProcessor(site.href).createRenderer({});
  const author = '<author><name>Gyojun Youn</name></author>';
  const feedUrl = new URL('/atom.xml', site).href;
  const entries = await Promise.all(posts.slice(0, 10).map(async post => {
    const url = new URL(post.url, site).href;
    const content = (await post.compiledContent()).trim();
    const { code } = await renderer.render(legacyExcerptSource(post.rawContent()));
    const summary = code.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    return `<entry>
      <title type="html">${escapeXml(post.frontmatter.title)}</title>
      <link href="${escapeXml(url)}" rel="alternate" type="text/html" title="${escapeXml(post.frontmatter.title)}" />
      <published>${post.publishedAt}</published>
      <updated>${post.publishedAt}</updated>
      <id>${escapeXml(url.slice(0, -1))}</id>
      <content type="html" xml:base="${escapeXml(url)}">${escapeXml(content)}</content>
      ${author}
      ${post.tags.map(tag => `<category term="${escapeXml(tag)}" />`).join('')}
      <summary type="html">${escapeXml(summary)}</summary>
    </entry>`;
  }));
  return new Response(`<?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <link href="${escapeXml(feedUrl)}" rel="self" type="application/atom+xml" />
      <link href="${escapeXml(new URL('/', site).href)}" rel="alternate" type="text/html" />
      <updated>${new Date().toISOString()}</updated>
      <id>${escapeXml(feedUrl)}</id>
      <title type="html">Gyojun Youn’s PS Blog</title>
      <subtitle>@youngyojun, GyojunYoun, and yclock's PS Blog</subtitle>
      ${author}
      ${entries.join('')}
    </feed>`, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } });
}
