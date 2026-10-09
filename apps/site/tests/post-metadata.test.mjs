import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

// Date, category and tag values observed in the published article HTML on 2026-10-09.
const posts = [
  ["/daily/2020/02/15/first-article/", "2020-02-15T00:00:00+00:00", ["Daily"], []],
  ["/contest/review/2020/02/15/iamcoder-2019-yearend-contest/", "2020-02-15T17:03:27+00:00", ["Contest", "Review"], ["대회", "풀이", "출제", "나는코더다"]],
  ["/study/physicslab/2021/03/14/physicslab12-main/", "2021-03-14T17:21:57+00:00", ["Study", "PhysicsLab"], ["물리학실험", "물리학실험1", "물리학실험2", "보고서"]],
  ["/contest/review/icpc/2020/11/14/2020-icpc-seoul-regional/", "2020-11-14T11:52:30+00:00", ["Contest", "Review", "ICPC"], ["대회", "풀이", "ICPC", "후기"]],
  ["/icpc/practice/2021/02/02/WF-practice/", "2021-02-02T01:17:40+00:00", ["ICPC", "Practice"], ["ICPC", "연습"]],
  ["/icpc/practice/2021/02/04/WF-practice/", "2021-02-04T01:20:27+00:00", ["ICPC", "Practice"], ["ICPC", "연습"]],
  ["/icpc/practice/2021/02/08/WF-practice/", "2021-02-08T20:27:12+00:00", ["ICPC", "Practice"], ["ICPC", "연습"]],
  ["/icpc/practice/2021/02/09/WF-practice/", "2021-02-09T21:11:24+00:00", ["ICPC", "Practice"], ["ICPC", "연습"]],
  ["/icpc/practice/2021/02/12/WF-practice/", "2021-02-12T00:00:00+00:00", ["ICPC", "Practice"], ["ICPC", "연습"]],
  ["/icpc/practice/2021/02/15/WF-practice/", "2021-02-15T00:00:00+00:00", ["ICPC", "Practice"], ["ICPC", "연습"]],
  ["/icpc/practice/2021/03/05/WF-practice/", "2021-03-05T15:19:21+00:00", ["ICPC", "Practice"], ["ICPC", "연습"]],
  ["/icpc/practice/2021/03/08/WF-practice/", "2021-03-08T14:54:35+00:00", ["ICPC", "Practice"], ["ICPC", "연습"]],
  ["/study/physicslab/physicslab1/2021/03/14/physicslab1-newton/", "2021-03-14T17:53:51+00:00", ["Study", "PhysicsLab", "PhysicsLab1"], ["물리학실험", "물리학실험1", "보고서"]],
  ["/study/physicslab/physicslab1/2021/03/16/physicslab1-torque/", "2021-03-16T18:09:43+00:00", ["Study", "PhysicsLab", "PhysicsLab1"], ["물리학실험", "물리학실험1", "보고서"]],
  ["/secmem/2021/03/19/count-cutvertices-when-cut-each-edge/", "2021-03-19T12:43:29+00:00", ["Secmem"], ["Graph", "Cut vertex", "Cut edge", "Algorithm"]],
  ["/study/physicslab/physicslab1/2021/03/21/physicslab1-sisyphus/", "2021-03-21T04:01:19+00:00", ["Study", "PhysicsLab", "PhysicsLab1"], ["물리학실험", "물리학실험1", "보고서"]],
  ["/study/physicslab/physicslab1/2021/04/02/physicslab1-billiards/", "2021-04-02T15:42:43+00:00", ["Study", "PhysicsLab", "PhysicsLab1"], ["물리학실험", "물리학실험1", "보고서"]],
  ["/study/physicslab/physicslab1/2021/04/12/physicslab1-gyroscope/", "2021-04-12T01:02:23+00:00", ["Study", "PhysicsLab", "PhysicsLab1"], ["물리학실험", "물리학실험1", "보고서"]],
  ["/secmem/2021/04/18/generating-functions-1/", "2021-04-18T19:05:30+00:00", ["Secmem"], ["Mathematics", "Algorithm"]],
  ["/study/physicslab/physicslab1/2021/04/18/physicslab1-energy/", "2021-04-18T02:08:37+00:00", ["Study", "PhysicsLab", "PhysicsLab1"], ["물리학실험", "물리학실험1", "보고서"]],
  ["/study/physicslab/physicslab1/2021/05/05/physicslab1-wave/", "2021-05-05T02:41:01+00:00", ["Study", "PhysicsLab", "PhysicsLab1"], ["물리학실험", "물리학실험1", "보고서"]],
  ["/secmem/2021/05/17/generating-functions-2/", "2021-05-17T15:21:11+00:00", ["Secmem"], ["Mathematics", "Algorithm"]],
  ["/secmem/2021/07/17/tree-sequence-algorithm/", "2021-07-17T23:10:04+00:00", ["Secmem"], ["Algorithm"]],
  ["/secmem/2021/09/19/young-tableaux/", "2021-09-19T13:43:07+00:00", ["Secmem"], ["Algorithm", "Mathematics"]],
  ["/secmem/2022/02/18/sigma-sum-stern-brocot/", "2022-02-18T09:27:10+00:00", ["Secmem"], ["Algorithm", "Mathematics"]],
  ["/secmem/2022/03/20/Hunt-Szymanski/", "2022-03-20T05:55:28+00:00", ["Secmem"], ["Algorithm"]],
  ["/contest/review/icpc/2022/12/25/2021-icpc-seoul-regional/", "2022-12-25T18:15:56+00:00", ["Contest", "Review", "ICPC"], ["대회", "풀이", "ICPC", "후기"]],
  ["/linear%20algebra/2023/01/04/2022-2-linear-algebra-review/", "2023-01-04T17:44:08+00:00", ["Linear Algebra"], ["학교", "선형 대수학", "후기"]],
  ["/icpc/2025/10/11/2025-icpc-seoul-prelim-solutions/", "2025-10-11T08:00:00+00:00", ["ICPC"], ["ICPC"]],
  ["/icpc/2025/11/22/2025-icpc-seoul-finals-solutions/", "2025-11-22T09:00:00+00:00", ["ICPC"], ["ICPC"]]
];

function output(url) {
  return readFileSync(new URL(`../dist/${decodeURIComponent(url.slice(1))}index.html`, import.meta.url), 'utf8');
}

test('preserves the published date, category and tag metadata of all legacy posts', () => {
  for (const [url, publishedAt, categories, tags] of posts) {
    const header = output(url).match(/<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1] ?? '';
    const time = header.match(/<time\b[^>]*datetime="([^"]+)"[^>]*>(.*?)<\/time>/s);
    assert.ok(time, `Missing publication date: ${url}`);
    assert.equal(new Date(time[1]).toISOString(), new Date(publishedAt).toISOString(), url);
    assert.equal(time[2].trim(), publishedAt.slice(0, 10), url);
    assert.equal(header.match(/<dt\b[^>]*>카테고리<\/dt>\s*<dd\b[^>]*>(.*?)<\/dd>/s)?.[1].trim(), categories.join(' / '), url);
    assert.equal(header.match(/<dt\b[^>]*>태그<\/dt>\s*<dd\b[^>]*>(.*?)<\/dd>/s)?.[1].trim(), tags.length ? tags.map(tag => `# ${tag}`).join(', ') : undefined, url);
  }
});

test('orders the index by publication time, including posts whose filenames have older dates', () => {
  const index = output('/');
  const links = [...index.matchAll(/<li\b[^>]*>[\s\S]*?<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]);
  const expected = posts.toSorted((a, b) => Date.parse(b[1]) - Date.parse(a[1])).map(post => post[0]);
  assert.deepEqual(links, expected);
});
