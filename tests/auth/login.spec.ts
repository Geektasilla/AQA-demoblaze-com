import { expect, test } from '../../src/fixtures/baseTest';

const createUniqueUser = () => {
  const suffix = Date.now();
  return {
    username: `qa_user_${suffix}`,
    password: 'Test123!'
  };
};

test.describe('Authentication flow', () => {
  test('signs up a new user and opens the login modal', async ({ page, navbar, signupModal }) => {
    const user = createUniqueUser();

    await page.goto('/');

    await navbar.openSignUpModal();
    await expect(signupModal.root).toBeVisible();

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Sign up successful');
      await dialog.accept();
    });

    await signupModal.fillForm(user.username, user.password);
    await signupModal.submit();

    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
  });

  test('logs in with the registered user and logs out', async ({ page, navbar, loginModal, signupModal }) => {
    const user = createUniqueUser();

    await page.goto('/');

    await navbar.openSignUpModal();
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await signupModal.fillForm(user.username, user.password);
    await signupModal.submit();

    await navbar.openLoginModal();
    await expect(loginModal.root).toBeVisible();

    await loginModal.fillForm(user.username, user.password);
    await loginModal.submit();

    await expect(navbar.logoutLink).toBeVisible();

    await navbar.logout();
    await expect(navbar.loginLink).toBeVisible();
  });
});
