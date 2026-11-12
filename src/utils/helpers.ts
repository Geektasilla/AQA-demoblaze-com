import { Page } from '@playwright/test';

/**
 * Accepts the next native dialog triggered by `action` and returns its message.
 * The dialog is accepted as soon as it opens: an alert raised synchronously inside a click
 * handler blocks that click from completing until the dialog is closed.
 */
export async function acceptNextDialog(page: Page, action: () => Promise<void>): Promise<string> {
  const dialogPromise = page.waitForEvent('dialog', { timeout: 15_000 }).then(async (dialog) => {
    const message = dialog.message();
    await dialog.accept();
    return message;
  });
  const [message] = await Promise.all([dialogPromise, action()]);
  return message;
}

/**
 * Opens a product page and adds the product to the cart.
 * Demoblaze shows the "Product added" alert only after the API call succeeds,
 * so waiting for the alert replaces fixed sleeps.
 */
export async function addProductToCart(page: Page, productId: string): Promise<void> {
  await page.goto(`/prod.html?idp_=${productId}`);
  const addButton = page.getByRole('link', { name: 'Add to cart' });
  await addButton.waitFor({ state: 'visible' });
  const message = await acceptNextDialog(page, () => addButton.click());
  if (!message.toLowerCase().includes('product added')) {
    throw new Error(`Unexpected dialog after "Add to cart": ${message}`);
  }
}
