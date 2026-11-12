import { randomUUID } from 'node:crypto';

import { test as base, expect as baseExpect } from '@playwright/test';

import { LoginModal } from '../components/login.modal';
import { NavbarComponent } from '../components/navbar.component';
import { OrderModal } from '../components/order.modal';
import { SignUpModal } from '../components/signup.modal';
import { CartPage } from '../pages/cart.page';
import { ProductPage } from '../pages/product.page';

type AuthFixtures = {
  navbar: NavbarComponent;
  loginModal: LoginModal;
  signupModal: SignUpModal;
  orderModal: OrderModal;
  cartPage: CartPage;
  productPage: ProductPage;
};

export const test = base.extend<AuthFixtures>({
  // Demoblaze identifies guests by the "user" cookie, which it sets only on the home page.
  // Without it every anonymous client shares one cart, so each test gets its own guest id.
  // Overriding `page` (instead of a module-level beforeEach) guarantees it runs for every spec file.
  page: async ({ page }, use) => {
    await page.context().addCookies([
      { name: 'user', value: randomUUID(), domain: 'www.demoblaze.com', path: '/' },
    ]);
    await use(page);
  },

  navbar: async ({ page }, use) => {
    await use(new NavbarComponent(page));
  },

  loginModal: async ({ page }, use) => {
    await use(new LoginModal(page));
  },

  signupModal: async ({ page }, use) => {
    await use(new SignUpModal(page));
  },

  orderModal: async ({ page }, use) => {
    await use(new OrderModal(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
});

export const expect = baseExpect;
