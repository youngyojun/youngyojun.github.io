import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('provides the site identity, home navigation and keyboard skip link on home and article pages', () => {
  for (const path of ['index.html', 'blog/posts/count-cutvertices-when-cut-each-edge/index.html']) {
    const html = readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
    assert.ok(/<a\b[^>]*href="#main"[^>]*>본문으로 건너뛰기<\/a>/.test(html), path);
    assert.ok(/<main\b[^>]*id="main"[^>]*tabindex="-1"/.test(html), path);
    assert.ok(html.replaceAll('&#39;', "'").includes("Gyojun Youn's PS Blog"), path);
    assert.ok(/<nav\b[^>]*aria-label="사이트"/.test(html), path);
    assert.ok(/<a\b[^>]*href="\/"[^>]*>홈<\/a>/.test(html), path);
  }
});
