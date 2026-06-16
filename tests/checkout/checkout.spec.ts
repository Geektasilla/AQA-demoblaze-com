import { expect, test } from '../../src/fixtures/baseTest';

test.describe('Checkout flow', () => {
  test('places an order successfully and confirms the purchase dialog', async ({ page, cartPage, orderModal }) => {
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Thank you for your purchase!');
      await dialog.accept();
    });

    await page.goto('/prod.html?idp_=1');
    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.waitForTimeout(1000);

    await cartPage.openCart();
    await cartPage.waitForCartReady();

    await cartPage.placeOrderButton.click();
    await orderModal.root.waitFor({ state: 'visible' });

    await orderModal.fillForm('Test User', 'Test Country', 'Test City', '4111111111111111', '12', '2027');
    await orderModal.submit();
  });

  test('closes the order form and handles an empty checkout submission', async ({ page, cartPage, orderModal }) => {
    page.once('dialog', async (dialog) => {
      expect(dialog.message().length).toBeGreaterThan(0);
      await dialog.accept();
    });

    await page.goto('/prod.html?idp_=1');
    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.waitForTimeout(1000);

    await cartPage.openCart();
    await cartPage.waitForCartReady();

    await cartPage.placeOrderButton.click();
    await orderModal.root.waitFor({ state: 'visible' });

    await orderModal.close();
    await expect(orderModal.root).not.toBeVisible();

    await cartPage.placeOrderButton.click();
    await orderModal.root.waitFor({ state: 'visible' });

    await orderModal.submit();

    await expect(orderModal.root).toBeVisible();
  });
});
