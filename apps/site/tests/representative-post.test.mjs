import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';

test('builds the original article URL with its title, code, math and local figures', () => {
  const output = new URL('../dist/secmem/2021/03/19/count-cutvertices-when-cut-each-edge/index.html', import.meta.url);
  assert.ok(existsSync(output), 'The original article URL must be generated');
  const html = readFileSync(output, 'utf8');
  assert.ok(html.includes('그래프의 간선을 제거할 때 절점의 개수를 세는 효율적인 알고리즘'));
  assert.ok(html.includes('https://youngyojun.github.io/secmem/2021/03/19/count-cutvertices-when-cut-each-edge/'));
  assert.equal((html.match(/<pre\b/g) ?? []).length, 3);
  assert.ok(html.includes(String.raw`\(G(V, E \setminus \{ e \})\)`));
  assert.ok(html.includes('MathJax.Hub.Config'));
  assert.equal((html.match(/<img\b/g) ?? []).length, 4);
  for (const name of ['cycle_theorem_not_use_e', 'back_edge_e_answer_v', 'tree_edge_e_answer_upper_vertex_u', 'tree_edge_e_answer_lower_vertex_t']) {
    const path = `assets/images/posts/2021-03-19-count-cutvertices-when-cut-each-edge/${name}.png`;
    assert.ok(html.includes(`src="/${path}"`));
    assert.deepEqual(readFileSync(new URL(`../dist/${path}`, import.meta.url)), readFileSync(new URL(`../../../${path}`, import.meta.url)));
  }
});
