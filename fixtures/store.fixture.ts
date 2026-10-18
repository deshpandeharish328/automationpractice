import { test as base, expect } from '@playwright/test';
import { AboutUsPage } from '../pages/AboutUsPage';
import { BlogPage } from '../pages/BlogPage';
import { HomePage } from '../pages/HomePage';

type StoreFixtures = {
  aboutUsPage: AboutUsPage;
  blogPage: BlogPage;
  homePage: HomePage;
};

export const test = base.extend<StoreFixtures>({
  aboutUsPage: async ({ page }, use) => {
    await use(new AboutUsPage(page));
  },
  blogPage: async ({ page }, use) => {
    await use(new BlogPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect };
