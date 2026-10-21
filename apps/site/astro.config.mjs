import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { siteUrl, appPaths } from '../../site.config.ts';

export default defineConfig({
  site: siteUrl,
  base: appPaths.site,
  srcDir: '.',
  trailingSlash: 'always',
  markdown: { processor: unified() },
});
