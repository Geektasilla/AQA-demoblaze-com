import { Locator, Page } from '@playwright/test';

export class NavbarComponent {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly signUpLink: Locator;
  readonly logoutLink: Locator;
  readonly welcomeLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.locator('#login2');
    this.signUpLink = page.locator('#signin2');
    this.logoutLink = page.locator('#logout2');
    this.welcomeLabel = page.locator('#nameofuser');
  }

  async openLoginModal() {
    await this.loginLink.click();
    await this.page.locator('#logInModal').waitFor({ state: 'visible' });
  }

  async openSignUpModal() {
    await this.signUpLink.click();
    await this.page.locator('#signInModal').waitFor({ state: 'visible' });
  }

  async logout() {
    await this.logoutLink.click();
  }

  async isLoggedIn() {
    return await this.logoutLink.isVisible();
  }
}
