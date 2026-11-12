import { expect, test } from '../../src/fixtures/baseTest';
import { acceptNextDialog, addProductToCart } from '../../src/utils/helpers';

test.describe('Checkout flow', () => {
  test.beforeEach(async ({ page, cartPage }) => {
    await addProductToCart(page, '1');
    await cartPage.openCart();
    await cartPage.waitForItemCount(1);
  });

  test('places an order successfully and confirms the purchase dialog', async ({ orderModal }) => {
    await orderModal.open();

    await orderModal.fillForm('Test User', 'Test Country', 'Test City', '4111111111111111', '12', '2027');
    await orderModal.submit();

    // The purchase confirmation is a SweetAlert popup, not a native dialog.
    await expect(orderModal.confirmation).toBeVisible();
    await expect(orderModal.confirmation.locator('h2')).toHaveText('Thank you for your purchase!');
    await expect(orderModal.confirmation).toContainText('Card Number: 4111111111111111');
    await expect(orderModal.confirmation).toContainText('Name: Test User');
  });

  test('closes the order form and handles an empty checkout submission', async ({ page, orderModal }) => {
    await orderModal.open();

    await orderModal.close();
    await expect(orderModal.root).toBeHidden();

    await orderModal.open();

    const message = await acceptNextDialog(page, () => orderModal.submit());
    expect(message).toContain('Please fill out Name and Creditcard.');

    await expect(orderModal.root).toBeVisible();
  });
});
