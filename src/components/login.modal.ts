import { Locator, Page } from '@playwright/test';

export class LoginModal {
  readonly page: Page;
  readonly root: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator('#logInModal');
    this.usernameInput = this.root.locator('#loginusername');
    this.passwordInput = this.root.locator('#loginpassword');
    this.submitButton = this.root.getByRole('button', { name: 'Log in' });
    this.closeButton = this.root.getByRole('button', { name: 'Close' });
  }

  async open() {
    await this.page.locator('#login2').click();
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
