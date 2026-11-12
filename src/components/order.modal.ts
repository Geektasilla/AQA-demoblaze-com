import { Locator, Page } from '@playwright/test';

export class OrderModal {
  readonly page: Page;
  readonly root: Locator;
  readonly nameInput: Locator;
  readonly countryInput: Locator;
  readonly cityInput: Locator;
  readonly creditCardInput: Locator;
  readonly monthInput: Locator;
  readonly yearInput: Locator;
  readonly purchaseButton: Locator;
  readonly closeButton: Locator;
  readonly confirmation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator('#orderModal');
    this.nameInput = this.root.locator('#name');
    this.countryInput = this.root.locator('#country');
    this.cityInput = this.root.locator('#city');
    this.creditCardInput = this.root.locator('#card');
    this.monthInput = this.root.locator('#month');
    this.yearInput = this.root.locator('#year');
    this.purchaseButton = this.root.getByRole('button', { name: 'Purchase' });
    // The modal has two "Close" controls (header "×" and footer button); target the footer one.
    this.closeButton = this.root.locator('.modal-footer').getByRole('button', { name: 'Close' });
    this.confirmation = page.locator('.sweet-alert');
  }

  async open() {
    await this.page.getByRole('button', { name: 'Place Order' }).click();
    await this.root.waitFor({ state: 'visible' });
  }

  async fillForm(name: string, country: string, city: string, creditCard: string, month: string, year: string) {
    await this.nameInput.waitFor({ state: 'visible' });
    await this.nameInput.fill(name);
    await this.countryInput.fill(country);
    await this.cityInput.fill(city);
    await this.creditCardInput.fill(creditCard);
    await this.monthInput.fill(month);
    await this.yearInput.fill(year);
  }

  async submit() {
    await this.purchaseButton.click();
  }

  async close() {
    await this.closeButton.click();
  }
}
