import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

// Names, counts and routes captured from the existing Jekyll tag pages.
const tags = [
  ['대회', 3], ['풀이', 3], ['출제', 1], ['나는코더다', 1], ['ICPC', 12],
  ['후기', 3], ['연습', 8], ['물리학실험', 8], ['물리학실험1', 8],
  ['물리학실험2', 1], ['보고서', 8], ['Graph', 1], ['Cut vertex', 1],
  ['Cut edge', 1], ['Algorithm', 7], ['Mathematics', 4], ['학교', 1], ['선형 대수학', 1],
];

test('publishes all 18 original tags with their names, counts and encoded hash links', () => {
  const path = new URL('../dist/tags/index.html', import.meta.url);
  assert.ok(existsSync(path), 'Missing /tags/ page');
  const html = readFileSync(path, 'utf8');
  for (const [name, count] of tags) {
    const link = html.match(new RegExp(`<a\\b[^>]*href="/tag/#/${encodeURIComponent(name)}"[^>]*>([\\s\\S]*?)</a>`));
    assert.ok(link, name);
    assert.equal(link[1].replace(/<[^>]*>/g, '').trim(), `${name} (${count})`, name);
  }
  assert.equal([...html.matchAll(/href="\/tag\/#\//g)].length, tags.length);
});

test('preserves tag memberships, chronological order and the ICPC page2 route', () => {
  const path = new URL('../dist/tag/index.html', import.meta.url);
  assert.ok(existsSync(path), 'Missing /tag/ page');
  const html = readFileSync(path, 'utf8');
  const sections = [...html.matchAll(/<section\b[^>]*data-tag="([^"]+)"[^>]*data-page="(\d+)"[^>]*>([\s\S]*?)<\/section>/g)];
  for (const [name, count] of tags) {
    const pages = sections.filter(section => section[1] === name);
    assert.equal(pages.length, Math.ceil(count / 10), name);
    const links = pages.flatMap(page => [...page[3].matchAll(/<li\b[^>]*>[\s\S]*?<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]));
    assert.equal(links.length, count, name);
    assert.equal(new Set(links).size, count, name);
    let previousDate = Infinity;
    for (const url of links) {
      const article = readFileSync(new URL(`../dist/${decodeURIComponent(url.slice(1))}index.html`, import.meta.url), 'utf8');
      assert.ok(article.includes(`href="/tag/#/${encodeURIComponent(name)}"`), `${name}: ${url}`);
      const date = Date.parse(article.match(/<time\b[^>]*datetime="([^"]+)"/)?.[1]);
      assert.ok(date <= previousDate, `${name}: order`);
      previousDate = date;
    }
  }
  assert.ok(html.includes('href="/tag/#/ICPC/page2"'));
  const oldICPCPosts = sections.find(section => section[1] === 'ICPC' && section[2] === '2')?.[3] ?? '';
  assert.deepEqual([...oldICPCPosts.matchAll(/<li\b[^>]*>[\s\S]*?<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]), [
    '/icpc/practice/2021/02/02/WF-practice/',
    '/contest/review/icpc/2020/11/14/2020-icpc-seoul-regional/',
  ]);
});
