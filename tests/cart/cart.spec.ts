import { expect, test } from '../../src/fixtures/baseTest';

test.describe('Cart flow', () => {
  test('adds one item to the cart and verifies it appears', async ({ page, cartPage }) => {
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.goto('/prod.html?idp_=1');
    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.waitForTimeout(1000);

    await cartPage.openCart();
    await cartPage.waitForCartReady();

    await expect(page.getByText('Samsung galaxy s6', { exact: false }).first()).toBeVisible();
  });

  test('adds multiple items and verifies cart rows are visible', async ({ page, cartPage }) => {
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.goto('/prod.html?idp_=1');
    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.waitForTimeout(1000);

    await page.goto('/prod.html?idp_=4');
    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.waitForTimeout(1000);

    await cartPage.openCart();
    await cartPage.waitForCartReady();

    await expect(page.getByText('Samsung galaxy s6', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Samsung galaxy s7', { exact: false }).first()).toBeVisible();
  });

  test('removes an item from the cart and updates the cart', async ({ page, cartPage }) => {
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.goto('/prod.html?idp_=1');
    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.waitForTimeout(1000);

    await cartPage.openCart();
    await cartPage.waitForCartReady();
    await cartPage.removeItemByIndex(0);
    await cartPage.waitForCartReady();

    await expect(page.getByText('Samsung galaxy s6', { exact: false }).first()).not.toBeVisible();
  });

  test('shows the total price for the current cart', async ({ page, cartPage }) => {
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.goto('/prod.html?idp_=1');
    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.waitForTimeout(1000);

    await cartPage.openCart();
    await cartPage.waitForCartReady();

    const totalText = await cartPage.getTotalPriceText();
    expect(totalText).not.toBe('');
  });
});
