import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('publishes the original about page with its title, links, formatting and heading bookmarks', () => {
  const output = new URL('../dist/about/index.html', import.meta.url);
  assert.ok(existsSync(output), 'Missing original /about/ page');
  const html = readFileSync(output, 'utf8');
  assert.ok(html.includes('<h1 class="post-title">저를 소개합니다! :D</h1>'));
  assert.ok(html.includes('href="https://youngyojun.github.io/about/"'));
  const body = html.match(/<div class="post-body">([\s\S]*?)<\/div>/)?.[1] ?? '';
  assert.deepEqual([...body.matchAll(/<h[1-6]\b[^>]*id="([^"]+)"/g)].map(match => match[1]), [
    'who-am-i', 'about-me', 'my-profiles', 'articles', 'how-to-contect', 'email',
  ]);
  const source = readFileSync(new URL('../../../about/index.md', import.meta.url), 'utf8');
  const links = [...source.matchAll(/\]\(([^)]+)\)/g)].map(match => match[1]);
  const renderedLinks = [...body.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1].replaceAll('&amp;', '&'));
  assert.deepEqual(renderedLinks, links);
  assert.ok(body.includes('<strong>2001년 6월 10일생, 윤교준. Gyojun Youn.</strong>'));
  for (const text of ['2월', 'INFJ', '과거 흑역사 보존용']) assert.ok(body.includes(`<del>${text}</del>`));
  assert.ok(body.includes('youngyojun <em>at</em> gmail <em>dot</em> com'));
  for (const path of ['index.html', 'secmem/2022/03/20/Hunt-Szymanski/index.html', 'about/index.html']) {
    const page = readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
    assert.ok(/<a\b[^>]*href="\/about\/"[^>]*>소개<\/a>/.test(page), path);
  }
});
