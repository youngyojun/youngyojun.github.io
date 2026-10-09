import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import { relative, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const postUrls = JSON.parse(readFileSync(new URL('./fixtures/post-urls.json', import.meta.url), 'utf8'));

// Captured from the live sitemap and page titles on 2026-10-09, independently of local timezone.
const posts = [
  ["/daily/2020/02/15/first-article/", "블로그 개설!"],
  ["/contest/review/2020/02/15/iamcoder-2019-yearend-contest/", "나는코더다 2019 송년대회 이야기"],
  ["/study/physicslab/2021/03/14/physicslab12-main/", "물리학실험1·2 보고서"],
  ["/contest/review/icpc/2020/11/14/2020-icpc-seoul-regional/", "2020 ICPC Seoul Regional 후기"],
  ["/icpc/practice/2021/02/02/WF-practice/", "ICPC WF 연습 (2/1)"],
  ["/icpc/practice/2021/02/04/WF-practice/", "ICPC WF 연습 (2/3)"],
  ["/icpc/practice/2021/02/08/WF-practice/", "ICPC WF 연습 (2/6)"],
  ["/icpc/practice/2021/02/09/WF-practice/", "ICPC WF 연습 (2/8)"],
  ["/icpc/practice/2021/02/12/WF-practice/", "ICPC WF 연습 (2/11)"],
  ["/icpc/practice/2021/02/15/WF-practice/", "ICPC WF 연습 (2/14)"],
  ["/icpc/practice/2021/03/05/WF-practice/", "ICPC WF 연습 (3/4)"],
  ["/icpc/practice/2021/03/08/WF-practice/", "ICPC WF 연습 (3/7)"],
  ["/study/physicslab/physicslab1/2021/03/14/physicslab1-newton/", "물리학실험1 뉴턴의 사과"],
  ["/study/physicslab/physicslab1/2021/03/16/physicslab1-torque/", "물리학실험1 관성 모멘트 측정"],
  ["/secmem/2021/03/19/count-cutvertices-when-cut-each-edge/", "그래프의 간선을 제거할 때 절점의 개수를 세는 효율적인 알고리즘"],
  ["/study/physicslab/physicslab1/2021/03/21/physicslab1-sisyphus/", "물리학실험1 시지프스의 고민"],
  ["/study/physicslab/physicslab1/2021/04/02/physicslab1-billiards/", "물리학실험1 당구의 역학"],
  ["/study/physicslab/physicslab1/2021/04/12/physicslab1-gyroscope/", "물리학실험1 자이로스코프"],
  ["/secmem/2021/04/18/generating-functions-1/", "다양한 생성함수와 그 응용 (1)"],
  ["/study/physicslab/physicslab1/2021/04/18/physicslab1-energy/", "물리학실험1 에너지의 모습"],
  ["/study/physicslab/physicslab1/2021/05/05/physicslab1-wave/", "물리학실험1 파동"],
  ["/secmem/2021/05/17/generating-functions-2/", "다양한 생성함수와 그 응용 (2)"],
  ["/secmem/2021/07/17/tree-sequence-algorithm/", "트리를 활용한 새로운 효율적인 수열 쿼리 알고리즘"],
  ["/secmem/2021/09/19/young-tableaux/", "영 타블로의 조합론적 의미와 알고리즘적 응용 (1)"],
  ["/secmem/2022/02/18/sigma-sum-stern-brocot/", "Stern-Brocot Tree를 활용한 수론적 함수의 합 계산"],
  ["/secmem/2022/03/20/Hunt-Szymanski/", "실무에서 빠르게 LCS를 계산하는 실용적인 Hunt-Szymanski 알고리즘에 관하여"],
  ["/contest/review/icpc/2022/12/25/2021-icpc-seoul-regional/", "2021 ICPC Seoul Regional 후기"],
  ["/linear%20algebra/2023/01/04/2022-2-linear-algebra-review/", "이승진 교수님의 선형 대수학 후기"],
  ["/icpc/2025/10/11/2025-icpc-seoul-prelim-solutions/", "2025 ICPC Asia Seoul Regional Preliminary Solution Sketches"],
  ["/icpc/2025/11/22/2025-icpc-seoul-finals-solutions/", "2025 ICPC Asia Seoul Regional Finals Solution Sketches"]
];

test('publishes all 30 canonical post URLs and links them from the home pages', () => {
  const index = ['index.html', 'page2/index.html', 'page3/index.html'].map(path => readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8')).join('\n');
  assert.equal(readdirSync(new URL('../../../_posts/', import.meta.url)).filter(name => name.endsWith('.md')).length, posts.length);
  for (const [legacyUrl, title] of posts) {
    const url = postUrls[legacyUrl];
    const output = new URL(`../dist/${decodeURIComponent(url.slice(1))}index.html`, import.meta.url);
    assert.ok(existsSync(output), `Missing canonical URL: ${url}`);
    const html = readFileSync(output, 'utf8');
    assert.equal(html.match(/<title>(.*?)<\/title>/s)?.[1], title, `Wrong post at ${url}`);
    assert.ok(html.includes(`href="https://youngyojun.github.io${url}"`), `Canonical: ${url}`);
    assert.ok(/<article\b/.test(html) && /<h1\b/.test(html), `Article: ${url}`);
    assert.ok(index.includes(`href="${url}"`), `Index link: ${url}`);
  }
});

test('keeps legacy article addresses readable with the new canonical URL while redirects are undecided', () => {
  for (const [legacyUrl, title] of posts) {
    const url = postUrls[legacyUrl];
    const legacy = readFileSync(new URL(`../dist/${decodeURIComponent(legacyUrl.slice(1))}index.html`, import.meta.url), 'utf8');
    const canonical = readFileSync(new URL(`../dist/${url.slice(1)}index.html`, import.meta.url), 'utf8');
    assert.equal(legacy.match(/<title>(.*?)<\/title>/s)?.[1], title, legacyUrl);
    assert.ok(legacy.includes(`href="https://youngyojun.github.io${url}"`), legacyUrl);
    assert.ok(!/http-equiv="refresh"/i.test(legacy), legacyUrl);
    assert.equal(legacy.match(/<article\b[^>]*>[\s\S]*?<\/article>/)?.[0], canonical.match(/<article\b[^>]*>[\s\S]*?<\/article>/)?.[0], legacyUrl);
  }
});

test('uses new post links inside articles while preserving heading fragments', () => {
  const overview = readFileSync(new URL('../dist/blog/posts/physicslab12-main/index.html', import.meta.url), 'utf8');
  assert.ok(overview.includes('href="/blog/posts/physicslab1-newton/"'));
  const review = readFileSync(new URL('../dist/blog/posts/2021-icpc-seoul-regional/index.html', import.meta.url), 'utf8');
  assert.ok(review.includes('href="/blog/posts/2020-icpc-seoul-regional/#icpc-seoul-%EC%9D%B8%ED%84%B0%EB%84%B7-%EC%98%88%EC%84%A0"'));
  for (const url of Object.keys(postUrls)) {
    assert.ok(!review.includes(`href="https://youngyojun.github.io${url}`), url);
    assert.ok(!overview.includes(`href="https://youngyojun.github.io${url}`), url);
  }
});

test('preserves all original post figures and downloadable attachments byte for byte', () => {
  for (const directory of ['assets/images/posts', 'downloadable_files']) {
    const source = new URL(`../../../${directory}/`, import.meta.url);
    for (const entry of readdirSync(source, { recursive: true, withFileTypes: true })) {
      if (!entry.isFile()) continue;
      const path = join(entry.parentPath, entry.name);
      const name = relative(fileURLToPath(source), path);
      const output = new URL(`../dist/${directory}/${name}`, import.meta.url);
      assert.ok(existsSync(output), `Missing asset: ${directory}/${name}`);
      assert.deepEqual(readFileSync(output), readFileSync(path), name);
    }
  }
});
