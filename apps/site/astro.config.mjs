import { defineConfig } from 'astro/config';
import { legacyProcessor } from './src/legacy-markdown.ts';

const site = 'https://youngyojun.github.io';

export default defineConfig({
  site,
  trailingSlash: 'always',
  markdown: {
    processor: legacyProcessor(site),
  },
});
