import { expect, test, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';

async function seedQuiz(page: Page, seed = 2026) {
  await page.addInitScript(seed => {
    Object.defineProperty(window.crypto, 'getRandomValues', { value: (array: Uint32Array) => { array.fill(seed); return array; } });
  }, seed);
}

for (const { seed, suffix, waits, fives } of [
  { seed: 5, suffix: '통', waits: [7, 9], fives: 4 },
  { seed: 8, suffix: '만', waits: [6, 8], fives: 4 },
  { seed: 53, suffix: '삭', waits: [2, 6], fives: 4 },
  { seed: 12, suffix: '통', waits: [3, 5, 8], fives: 3 },
  { seed: 39, suffix: '만', waits: [3, 5, 6, 7], fives: 3 },
  { seed: 18, suffix: '삭', waits: [2, 5, 8], fives: 3 },
]) {
  test(`shows one red five among four 5${suffix} tiles (seed ${seed})`, async ({ page }) => {
    await seedQuiz(page, seed);
    await page.goto('/mahjong/waits/');
    const hand = page.getByRole('group', { name: '문제 손패 13장' });
    await expect(hand.getByRole('img')).toHaveCount(13);
    await expect(hand.getByRole('img', { name: `5${suffix}`, exact: true })).toHaveCount(3);
    await expect(hand.getByRole('img', { name: `적5${suffix}`, exact: true })).toHaveCount(fives === 4 ? 1 : 0);
    for (const rank of waits) await page.getByRole('button', { name: `${rank}${suffix}`, exact: true }).click();
    await page.getByRole('button', { name: '정답 확인' }).click();
    await expect(page.getByRole('status')).toContainText('전부 찾았습니다!');
    await page.getByRole('button', { name: `${fives === 3 ? 5 : waits[0]}${suffix}으로 완성 보기` }).click();
    const complete = page.getByRole('group', { name: '완성된 손패' });
    await expect(complete.getByRole('img', { name: `5${suffix}`, exact: true })).toHaveCount(3);
    const red = complete.getByRole('img', { name: `적5${suffix}`, exact: true });
    await expect(red).toHaveCount(1);
    await expect(red).toHaveAttribute('src', /5-Dora.*\.svg/);
    await expect.poll(() => red.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  });
}

test('plays a Rust-generated quiz, rewards exact answers and starts another question', async ({ page }) => {
  await seedQuiz(page, 2);
  await page.goto('/mahjong/');
  await page.getByRole('link', { name: /대기패 헌터/ }).click();
  await expect(page.getByRole('group', { name: '문제 손패 13장' }).getByRole('img')).toHaveCount(13);
  await expect(page.getByRole('button', { name: '정답 확인' })).toBeDisabled();
  for (const rank of [6, 9]) await page.getByRole('button', { name: `${rank}만`, exact: true }).click();
  await page.getByRole('button', { name: '정답 확인' }).click();
  await expect(page.getByRole('status')).toContainText('전부 찾았습니다!');
  await expect(page.getByLabel('이번 도전 기록')).toContainText('연속 성공 1');
  await expect(page.getByRole('group', { name: '완성된 손패' }).getByRole('img')).toHaveCount(14);
  await page.getByRole('button', { name: '6만으로 완성 보기' }).click();
  await expect(page.getByRole('button', { name: /다른 분해 보기/ })).toBeVisible();
  await page.getByRole('button', { name: /다른 분해 보기/ }).click();
  await expect(page.getByRole('button', { name: /다른 분해 보기/ })).toContainText('2/3');
  await page.getByRole('button', { name: '다음 문제' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: '1만', exact: true })).toBeFocused();
  await expect(page.getByRole('button', { name: '정답 확인' })).toBeDisabled();
  await expect(page.getByRole('button', { name: '6만', exact: true })).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByLabel('이번 도전 기록')).toContainText('연속 성공 1');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('explains missed and incorrect waits and supports keyboard selection', async ({ page }) => {
  await seedQuiz(page);
  await page.goto('/mahjong/waits/');
  const tile = page.getByRole('button', { name: '1삭', exact: true });
  await tile.focus(); await page.keyboard.press('Space');
  await expect(tile).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: '정답 확인' }).click();
  await expect(page.getByRole('status')).toContainText('놓친 대기패 5개 · 잘못 고른 패 1개');
  await expect(tile).toContainText('오답');
  await expect(page.getByRole('button', { name: '2삭', exact: true })).toContainText('놓침');
  await expect(page.getByRole('group', { name: '완성된 손패' }).getByRole('img')).toHaveCount(14);
  await expect.poll(() => page.locator('.mahjong-tile').evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
});

test('recovers when the WASM download initially fails', async ({ page }) => {
  await seedQuiz(page);
  await page.route('**/*.wasm', route => route.abort());
  await page.goto('/mahjong/waits/');
  await expect(page.getByRole('alert')).toContainText('문제를 준비하지 못했어요.');
  await page.unroute('**/*.wasm');
  await page.getByRole('button', { name: '다시 시도' }).click();
  await expect(page.getByRole('group', { name: '문제 손패 13장' }).getByRole('img')).toHaveCount(13);
});

test('loads WASM when a server provides a generic content type', async ({ page }) => {
  await seedQuiz(page);
  await page.route('**/*.wasm', route => route.fulfill({ body: readFileSync(new URL('../../apps/mahjong/generated/mahjong_quiz_bg.wasm', import.meta.url)), contentType: 'application/octet-stream' }));
  await page.goto('/mahjong/waits/');
  await expect(page.getByRole('group', { name: '문제 손패 13장' }).getByRole('img')).toHaveCount(13);
});
