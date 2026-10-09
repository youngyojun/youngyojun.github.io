import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const postUrls = JSON.parse(readFileSync(new URL('./fixtures/post-urls.json', import.meta.url), 'utf8'));

// IDs and UTC publication times from the original Jekyll Atom feed.
const entries = [
  ['/icpc/2025/11/22/2025-icpc-seoul-finals-solutions/', '2025-11-22T09:00:00Z', ['ICPC']],
  ['/icpc/2025/10/11/2025-icpc-seoul-prelim-solutions/', '2025-10-11T08:00:00Z', ['ICPC']],
  ['/linear%20algebra/2023/01/04/2022-2-linear-algebra-review/', '2023-01-04T17:44:08Z', ['학교', '선형 대수학', '후기']],
  ['/contest/review/icpc/2022/12/25/2021-icpc-seoul-regional/', '2022-12-25T18:15:56Z', ['대회', '풀이', 'ICPC', '후기']],
  ['/secmem/2022/03/20/Hunt-Szymanski/', '2022-03-20T05:55:28Z', ['Algorithm']],
  ['/secmem/2022/02/18/sigma-sum-stern-brocot/', '2022-02-18T09:27:10Z', ['Algorithm', 'Mathematics']],
  ['/secmem/2021/09/19/young-tableaux/', '2021-09-19T13:43:07Z', ['Algorithm', 'Mathematics']],
  ['/secmem/2021/07/17/tree-sequence-algorithm/', '2021-07-17T23:10:04Z', ['Algorithm']],
  ['/secmem/2021/05/17/generating-functions-2/', '2021-05-17T15:21:11Z', ['Mathematics', 'Algorithm']],
  ['/study/physicslab/physicslab1/2021/05/05/physicslab1-wave/', '2021-05-05T02:41:01Z', ['물리학실험', '물리학실험1', '보고서']],
];

function feed() {
  const file = new URL('../dist/atom.xml', import.meta.url);
  assert.ok(existsSync(file), 'The original /atom.xml subscription URL must exist');
  return readFileSync(file, 'utf8');
}

function unescape(value) {
  return value.replace(/&(lt|gt|quot|apos|amp);/g, (_, name) => ({ lt: '<', gt: '>', quot: '"', apos: "'", amp: '&' })[name]);
}

test('keeps the original Atom subscription identity and latest 10 entry IDs, dates and tags', () => {
  const xml = feed();
  const metadata = xml.split('<entry>')[0];
  assert.ok(metadata.includes('<feed xmlns="http://www.w3.org/2005/Atom">'));
  assert.ok(metadata.includes('<id>https://youngyojun.github.io/atom.xml</id>'));
  assert.ok(metadata.includes('href="https://youngyojun.github.io/atom.xml" rel="self" type="application/atom+xml"'));
  assert.ok(metadata.includes('<title type="html">Gyojun Youn’s PS Blog</title>'));
  assert.ok(metadata.includes('<name>Gyojun Youn</name>'));
  assert.ok(Number.isFinite(Date.parse(metadata.match(/<updated>([^<]+)<\/updated>/)?.[1])));
  const actual = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(match => match[1]);
  assert.equal(actual.length, entries.length);
  for (const [index, [path, date, tags]] of entries.entries()) {
    const entry = actual[index];
    assert.equal(entry.match(/<id>([^<]+)<\/id>/)?.[1], `https://youngyojun.github.io${path.slice(0, -1)}`);
    assert.ok(entry.includes(`href="https://youngyojun.github.io${postUrls[path]}" rel="alternate"`));
    for (const field of ['published', 'updated']) {
      assert.equal(Date.parse(entry.match(new RegExp(`<${field}>([^<]+)</${field}>`))?.[1]), Date.parse(date));
    }
    assert.deepEqual([...entry.matchAll(/<category term="([^"]+)"\s*\/>/g)].map(match => unescape(match[1])), tags);
  }
});

test('includes full rendered article HTML with a URL base and the original excerpt boundaries', () => {
  const actual = [...feed().matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(match => match[1]);
  for (const [index, [path]] of entries.entries()) {
    const entry = actual[index];
    const content = entry.match(/<content type="html" xml:base="([^"]+)">([\s\S]*?)<\/content>/);
    assert.equal(content?.[1], `https://youngyojun.github.io${postUrls[path]}`);
    assert.ok(content[2].includes('&lt;'), 'HTML must be escaped inside XML');
    const article = readFileSync(new URL(`../dist/${postUrls[path].slice(1)}index.html`, import.meta.url), 'utf8');
    const body = article.match(/<div class="post-body">([\s\S]*?)<\/div>\s*<\/article>/)?.[1];
    assert.ok(body, path);
    assert.equal(unescape(content[2]).trim(), body.trim(), `Full article: ${path}`);
    assert.ok(entry.includes('<summary type="html">'), path);
  }
  assert.ok(unescape(actual[0]).includes('Disclaimer: This is an unofficial analysis'));
  assert.ok(actual[4].includes('<summary type="html">개요</summary>'));
  assert.ok(actual[9].includes('<summary type="html">Prelab</summary>'));
  // CRLF source had no literal LF-LF separator, so Jekyll included the whole excerpt.
  const longExcerpt = unescape(actual[6].match(/<summary type="html">([\s\S]*?)<\/summary>/)?.[1] ?? '');
  assert.ok(longExcerpt.startsWith('개요 영 타블로'));
  assert.ok(longExcerpt.endsWith('이를 통하여 순열의 LIS 등에 관한 새로운 접근 방법을 소개한다.'));
});
