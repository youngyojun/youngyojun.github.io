import { expect, test } from '@playwright/test';

test('draws four winds and keeps East seated when two minimal swaps are possible', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Mahjong tools' }).click();
  await expect(page).toHaveURL(/\/mahjong\/$/);
  await page.getByRole('link', { name: /자리 뽑기/ }).click();
  await expect(page).toHaveURL(/\/mahjong\/seating\/$/);
  await expect(page.locator('astro-island')).not.toHaveAttribute('ssr', '');
  await page.evaluate(() => { Math.random = () => 0; });
  const draw = page.getByRole('button', { name: '자리 뽑기', exact: true });
  await draw.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toContainText('2명만 서로 바꾸세요.');
  await expect(page.getByRole('status')).toBeInViewport();
  const current = page.getByRole('group', { name: '추첨 결과' });
  const target = page.getByRole('group', { name: '이렇게 앉으세요' });
  await expect(current.locator('[data-position="0"]')).toHaveAttribute('data-wind', 'south');
  await expect(current.locator('[data-position="3"]')).toHaveAttribute('data-wind', 'east');
  await expect(target.locator('[data-position="3"]')).toHaveAttribute('data-wind', 'east');
  await expect(target.locator('[data-position="1"]')).toHaveAttribute('data-wind', 'west');
  await expect(page.getByRole('status').locator('li')).toHaveCount(2);
  await expect.poll(() => page.locator('.mahjong-tile').evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  await expect(current.locator('.mahjong-tile').first()).toHaveCSS('background-image', /Front.*\.svg/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: '다시 뽑기' }).click();
  await expect(current.locator('[data-wind]')).toHaveCount(4);
});

test('keeps a valid rotated arrangement in place without fixing East', async ({ page }) => {
  await page.goto('/mahjong/seating/');
  await expect(page.locator('astro-island')).not.toHaveAttribute('ssr', '');
  await page.evaluate(() => {
    const values = [.1, .5, .9];
    Math.random = () => values.shift() ?? .5;
  });
  await page.getByRole('button', { name: '자리 뽑기', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('그대로 앉으면 됩니다.');
  const current = await page.getByRole('group', { name: '추첨 결과' }).locator('[data-wind]').evaluateAll(seats => seats.map(seat => seat.getAttribute('data-wind')));
  const target = await page.getByRole('group', { name: '이렇게 앉으세요' }).locator('[data-wind]').evaluateAll(seats => seats.map(seat => seat.getAttribute('data-wind')));
  expect(target).toEqual(current);
  expect(target[0]).not.toBe('east');
  await page.reload();
  await expect(page.getByRole('button', { name: '자리 뽑기', exact: true })).toBeVisible();
});
