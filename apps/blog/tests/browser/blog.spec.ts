import { expect, test } from '@playwright/test';

test('opens the blog, paginates and follows static classification links', async ({ page }) => {
  await page.goto('/');
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

test('renders local figures, mathcal, code and Korean content without client math scripts', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/blog/posts/hunt-szymanski/');
  await expect(page.locator('article h1').first()).toContainText('Hunt-Szymanski');
  await expect(page.locator('.prose pre')).toHaveCount(2);
  await expect(page.locator('.katex-error')).toHaveCount(0);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.prose .mathcal').first()).toBeVisible();
  expect(await page.locator('.prose img').evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  expect(await page.locator('script[src*="mathjax"]').count()).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('searches Korean and English, highlights text and restores keyboard focus', async ({ page }) => {
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

test('moves old post and hash-based classification addresses to the new URLs', async ({ page }) => {
  await page.goto('/secmem/2022/03/20/Hunt-Szymanski/#결론');
  await expect(page).toHaveURL(/\/blog\/posts\/hunt-szymanski\/#/);
  await page.goto('/tag/#/ICPC/page2');
  await expect(page).toHaveURL(/\/blog\/tags\/ICPC\/page\/2\/$/);
  await expect(page.locator('.post-previews article')).not.toHaveCount(0);
  await page.goto('/category/#/Linear%20Algebra');
  await expect(page).toHaveURL(/\/blog\/categories\/Linear%20Algebra\/$/);
});

test('provides a real 404 response and a visible return link', async ({ page }) => {
  const response = await page.goto('/missing-page/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('페이지를 찾을 수 없습니다.');
  await expect(page.getByRole('link', { name: '블로그로 돌아가기 →' })).toHaveAttribute('href', '/blog/');
});

test('keeps navigation, article math and old-address fallback usable without JavaScript', async ({ browser, baseURL }) => {
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
    await page.goto('/daily/2020/02/15/first-article/');
    await expect(page).toHaveURL(/\/blog\/posts\/first-article\/$/);
  } finally { await context.close(); }
});

test('publishes valid Atom and sitemap XML from the built artifact', async ({ page, request }) => {
  for (const path of ['/atom.xml', '/sitemap.xml']) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const xml = await response.text();
    const parsed = await page.evaluate(source => {
      const document = new DOMParser().parseFromString(source, 'application/xml');
      return { errors: document.querySelectorAll('parsererror').length, entries: document.querySelectorAll('entry').length, urls: [...document.querySelectorAll('loc')].map(element => element.textContent) };
    }, xml);
    expect(parsed.errors).toBe(0);
    if (path === '/atom.xml') expect(parsed.entries).toBe(10);
    else {
      expect(parsed.urls.length).toBeGreaterThan(60);
      expect(new Set(parsed.urls).size).toBe(parsed.urls.length);
      expect(parsed.urls).toContain('https://youngyojun.github.io/blog/posts/hunt-szymanski/');
      expect(parsed.urls.some(url => url?.includes('/secmem/'))).toBe(false);
    }
  }
});
