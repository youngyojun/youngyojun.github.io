import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { unified } from '@astrojs/markdown-remark';
import { markdownOptions } from './lib/markdown.ts';
import { siteUrl, appPaths } from '../../site.config.ts';

export default defineConfig({
  site: siteUrl,
  base: appPaths.blog,
  srcDir: '.',
  trailingSlash: 'always',
  integrations: [react()],
  markdown: {
    processor: unified(markdownOptions),
  },
});
