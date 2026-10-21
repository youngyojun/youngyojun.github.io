import type { AstroMarkdownOptions } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { mathOptions, rehypeHtmlMath } from './math.ts';

export const markdownOptions: AstroMarkdownOptions = {
  smartypants: false,
  remarkPlugins: [remarkMath],
  rehypePlugins: [
    rehypeHtmlMath,
    [rehypeKatex, mathOptions],
    () => (_tree, file) => {
      const error = file.messages.find(message => message.source === 'rehype-katex');
      if (error) file.fail(error);
    },
  ],
};
