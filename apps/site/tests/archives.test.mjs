import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

// Page boundaries and year headings observed in the UTC Jekyll archive.
const pages = [
  [1, ['2025', '2023', '2022', '2021'], '/icpc/2025/11/22/2025-icpc-seoul-finals-solutions/', '/study/physicslab/physicslab1/2021/05/05/physicslab1-wave/'],
  [2, ['2021'], '/secmem/2021/04/18/generating-functions-1/', '/icpc/practice/2021/03/08/WF-practice/'],
  [3, ['2021', '2020'], '/icpc/practice/2021/03/05/WF-practice/', '/daily/2020/02/15/first-article/'],
];

function archive() {
  const path = new URL('../dist/archives/index.html', import.meta.url);
  assert.ok(existsSync(path), 'Missing /archives/ page');
  return readFileSync(path, 'utf8');
}

function postLinks(html) {
  return [...html.matchAll(/<li\b[^>]*>[\s\S]*?<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]);
}

test('preserves all 30 archive posts in chronological order with the original page boundaries and years', () => {
  const sections = [...archive().matchAll(/<section\b[^>]*data-page="(\d+)"[^>]*>([\s\S]*?)<\/section>/g)];
  assert.equal(sections.length, 3);
  for (const [page, years, first, last] of pages) {
    const html = sections.find(section => section[1] === String(page))?.[2] ?? '';
    const links = postLinks(html);
    assert.equal(links.length, 10, `Page ${page}`);
    assert.equal(links[0], first);
    assert.equal(links.at(-1), last);
    assert.deepEqual([...html.matchAll(/<h2\b[^>]*>(\d{4})<\/h2>/g)].map(match => match[1]), years);
  }
  const index = ['index.html', 'page2/index.html', 'page3/index.html'].map(path => readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8')).join('\n');
  assert.deepEqual(sections.flatMap(section => postLinks(section[2])), postLinks(index));
});

test('keeps the legacy archive page links and displays month/day without changing publication dates', () => {
  const html = archive();
  for (const path of ['/archives/#/', '/archives/#/page2', '/archives/#/page3']) {
    assert.ok(html.includes(`href="${path}"`), path);
  }
  assert.ok(html.includes('href="https://youngyojun.github.io/archives/"'));
  const times = [...html.matchAll(/<time\b[^>]*datetime="([^"]+)"[^>]*>(.*?)<\/time>/g)];
  assert.equal(times.length, 30);
  for (const [, publishedAt, displayDate] of times) {
    assert.equal(displayDate, publishedAt.slice(5, 10));
  }
});
