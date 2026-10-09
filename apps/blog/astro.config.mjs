import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { legacyProcessor } from './src/legacy-markdown.ts';

const site = 'https://youngyojun.github.io';

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [react()],
  markdown: {
    processor: legacyProcessor(site),
  },
});
