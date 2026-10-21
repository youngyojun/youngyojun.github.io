import { appPaths } from '../../../site.config.ts';

export const site = {
  title: "Gyojun Youn's PS Blog",
  description: '@youngyojun, @GyojunYoun, and @yclock',
  author: 'Gyojun Youn',
  blog: appPaths.blog,
  pageSize: 10,
} as const;

export function blogPath(path = ''): string {
  return `${site.blog}${path}`;
}
