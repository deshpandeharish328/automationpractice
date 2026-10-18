import { expect, type Locator, type Page } from '@playwright/test';
import { StorePage } from './StorePage';

export class HomePage extends StorePage {
  readonly brandHeading: Locator;
  readonly tagline: Locator;
  readonly featuredProducts: Locator;

  constructor(page: Page) {
    super(page);
    this.brandHeading = page.getByRole('heading', {
      name: 'Sauce Demo',
      exact: true,
    }).first();
    this.tagline = page.getByRole('heading', {
      name: 'Just a demo site showing off what Sauce can do.',
      exact: true,
    });
    this.featuredProducts = page.locator('a[href*="/products/"]');
  }

  async expectLoaded() {
    await this.expectPageTitle(/^Sauce Demo$/);
    await expect(this.brandHeading).toBeVisible();
    await expect(this.tagline).toBeVisible();
  }

  productCard(name: string, price: string) {
    return this.page
      .getByRole('link')
      .filter({ has: this.page.getByRole('heading', { name, exact: true }) })
      .filter({ hasText: price });
  }
}
