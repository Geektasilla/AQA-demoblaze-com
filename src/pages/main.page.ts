import { Locator, Page } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly contactLink: Locator;
  readonly aboutUsLink: Locator;
  readonly categoryPhonesLink: Locator;
  readonly categoryLaptopsLink: Locator;
  readonly categoryMonitorsLink: Locator;
  readonly carouselNextButton: Locator;
  readonly carouselPreviousButton: Locator;
  readonly carouselImage: Locator;
  readonly contactModal: Locator;
  readonly aboutUsSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.contactLink = page.getByRole('link', { name: 'Contact' });
    this.aboutUsLink = page.getByRole('link', { name: 'About us' });
    this.categoryPhonesLink = page.getByRole('link', { name: 'Phones' });
    this.categoryLaptopsLink = page.getByRole('link', { name: 'Laptops' });
    this.categoryMonitorsLink = page.getByRole('link', { name: 'Monitors' });
    this.carouselNextButton = page.getByRole('button', { name: 'Next' }).first();
    this.carouselPreviousButton = page.getByRole('button', { name: 'Previous' }).first();
    this.carouselImage = page.locator('.carousel-item.active img').first();
    this.contactModal = page.locator('#exampleModal');
    this.aboutUsSection = page.locator('#videoModalLabel');
  }

  async openHomePage() {
    await this.page.goto('/');
  }

  async openCategory(categoryName: 'Phones' | 'Laptops' | 'Monitors') {
    const categoryMap = {
      Phones: this.categoryPhonesLink,
      Laptops: this.categoryLaptopsLink,
      Monitors: this.categoryMonitorsLink,
    };

    await categoryMap[categoryName].click();
  }

  async clickCarouselNext() {
    await this.carouselNextButton.click();
  }

  async clickCarouselPrevious() {
    await this.carouselPreviousButton.click();
  }

  async openContactModal() {
    await this.contactLink.click();
    await this.contactModal.waitFor({ state: 'visible' });
  }

  async openAboutUsSection() {
    await this.aboutUsLink.click();
    await this.aboutUsSection.waitFor({ state: 'visible' });
  }

  async getActiveSlideAlt() {
    return this.carouselImage.getAttribute('alt');
  }
}
