import { expect, test } from '../src/fixtures/baseTest';
import { MainPage } from '../src/pages/main.page';

test.describe('Navigation flow', () => {
  test('loads the home page and validates the STORE title', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.openHomePage();

    await expect(page).toHaveTitle(/STORE/i);
    await expect(mainPage.homeLink).toBeVisible();
    await expect(mainPage.contactLink).toBeVisible();
    await expect(mainPage.aboutUsLink).toBeVisible();
  });

  test('switches between main product categories', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.openHomePage();

    for (const category of ['Phones', 'Laptops', 'Monitors'] as const) {
      await mainPage.openCategory(category);

      const productCards = page.locator('.card');
      await expect(productCards.first()).toBeVisible();
      expect(await productCards.count()).toBeGreaterThan(0);
    }
  });

  test('uses the carousel controls', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.openHomePage();

    await expect(mainPage.carouselImage).toHaveAttribute('alt', 'First slide');

    await mainPage.clickCarouselNext();
    await expect(mainPage.carouselImage).toHaveAttribute('alt', 'Second slide');

    await mainPage.clickCarouselPrevious();
    await expect(mainPage.carouselImage).toHaveAttribute('alt', 'First slide');
  });

  test('opens the contact and about us information area', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.openHomePage();

    await mainPage.openContactModal();
    await expect(page.locator('#exampleModal')).toBeVisible();

    await page.locator('#exampleModal button.btn-secondary').click();

    await mainPage.openAboutUsSection();
    await expect(mainPage.aboutUsSection).toBeVisible();
  });
});
