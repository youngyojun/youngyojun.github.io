import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import katex from 'katex';
import { fromHtml } from 'hast-util-from-html';
import rehypeRaw from 'rehype-raw';
import type { Nodes } from 'mdast';
import type { Root, Element } from 'hast';
import { escapeXml } from './xml.ts';

const parser = unified().use(remarkParse).use(remarkMath);
export const mathOptions = { strict: 'error', throwOnError: true, trust: false } as const;

// Parse only math; titles and HTML text must not acquire Markdown links or markup.
export function renderMathText(value: string): string {
  let html = '';
  let offset = 0;
  function visit(node: Nodes) {
    if (node.type === 'inlineMath' || node.type === 'math') {
      const start = node.position!.start.offset!;
      const end = node.position!.end.offset!;
      html += escapeXml(value.slice(offset, start));
      html += katex.renderToString(node.value, { ...mathOptions, displayMode: node.type === 'math' });
      offset = end;
    } else if ('children' in node) node.children.forEach(visit);
  }
  visit(parser.parse(value));
  return html + escapeXml(value.slice(offset));
}

export function rehypeHtmlMath() {
  const parseHtml = rehypeRaw();
  const transform: ReturnType<typeof rehypeRaw> = (tree, file) => {
    const ranges: [number, number][] = [];
    function collect(node: Root | Element) {
      // Before HTML parsing, remark-rehype also supplies raw nodes outside standard HAST.
      for (const child of node.children as (Root['children'][number] | { type: 'raw'; position?: Root['position'] })[]) {
        if (child.type === 'raw' && child.position) ranges.push([child.position.start.offset!, child.position.end.offset!]);
        else if (child.type === 'element') collect(child);
      }
    }
    collect(tree);
    const parsed = parseHtml(tree, file);
    function visit(node: Root | Element) {
      if (node.type === 'element' && (
        ['code', 'pre', 'script', 'style', 'textarea', 'math'].includes(node.tagName) ||
        (Array.isArray(node.properties.className) && node.properties.className.includes('katex'))
      )) return;
      node.children = node.children.flatMap(child => {
        if (child.type === 'element') visit(child);
        if (child.type !== 'text' || !child.value.includes('$')) return [child];
        // Markdown already handled its own escapes; only raw HTML needs a second pass.
        const start = child.position?.start.offset;
        const end = child.position?.end.offset;
        if (start === undefined || end === undefined || !ranges.some(([from, to]) => from <= start && end <= to)) return [child];
        return fromHtml(renderMathText(child.value), { fragment: true }).children as Element['children'];
      });
    }
    visit(parsed);
    return parsed;
  };
  return transform;
}
