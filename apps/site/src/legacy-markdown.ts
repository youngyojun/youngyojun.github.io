import { satteri, type SatteriProcessorOptions } from '@astrojs/markdown-satteri';

export function legacyProcessor(site: string) {
  return satteri({
    features: { math: true },
    hastPlugins: [legacyMarkdown(site), legacyHeadingIds()],
  });
}

export function legacyHeadingIds(): NonNullable<SatteriProcessorOptions['hastPlugins']>[number] {
  return () => {
    const counts = new Map<string, number>();
    return {
      name: 'legacy-heading-ids',
      element: {
        filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        visit(node, ctx) {
          if (typeof node.properties.id === 'string') return;
          const slug = ctx.textContent(node).toLowerCase().replace(/[^\p{Alphabetic}\p{M}\p{Nd}\p{Pc}\- \t]/gu, '').replace(/[ \t]/g, '-');
          const count = counts.get(slug) ?? 0;
          counts.set(slug, count + 1);
          // Match Kramdown GFM's counters, including old collisions, to preserve bookmarks.
          ctx.setProperty(node, 'id', slug + (count ? `-${count}` : ''));
        },
      },
    };
  };
}

export default function legacyMarkdown(site: string): NonNullable<SatteriProcessorOptions['hastPlugins']>[number] {
  const origin = new URL(site).host;
  return {
    name: 'legacy-markdown',
    options: { position: true },
    before(_root, ctx) {
      const frontmatter = ctx.data.astro?.frontmatter;
      // Jekyll's layout name is not an Astro component import.
      if (ctx.fileURL?.pathname.endsWith('/about/index.md') && frontmatter?.layout === 'page') {
        delete frontmatter.layout;
      }
    },
    element: {
      filter: ['code', 'img', 'a'],
      visit(node, ctx) {
        if (node.tagName === 'a') {
          const position = node.position;
          // This page originally left bare addresses as text; keep explicitly authored links.
          if (ctx.fileURL?.pathname.endsWith('/about/index.md') && position &&
            ctx.source.slice(position.start.offset, position.end.offset) === ctx.textContent(node)) {
            ctx.replaceNode(node, node.children);
          }
        } else if (node.tagName === 'img') {
          if (typeof node.properties.src !== 'string') return;
          const url = new URL(node.properties.src, site);
          if (url.host === origin && url.pathname.startsWith('/assets/')) {
            ctx.setProperty(node, 'src', url.pathname + url.search + url.hash);
          }
        } else {
          const classes = node.properties.className;
          if (!Array.isArray(classes) || !classes.includes('language-math')) return;
          const display = classes.includes('math-display');
          // Jekyll Markdown unescapes these before MathJax sees them.
          const latex = ctx.textContent(node).replace(/\\\\(?=[{}_])/g, '\\');
          ctx.replaceNode(display ? ctx.parent(node) : node, {
            type: 'element',
            tagName: display ? 'div' : 'span',
            properties: {},
            children: [{ type: 'text', value: display ? `\\[${latex}\\]` : `\\(${latex}\\)` }],
          });
        }
      },
    },
  };
}
