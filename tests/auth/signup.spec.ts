import { expect, test } from '../../src/fixtures/baseTest';

const createUniqueUser = () => {
  const suffix = Date.now();
  return {
    username: `qa_user_${suffix}`,
    password: 'Test123!'
  };
};

test.describe('Sign up flow', () => {
  test('rejects registering the same username twice', async ({ page, navbar, signupModal }) => {
    const user = createUniqueUser();

    await page.goto('/');

    await navbar.openSignUpModal();
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await signupModal.fillForm(user.username, user.password);
    await signupModal.submit();
    await expect(signupModal.root).toBeHidden();

    await navbar.openSignUpModal();
    await expect(signupModal.root).toBeVisible();

    const dialogPromise = new Promise<string>((resolve) => {
      page.once('dialog', async (dialog) => {
        resolve(dialog.message());
        await dialog.accept();
      });
    });
    await signupModal.fillForm(user.username, user.password);
    await signupModal.submit();

    const message = await dialogPromise;
    expect(message.toLowerCase()).toContain('this user already exist');
  });

  test('shows an alert when submitting with empty fields', async ({ page, navbar, signupModal }) => {
    await page.goto('/');

    await navbar.openSignUpModal();
    await expect(signupModal.root).toBeVisible();

    const dialogPromise = new Promise<string>((resolve) => {
      page.once('dialog', async (dialog) => {
        resolve(dialog.message());
        await dialog.accept();
      });
    });
    await signupModal.submit();

    const message = await dialogPromise;
    expect(message.toLowerCase()).toContain('please fill');
  });

  test('closes the sign up modal via the Close button', async ({ page, navbar, signupModal }) => {
    await page.goto('/');

    await navbar.openSignUpModal();
    await expect(signupModal.root).toBeVisible();

    await signupModal.close();
    await expect(signupModal.root).toBeHidden();
  });
});
