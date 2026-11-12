import { expect, test } from '../../src/fixtures/baseTest';
import { acceptNextDialog } from '../../src/utils/helpers';

const createUniqueUser = () => {
  const suffix = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
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
    await signupModal.fillForm(user.username, user.password);
    const firstMessage = await acceptNextDialog(page, () => signupModal.submit());
    expect(firstMessage).toContain('Sign up successful');
    await expect(signupModal.root).toBeHidden();
    // Bootstrap removes the backdrop only after the fade-out animation finishes.
    await expect(page.locator('.modal-backdrop')).toHaveCount(0);

    await navbar.openSignUpModal();
    await signupModal.fillForm(user.username, user.password);
    const secondMessage = await acceptNextDialog(page, () => signupModal.submit());

    expect(secondMessage.toLowerCase()).toContain('this user already exist');
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
