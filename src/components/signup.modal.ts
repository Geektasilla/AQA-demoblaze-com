import { Locator, Page } from '@playwright/test';

export class SignUpModal {
  readonly page: Page;
  readonly root: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator('#signInModal');
    this.usernameInput = this.root.locator('#sign-username');
    this.passwordInput = this.root.locator('#sign-password');
    this.submitButton = this.root.getByRole('button', { name: 'Sign up' });
    this.closeButton = this.root.getByRole('button', { name: 'Close' });
  }

  async open() {
    await this.page.locator('#signin2').click();
    await this.root.waitFor({ state: 'visible' });
  }

  async fillForm(username: string, password: string) {
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async close() {
    await this.closeButton.click();
  }
}
