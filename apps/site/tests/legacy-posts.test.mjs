import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import { relative, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Verified against the original Jekyll output, including date and case exceptions.
const urls = [
  "/daily/2020/02/15/first-article/",
  "/contest/review/2020/02/16/iamcoder-2019-yearend-contest/",
  "/study/physicslab/2021/03/15/physicslab12-main/",
  "/contest/review/icpc/2020/11/14/2020-icpc-seoul-regional/",
  "/icpc/practice/2021/02/02/WF-practice/",
  "/icpc/practice/2021/02/04/WF-practice/",
  "/icpc/practice/2021/02/09/WF-practice/",
  "/icpc/practice/2021/02/10/WF-practice/",
  "/icpc/practice/2021/02/12/WF-practice/",
  "/icpc/practice/2021/02/15/WF-practice/",
  "/icpc/practice/2021/03/06/WF-practice/",
  "/icpc/practice/2021/03/08/WF-practice/",
  "/study/physicslab/physicslab1/2021/03/15/physicslab1-newton/",
  "/study/physicslab/physicslab1/2021/03/17/physicslab1-torque/",
  "/secmem/2021/03/19/count-cutvertices-when-cut-each-edge/",
  "/study/physicslab/physicslab1/2021/03/21/physicslab1-sisyphus/",
  "/study/physicslab/physicslab1/2021/04/03/physicslab1-billiards/",
  "/study/physicslab/physicslab1/2021/04/12/physicslab1-gyroscope/",
  "/secmem/2021/04/19/generating-functions-1/",
  "/study/physicslab/physicslab1/2021/04/18/physicslab1-energy/",
  "/study/physicslab/physicslab1/2021/05/05/physicslab1-wave/",
  "/secmem/2021/05/18/generating-functions-2/",
  "/secmem/2021/07/18/tree-sequence-algorithm/",
  "/secmem/2021/09/19/young-tableaux/",
  "/secmem/2022/02/18/sigma-sum-stern-brocot/",
  "/secmem/2022/03/20/Hunt-Szymanski/",
  "/contest/review/icpc/2022/12/26/2021-icpc-seoul-regional/",
  "/linear%20algebra/2023/01/05/2022-2-linear-algebra-review/",
  "/icpc/2025/10/11/2025-icpc-seoul-prelim-solutions/",
  "/icpc/2025/11/22/2025-icpc-seoul-finals-solutions/"
];

test('publishes all 30 legacy URLs and links them from the preview index', () => {
  const index = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.equal(readdirSync(new URL('../../../_posts/', import.meta.url)).filter(name => name.endsWith('.md')).length, urls.length);
  for (const url of urls) {
    const output = new URL(`../dist/${decodeURIComponent(url.slice(1))}index.html`, import.meta.url);
    assert.ok(existsSync(output), `Missing legacy URL: ${url}`);
    const html = readFileSync(output, 'utf8');
    assert.ok(html.includes(`href="https://youngyojun.github.io${url}"`), `Canonical: ${url}`);
    assert.ok(/<article\b/.test(html) && /<h1\b/.test(html), `Article: ${url}`);
    assert.ok(index.includes(`href="${url}"`), `Index link: ${url}`);
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
