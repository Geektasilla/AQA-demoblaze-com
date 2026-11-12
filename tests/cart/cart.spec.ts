import { expect, test } from '../../src/fixtures/baseTest';
import { addProductToCart } from '../../src/utils/helpers';

test.describe('Cart flow', () => {
  test('adds one item to the cart and verifies it appears', async ({ page, cartPage }) => {
    await addProductToCart(page, '1');

    await cartPage.openCart();
    await cartPage.waitForItemCount(1);

    await expect(cartPage.cartRows.first()).toContainText('Samsung galaxy s6');
  });

  test('adds multiple items and verifies cart rows are visible', async ({ page, cartPage }) => {
    await addProductToCart(page, '1');
    await addProductToCart(page, '4');

    await cartPage.openCart();
    await cartPage.waitForItemCount(2);

    await expect(cartPage.cartTable).toContainText('Samsung galaxy s6');
    await expect(cartPage.cartTable).toContainText('Samsung galaxy s7');
  });

  test('removes an item from the cart and updates the cart', async ({ page, cartPage }) => {
    await addProductToCart(page, '1');

    await cartPage.openCart();
    await cartPage.waitForItemCount(1);

    await cartPage.removeItemByIndex(0);

    await cartPage.waitForItemCount(0);
    await expect(cartPage.cartTable).not.toContainText('Samsung galaxy s6');
  });

  test('shows the total price for the current cart', async ({ page, cartPage }) => {
    await addProductToCart(page, '1');

    await cartPage.openCart();
    await cartPage.waitForItemCount(1);

    const totalText = await cartPage.getTotalPriceText();
    expect(Number(totalText)).toBeGreaterThan(0);
  });
});
