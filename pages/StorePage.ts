import { expect, type Locator, type Page } from '@playwright/test';

export class StorePage {
  readonly page: Page;
  readonly header: Locator;
  readonly primaryNavigation: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole('banner');
    this.primaryNavigation = page
      .getByRole('navigation')
      .filter({ has: page.getByRole('link', { name: 'Catalog', exact: true }) });
    this.footer = page.getByRole('contentinfo');
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async expectPageTitle(title: RegExp) {
    await expect(this.page).toHaveTitle(title);
  }

  primaryLink(name: string) {
    return this.primaryNavigation.getByRole('link', { name, exact: true });
  }
}
