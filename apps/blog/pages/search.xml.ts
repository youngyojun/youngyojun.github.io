import { posts } from '../lib/posts';
import { escapeXml } from '../lib/xml';
export function GET() {
  return new Response(`<?xml version="1.0" encoding="utf-8"?><search>${posts.map(post => `<entry><title>${escapeXml(post.title)}</title><url>${post.url}</url><content>${escapeXml(post.text)}</content></entry>`).join('')}</search>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
