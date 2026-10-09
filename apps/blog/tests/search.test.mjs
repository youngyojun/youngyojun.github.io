import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

async function search(entries, query) {
  const source = new URL('../src/search.ts', import.meta.url);
  assert.ok(existsSync(source), 'Missing title/body search');
  const { searchPosts } = await import(source);
  return searchPosts(entries, query);
}

const entries = [
  { title: 'Newton experiment', content: '공기저항과 중력 가속도를 관찰한다.', url: '/newton/' },
  { title: 'Hunt–Szymanski', content: 'Longest common subsequence algorithm.', url: '/hunt/' },
];

test('searches Korean body text and English titles without case sensitivity', async () => {
  assert.deepEqual((await search(entries, ' 공기저항 ')).map(result => result.url), ['/newton/']);
  assert.deepEqual((await search(entries, 'nEwToN')).map(result => result.url), ['/newton/']);
  assert.deepEqual((await search(entries, 'SUBSEQUENCE')).map(result => result.url), ['/hunt/']);
  assert.deepEqual(await search(entries, '   '), []);
  assert.deepEqual(await search(entries, '없는검색어'), []);
});

test('keeps legacy any-keyword matching for spaces and hyphens and ranks phrases before individual hits', async () => {
  assert.deepEqual((await search(entries, '뉴턴-subsequence')).map(result => result.url), ['/hunt/']);
  const ranked = [
    { title: 'alpha', content: 'alpha alpha / beta beta', url: '/words/' },
    { title: 'alpha beta', content: '', url: '/phrase/' },
    { title: 'beta', content: '', url: '/single/' },
  ];
  assert.deepEqual((await search(ranked, 'alpha beta')).map(result => result.url), ['/phrase/', '/words/', '/single/']);
});

test('returns one highlighted body excerpt around the best matching passage', async () => {
  const content = 'x'.repeat(150) + 'alpha' + 'x'.repeat(150) + 'alpha beta';
  const [result] = await search([{ title: 'Example', content, url: '/example/' }], 'alpha beta');
  assert.ok(result.excerpt.includes('alpha beta'));
  assert.ok(result.excerpt.length <= 100);
  assert.equal(result.excerpt.slice(result.excerptHits[0].start, result.excerptHits[0].end), 'alpha beta');
  const [titleMatch] = await search(entries, 'newton');
  assert.equal(titleMatch.title.slice(titleMatch.titleHits[0].start, titleMatch.titleHits[0].end), 'Newton');
});

test('publishes all 30 canonical search URLs with rendered body text and classification metadata', () => {
  const output = new URL('../dist/search.xml', import.meta.url);
  assert.ok(existsSync(output), 'Missing original /search.xml endpoint');
  const xml = readFileSync(output, 'utf8');
  assert.equal((xml.match(/<entry>/g) ?? []).length, 30);
  const urls = Object.values(JSON.parse(readFileSync(new URL('./fixtures/post-urls.json', import.meta.url), 'utf8')));
  assert.deepEqual([...xml.matchAll(/<url>(.*?)<\/url>/g)].map(match => match[1]).sort(), urls.sort());
  assert.ok(xml.includes('공기저항'));
  assert.ok(xml.includes('Longest Common Subsequence'));
  assert.ok(xml.includes('<category>'));
  assert.ok(xml.includes('<tag>'));
  assert.ok(!xml.includes('{%'));
  assert.ok(!xml.includes('<pre'));
});
