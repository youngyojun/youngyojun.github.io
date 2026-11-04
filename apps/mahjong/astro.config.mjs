import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { siteUrl, appPaths } from '../../site.config.ts';

export default defineConfig({
  site: siteUrl,
  base: appPaths.mahjong,
  srcDir: '.',
  trailingSlash: 'always',
  integrations: [react()],
});
