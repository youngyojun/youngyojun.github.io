import { fromHtml } from 'hast-util-from-html';
import { toText } from 'hast-util-to-text';

function removeMathCopies(node: ReturnType<typeof fromHtml>['children'][number] | ReturnType<typeof fromHtml>) {
  if (!('children' in node)) return;
  node.children = node.children.filter(child => child.type !== 'element' || (
    child.tagName !== 'annotation' &&
    !(Array.isArray(child.properties.className) && child.properties.className.includes('katex-html'))
  ));
  node.children.forEach(removeMathCopies);
}

export function plainText(html: string): string {
  const tree = fromHtml(html, { fragment: true });
  removeMathCopies(tree);
  return toText(tree).replace(/\s+/g, ' ').trim();
}

export function description(html: string): string {
  const paragraph = html.match(/<p\b[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? html;
  const text = plainText(paragraph);
  return text.length > 180 ? `${text.slice(0, 180).trimEnd()}…` : text;
}
