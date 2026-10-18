import { expect, type Locator, type Page } from '@playwright/test';
import { StorePage } from './StorePage';

export class AboutUsPage extends StorePage {
  readonly pageHeading: Locator;
  readonly description: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('#page-content').getByRole('heading', {
      name: 'About Us',
      exact: true,
    });
    this.description = page
      .locator('#page-content')
      .getByText(
        /This is a demo site created for.*Sauce.*an awesome new way to make your Shopify site social/,
      );
  }

  async expectLoaded() {
    await this.expectPageTitle(/^About Us – Sauce Demo$/);
    await expect(this.pageHeading).toHaveText('About Us');
    await expect(this.description).toBeVisible();
    await expect(this.description.getByRole('link', { name: 'Sauce' })).toHaveAttribute(
      'href',
      'http://sauceapp.io',
    );
  }
}
