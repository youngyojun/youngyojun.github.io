import { posts } from '../posts';

function cdata(text: string) {
  return `<![CDATA[${text.replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;
}

export function GET() {
  const entries = posts.map(post => {
    const content = post.html.replace(/<[^>]+>/g, '').replace(/\n/g, '');
    return `<entry>
      <title>${cdata(post.data.title)}</title>
      <url>${post.url}</url>
      <content type="text">${cdata(content)}</content>
      <categories>${post.categories.map(name => `<category>${cdata(name)}</category>`).join('')}</categories>
      <tags>${post.tags.map(name => `<tag>${cdata(name)}</tag>`).join('')}</tags>
    </entry>`;
  });
  return new Response(`<?xml version="1.0" encoding="utf-8"?><search>${entries.join('')}</search>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
