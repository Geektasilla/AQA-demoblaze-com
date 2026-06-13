import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTable: Locator;
  readonly cartRows: Locator;
  readonly totalLabel: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTable = page.locator('table');
    this.cartRows = page.locator('table tbody tr');
    this.totalLabel = page.locator('h2:has-text("Total")');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
  }

  async waitForCartReady() {
    await Promise.race([
      this.page.waitForLoadState('networkidle', { timeout: 3000 }),
      this.page.waitForLoadState('domcontentloaded', { timeout: 3000 }),
    ]);

    await this.page.waitForTimeout(1500);
  }

  async openCart() {
    await this.page.goto('/cart.html');
    await this.waitForCartReady();
  }

  async getCartItemCount() {
    await this.waitForCartReady();
    return this.cartRows.count();
  }

  async getRowText(index: number) {
    await this.waitForCartReady();
    return this.cartRows.nth(index).textContent();
  }

  async removeItemByIndex(index: number) {
    await this.waitForCartReady();
    await this.cartRows
      .nth(index)
      .locator('a:has-text("Delete"), button:has-text("Delete")')
      .first()
      .click();
  }

  async getTotalPriceText() {
    await this.waitForCartReady();
    return this.page.locator('h2:has-text("Total")').locator('xpath=following::h3[1]').textContent();
  }
}
