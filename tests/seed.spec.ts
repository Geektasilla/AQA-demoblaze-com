import { test, expect } from '@playwright/test';

test.describe('Demoblaze smoke tests', () => {
  test('home page loads and shows STORE in the title', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    await expect(page).toHaveTitle(/STORE/i);
  });
});
