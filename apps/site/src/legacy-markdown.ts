import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';

export default function legacyMarkdown(site: string): NonNullable<SatteriProcessorOptions['hastPlugins']>[number] {
  const origin = new URL(site).host;
  return {
    name: 'legacy-markdown',
    element: {
      filter: ['code', 'img'],
      visit(node, ctx) {
        if (node.tagName === 'img') {
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
