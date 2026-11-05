import { expect, test } from '@playwright/test';
import { existsSync } from 'node:fs';
import { renderMathText } from '../../apps/blog/lib/math.ts';

test('opens the blog, paginates and follows static classification links', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Gyojun Youn.');
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Blog' }).click();
  await expect(page).toHaveURL(/\/blog\/$/);
  await expect(page.locator('.post-previews article')).toHaveCount(10);
  await page.getByRole('link', { name: '2 페이지', exact: true }).click();
  await expect(page).toHaveURL(/\/blog\/page\/2\/$/);
  await expect(page.locator('.post-previews article')).toHaveCount(10);
  await page.goto('/blog/tags/학교/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('학교');
  await expect(page.locator('.post-previews article')).toHaveCount(1);
  await page.goto('/blog/categories/Linear%20Algebra/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Linear Algebra');
});

test('keeps the personal homepage navigable, responsive and linked to real articles', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Gyojun Youn');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://youngyojun.github.io/');
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page).toHaveURL(/\/#work$/);
  for (const link of await page.locator('main a[href^="/blog/"]').evaluateAll(links => [...new Set(links.map(link => link.getAttribute('href')!))])) {
    expect((await request.get(link)).status(), link).toBe(200);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('.work-card').first().click();
  await expect(page).toHaveURL(/\/blog\/posts\/hunt-szymanski\/$/);
  await page.getByRole('link', { name: '메인 홈', exact: true }).click();
  await expect(page).toHaveURL(/^https?:\/\/[^/]+\/$/);
  await page.getByRole('link', { name: 'Skip to content' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test('shows the same latest articles as the blog and uses the current year', async ({ page }) => {
  await page.goto('/blog/');
  const latest = await page.locator('.post-previews h2 a').evaluateAll(links => links.slice(0, 3).map(link => link.getAttribute('href')));
  await page.clock.setFixedTime(new Date('2031-06-10T12:00:00+09:00'));
  await page.goto('/');
  await expect(page.locator('.writing-list time')).toHaveCount(3);
  expect(await page.locator('.writing-list a').evaluateAll(links => links.map(link => link.getAttribute('href')))).toEqual(latest);
  await expect(page.locator('.home-footer')).toContainText('© 2031 Gyojun Youn');
  await expect(page.locator('.home-footer')).not.toContainText('함께 나눌 이야기가 있다면.');
});

test('keeps a blog link when recent articles cannot load and treats titles as text', async ({ page }) => {
  await page.route('**/blog/recent-posts.json', route => route.fulfill({ status: 503, body: 'unavailable' }));
  await page.goto('/');
  await expect(page.locator('#writing-status')).toContainText('Could not load recent posts');
  await expect(page.locator('.writing-list a')).toHaveAttribute('href', '/blog/');
  await page.unroute('**/blog/recent-posts.json');
  await page.route('**/blog/recent-posts.json', route => route.fulfill({ json: [{
    title: '<img src=x onerror=alert(1)>', description: '<script>literal</script>',
    date: '2030-12-31T15:00:00Z', url: '/blog/posts/new-article/',
  }] }));
  await page.reload();
  await expect(page.locator('.writing-list h3')).toHaveText('<img src=x onerror=alert(1)>');
  await expect(page.locator('.writing-list img, .writing-list script')).toHaveCount(0);
  await expect(page.locator('.writing-list time')).toHaveText('2031.01.01');
  await page.unroute('**/blog/recent-posts.json');
  await page.route('**/blog/recent-posts.json', route => route.fulfill({ json: [{
    title: 'Unsafe URL', description: '', date: '2031-01-01T00:00:00+09:00', url: '//example.com/',
  }] }));
  await page.reload();
  await expect(page.locator('#writing-status')).toContainText('Could not load recent posts');
  await expect(page.locator('.writing-list a')).toHaveAttribute('href', '/blog/');
  await page.unroute('**/blog/recent-posts.json');
  await page.route('**/blog/recent-posts.json', route => route.fulfill({ json: [] }));
  await page.reload();
  await expect(page.locator('#writing-status')).toHaveText('No posts yet.');
  await expect(page.locator('.writing-list time')).toHaveCount(0);
});

test('uses editorial homepage typography and self-hosted blog fonts', async ({ page, baseURL }) => {
  await page.goto('/');
  await expect(page.locator('body')).toHaveCSS('font-family', /^"?Helvetica Neue/);
  await expect(page.locator('h1')).toHaveCSS('font-family', /^Georgia/);
  await expect(page.locator('h2').first()).toHaveCSS('font-family', /^Georgia/);
  await expect(page.locator('.work-card h3').first()).toHaveCSS('font-family', /^Georgia/);
  const fonts: string[] = [];
  page.on('response', response => {
    if (/\/WantedSansVariable.*\.woff2$/.test(new URL(response.url()).pathname)) fonts.push(response.url());
  });
  await page.goto('/blog/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('body')).toHaveCSS('font-family', /^"?Wanted Sans Variable/);
  await expect(page.locator('h1').first()).toHaveCSS('font-family', /^"?Wanted Sans Variable/);
  await expect(page.locator('body')).toHaveCSS('font-size', '17px');
  await expect(page.locator('.site-nav')).toHaveCSS('font-size', '14px');
  await expect(page.locator('time').first()).toHaveCSS('font-size', '13px');
  expect(await page.evaluate(() => [...document.fonts].some(font => font.family.includes('Wanted Sans') && font.status === 'loaded'))).toBe(true);
  expect(fonts.length).toBeGreaterThan(0);
  expect(fonts.every(url => new URL(url).origin === new URL(baseURL!).origin)).toBe(true);
  await page.goto('/blog/posts/hunt-szymanski/');
  await expect(page.locator('.article-header h1')).toHaveCSS('font-size', page.viewportSize()!.width <= 600 ? '26px' : '30px');
  await expect(page.locator('.prose h1').first()).toHaveCSS('font-size', '24px');
  await expect(page.locator('.prose h2').first()).toHaveCSS('font-size', '22px');
});

test('renders local figures, mathcal, code and Korean content without client math scripts', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/blog/posts/hunt-szymanski/');
  await expect(page.locator('article h1').first()).toContainText('Hunt-Szymanski');
  await expect(page.locator('.prose pre')).toHaveCount(2);
  await expect(page.locator('.katex-error')).toHaveCount(0);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.prose .mathcal').first()).toBeVisible();
  await expect(page.locator('.prose .mathcal').first()).toHaveCSS('font-family', /KaTeX_Caligraphic/);
  // A renderer/CSS version mismatch can leave the text visible while breaking formula layout.
  await expect(page.locator('.prose .katex-html > span').first()).toHaveCSS('display', 'inline-block');
  expect(await page.locator('.prose img').evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  expect(await page.locator('script[src*="mathjax"]').count()).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('renders Hunt-Szymanski captions and matches math text size to each surrounding style', async ({ page }) => {
  await page.goto('/blog/posts/hunt-szymanski/');
  const caption = page.locator('.prose p[style]').filter({ hasText: /^두 문자열/ });
  await expect(caption.locator('.katex')).toHaveCount(4);
  await expect(caption).not.toContainText('$');
  await expect(page.locator('.prose h4').filter({ hasText: 'Lemma 3.' }).locator('.katex')).toHaveCount(1);

  const text = renderMathText(String.raw`Plain $\text{Plain}$`);
  await page.locator('main').evaluate((main, html) => {
    main.innerHTML = `<header class="article-header"><h1>${html}</h1></header>
      <section class="post-previews"><h2><a href="#">${html}</a></h2></section>
      <div class="prose">${[1, 2, 3, 4, 5, 6].map(level => `<h${level}>${html}</h${level}>`).join('')}
      <p>${html}</p><figure><figcaption>${html}</figcaption></figure>
      <p style="text-align: center;"><b>${html}</b></p>
      <table><tr><th>${html}</th><td>${html}</td></tr></table></div>`;
  }, text);
  await page.evaluate(() => document.fonts.ready);
  const sizes = await page.locator('main .katex').evaluateAll(formulas => formulas.map(formula => ({
    plain: getComputedStyle(formula.parentElement!).fontSize,
    math: getComputedStyle(formula).fontSize,
    text: getComputedStyle(formula.querySelector('.katex-html .text')!).fontSize,
  })));
  expect(sizes).toHaveLength(13);
  for (const size of sizes) {
    expect(size.math).toBe(size.plain);
    expect(size.text).toBe(size.plain);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('searches Korean and English, highlights text and restores focus after closing', async ({ page }) => {
  await page.goto('/blog/');
  const toggle = page.getByRole('button', { name: '검색', exact: true });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  const input = page.getByRole('searchbox');
  await expect(input).toBeFocused();
  await input.fill('선형 대수학');
  await expect(page.locator('#search-results a').first()).toContainText('선형 대수학');
  await input.fill('Hunt-Szymanski');
  await expect(page.locator('#search-results a').first()).toHaveAttribute('href', '/blog/posts/hunt-szymanski/');
  await expect(page.locator('#search-results mark').first()).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await expect(input).toHaveValue('');
  await page.getByRole('button', { name: '검색 닫기' }).click();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.mouse.click(5, 5);
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(toggle).toBeFocused();
});

test('retries a failed search request and rejects external result URLs', async ({ page }) => {
  let calls = 0;
  await page.route('**/blog/search.json', route => {
    calls++;
    if (calls === 1) return route.fulfill({ status: 503, body: 'unavailable' });
    if (calls === 2) return route.fulfill({ json: [{ title: 'bad', content: 'bad', url: '//example.com/' }] });
    return route.continue();
  });
  await page.goto('/blog/');
  for (let attempt = 0; attempt < 2; attempt++) {
    await page.getByRole('button', { name: '검색', exact: true }).click();
    await expect(page.getByRole('status')).toContainText('불러오지 못했습니다');
    await expect(page.locator('#search-results a')).toHaveCount(0);
    await page.getByRole('button', { name: '검색 닫기' }).click();
  }
  await page.getByRole('button', { name: '검색', exact: true }).click();
  await page.getByRole('searchbox').fill('Hunt-Szymanski');
  await expect(page.locator('#search-results a').first()).toHaveAttribute('href', '/blog/posts/hunt-szymanski/');
  expect(calls).toBe(3);
});

test('treats indexed HTML-looking strings as text', async ({ page }) => {
  await page.route('**/blog/search.json', route => route.fulfill({ json: [{
    title: '<img src=x onerror="window.searchXss=true">', content: 'img text', url: '/blog/posts/first-article/',
  }] }));
  await page.goto('/blog/');
  await page.getByRole('button', { name: '검색', exact: true }).click();
  await page.getByRole('searchbox').fill('img');
  await expect(page.locator('#search-results a')).toContainText('<img');
  await expect(page.locator('#search-results img')).toHaveCount(0);
  expect(await page.evaluate(() => 'searchXss' in window)).toBe(false);
});

test('returns 404 at former article and classification URLs', async ({ page }) => {
  for (const path of ['/secmem/2022/03/20/Hunt-Szymanski/', '/tag/#/ICPC/page2', '/category/#/Linear%20Algebra', '/tags/', '/categories/', '/archives/', '/about/', '/atom.xml', '/assets/images/posts/2022-03-20-Hunt-Szymanski/1.png', '/downloadable_files/physicslab1/newton_apple_report.pdf']) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('페이지를 찾을 수 없습니다.');
  }
});

test('provides a real 404 response and a visible return link', async ({ page }) => {
  const response = await page.goto('/missing-page/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('페이지를 찾을 수 없습니다.');
  await expect(page.getByRole('link', { name: '블로그로 돌아가기 →' })).toHaveAttribute('href', '/blog/');
});

test('keeps navigation, article math and the root entry usable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const page = await context.newPage();
    await page.goto('/blog/');
    await expect(page.getByRole('button', { name: '검색', exact: true })).not.toBeVisible();
    await page.getByRole('link', { name: '태그', exact: true }).click();
    await page.getByRole('link', { name: '학교', exact: false }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('학교');
    await page.goto('/blog/posts/hunt-szymanski/');
    await expect(page.locator('.mathcal').first()).toBeVisible();
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Gyojun Youn.');
    await page.getByRole('link', { name: 'Read the blog', exact: true }).click();
    await expect(page).toHaveURL(/\/blog\/$/);
  } finally { await context.close(); }
});

test('publishes valid blog XML and a site-wide sitemap index', async ({ page, request }) => {
  for (const path of ['/blog/atom.xml', '/blog/sitemap.xml', '/mahjong/sitemap.xml', '/sitemap.xml', '/site-sitemap.xml']) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const xml = await response.text();
    const parsed = await page.evaluate(source => {
      const document = new DOMParser().parseFromString(source, 'application/xml');
      return { errors: document.querySelectorAll('parsererror').length, entries: document.querySelectorAll('entry').length, urls: [...document.querySelectorAll('loc')].map(element => element.textContent) };
    }, xml);
    expect(parsed.errors).toBe(0);
    if (path === '/blog/atom.xml') expect(parsed.entries).toBe(10);
    else if (path === '/sitemap.xml') expect(parsed.urls).toEqual(['https://youngyojun.github.io/site-sitemap.xml', 'https://youngyojun.github.io/blog/sitemap.xml', 'https://youngyojun.github.io/mahjong/sitemap.xml']);
    else if (path === '/site-sitemap.xml') expect(parsed.urls).toEqual(['https://youngyojun.github.io/']);
    else if (path === '/mahjong/sitemap.xml') expect(parsed.urls).toEqual(['https://youngyojun.github.io/mahjong/', 'https://youngyojun.github.io/mahjong/seating/', 'https://youngyojun.github.io/mahjong/waits/']);
    else {
      expect(parsed.urls.length).toBeGreaterThan(60);
      expect(new Set(parsed.urls).size).toBe(parsed.urls.length);
      expect(parsed.urls).toContain('https://youngyojun.github.io/blog/posts/hunt-szymanski/');
      expect(parsed.urls.some(url => url?.includes('/secmem/'))).toBe(false);
      expect(parsed.urls.every(url => url?.startsWith('https://youngyojun.github.io/blog/'))).toBe(true);
    }
  }
});

test('serves real HTML for direct app navigation, reloads and browser history', async ({ page }) => {
  const routes = ['/blog/', '/blog/page/2/', '/blog/posts/hunt-szymanski/', '/blog/tags/학교/', '/blog/about/'];
  for (const path of routes) {
    expect(existsSync(new URL(`../../dist/${decodeURIComponent(path.slice(1))}index.html`, import.meta.url))).toBe(true);
    expect((await page.goto(path))?.status()).toBe(200);
    // Firefox exposes a successful conditional reload as 304.
    expect([200, 304]).toContain((await page.reload())?.status());
    await expect(page.locator('main')).toBeVisible();
    expect(new URL(page.url()).pathname).toBe(encodeURI(path));
  }
  await page.goto('/blog/');
  await page.getByRole('link', { name: '2 페이지', exact: true }).click();
  await page.goBack();
  await expect(page).toHaveURL(/\/blog\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/blog\/page\/2\/$/);
});

test('serves original figures and attachments inside the blog mount', async ({ request }) => {
  const figure = await request.get('/blog/images/hunt-szymanski/1.png');
  expect(figure.status()).toBe(200);
  expect(figure.headers()['content-type']).toContain('image/png');
  const attachment = await request.get('/blog/attachments/physicslab1/newton_apple_report.pdf');
  expect(attachment.status()).toBe(200);
  expect(attachment.headers()['content-type']).toContain('application/pdf');
  expect((await attachment.body()).subarray(0, 5).toString()).toBe('%PDF-');
});
