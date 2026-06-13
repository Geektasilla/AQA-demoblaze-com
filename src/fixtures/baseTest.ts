import { test as base, expect as baseExpect } from '@playwright/test';

import { LoginModal } from '../components/login.modal';
import { NavbarComponent } from '../components/navbar.component';
import { SignUpModal } from '../components/signup.modal';

type AuthFixtures = {
  navbar: NavbarComponent;
  loginModal: LoginModal;
  signupModal: SignUpModal;
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
});

export const expect = baseExpect;
