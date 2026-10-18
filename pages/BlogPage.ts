import { expect, type Locator, type Page } from '@playwright/test';
import { StorePage } from './StorePage';

export class BlogPage extends StorePage {
  readonly firstPostHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.firstPostHeading = page.getByRole('heading', {
      name: 'First Post',
      exact: true,
    });
  }

  async expectLoaded() {
    await this.expectPageTitle(/^News – Sauce Demo$/);
    await expect(this.firstPostHeading).toBeVisible();
    await expect(this.page.getByText('Posted by Shopify', { exact: true })).toBeVisible();
  }
}
