import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import legacyMarkdown, { legacyHeadingIds } from './src/legacy-markdown.ts';

const site = 'https://youngyojun.github.io';

export default defineConfig({
  site,
  trailingSlash: 'always',
  markdown: {
    processor: satteri({
      features: { math: true },
      hastPlugins: [legacyMarkdown(site), legacyHeadingIds()],
    }),
  },
});
