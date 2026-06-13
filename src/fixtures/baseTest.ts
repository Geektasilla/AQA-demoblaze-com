import { test as base, expect as baseExpect } from '@playwright/test';

import { LoginModal } from '../components/login.modal';
import { NavbarComponent } from '../components/navbar.component';
import { SignUpModal } from '../components/signup.modal';
import { CartPage } from '../pages/cart.page';
import { ProductPage } from '../pages/product.page';

type AuthFixtures = {
  navbar: NavbarComponent;
  loginModal: LoginModal;
  signupModal: SignUpModal;
  cartPage: CartPage;
  productPage: ProductPage;
};

export const test = base.extend<AuthFixtures>({
  navbar: async ({ page }, use) => {
    await use(new NavbarComponent(page));
  },

  loginModal: async ({ page }, use) => {
    await use(new LoginModal(page));
  },

  signupModal: async ({ page }, use) => {
    await use(new SignUpModal(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
});

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
  });
});

test.afterEach(async ({ page }) => {
  await page.evaluate(() => {
    window.localStorage.clear();
  });
});

export const expect = baseExpect;
