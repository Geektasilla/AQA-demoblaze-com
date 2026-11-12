import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTable: Locator;
  readonly cartRows: Locator;
  readonly totalLabel: Locator;
  readonly totalPrice: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTable = page.locator('table');
    this.cartRows = page.locator('#tbodyid tr');
    this.totalLabel = page.locator('h2:has-text("Total")');
    this.totalPrice = page.locator('#totalp');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
  }

  async openCart() {
    await this.page.goto('/cart.html');
    await this.cartTable.waitFor({ state: 'visible' });
  }

  /** Waits until the cart table is rendered with the expected number of rows. */
  async waitForItemCount(count: number) {
    await expect(this.cartRows).toHaveCount(count, { timeout: 15_000 });
  }

  async getCartItemCount() {
    return this.cartRows.count();
  }

  async getRowText(index: number) {
    return this.cartRows.nth(index).textContent();
  }

  async removeItemByIndex(index: number) {
    await this.cartRows.nth(index).getByRole('link', { name: 'Delete' }).click();
  }

  async getTotalPriceText() {
    await expect(this.totalPrice).not.toBeEmpty({ timeout: 15_000 });
    return this.totalPrice.textContent();
  }
}
