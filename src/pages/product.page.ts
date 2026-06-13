import { Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('.name');
    this.productPrice = page.locator('.price-container');
    this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
  }

  async openProduct(productId = '1') {
    await this.page.goto(`/prod.html?idp_=${productId}`);
  }

  async addCurrentProductToCart() {
    await this.addToCartButton.click();
  }
}
