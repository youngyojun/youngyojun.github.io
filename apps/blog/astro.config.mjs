import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { unified } from '@astrojs/markdown-remark';
import { markdownOptions } from './lib/markdown.ts';

const site = 'https://youngyojun.github.io';

export default defineConfig({
  site,
  srcDir: '.',
  trailingSlash: 'always',
  integrations: [react()],
  build: { assets: 'blog/_astro' },
  markdown: {
    processor: unified(markdownOptions),
  },
});
