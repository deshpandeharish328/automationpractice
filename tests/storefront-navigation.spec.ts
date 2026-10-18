import { expect, test } from '../fixtures/store.fixture';

test.describe('Storefront navigation and content', () => {
  test.describe.configure({ mode: 'serial' });

  test('homepage shows the brand, featured products, and primary navigation', async ({
    homePage,
  }) => {
    await homePage.goto('/');
    await homePage.expectLoaded();

    await expect(homePage.header.getByRole('link', { name: 'Search', exact: true })).toHaveAttribute(
      'href',
      '/search',
    );
    await expect(homePage.header.getByRole('textbox', { name: 'Search' })).toBeVisible();
    await expect(homePage.header.getByRole('link', { name: 'Log In' })).toHaveAttribute(
      'href',
      '/account/login',
    );
    await expect(homePage.header.getByRole('link', { name: 'Sign up' })).toHaveAttribute(
      'href',
      '/account/register',
    );
    await expect(homePage.header.getByRole('link', { name: /My Cart \(0\)/ })).toBeVisible();
    await expect(homePage.header.getByRole('link', { name: 'Check Out' })).toHaveAttribute(
      'href',
      '/cart',
    );

    for (const link of ['Home', 'Catalog', 'Blog', 'About Us', 'Wish list', 'Refer a friend']) {
      await expect(homePage.primaryLink(link)).toBeVisible();
    }

    await expect(homePage.productCard('Grey jacket', '£55.00')).toBeVisible();
    await expect(homePage.productCard('Noir jacket', '£60.00')).toBeVisible();
    await expect(homePage.productCard('Striped top', '£50.00')).toBeVisible();
  });

  test('primary navigation opens the home, catalog, blog, and about pages', async ({
    homePage,
  }) => {
    await homePage.goto('/');

    const destinations = [
      { name: 'Catalog', path: '/collections/all', title: /Products – Sauce Demo/ },
      { name: 'Blog', path: '/blogs/news', title: /News – Sauce Demo/ },
      { name: 'About Us', path: '/pages/about-us', title: /About Us – Sauce Demo/ },
      { name: 'Home', path: '/', title: /^Sauce Demo$/ },
    ];

    for (const destination of destinations) {
      await homePage.primaryLink(destination.name).click();
      await expect(homePage.page).toHaveURL(
        new URL(destination.path, 'https://sauce-demo.myshopify.com/').toString(),
      );
      await homePage.expectPageTitle(destination.title);
    }
  });

  test('About Us page and footer provide their expected content and links', async ({
    aboutUsPage,
  }) => {
    await aboutUsPage.goto('/pages/about-us');
    await aboutUsPage.expectLoaded();

    await expect(aboutUsPage.footer.locator('a[href="/search"]').first()).toBeVisible();
    await expect(
      aboutUsPage.footer.locator('a[href="/pages/about-us"]').first(),
    ).toBeVisible();

    for (const payment of ['Amex', 'Visa', 'Mastercard']) {
      await expect(
        aboutUsPage.footer.getByRole('img', { name: `We accept ${payment}` }),
      ).toBeVisible();
    }

    await expect(aboutUsPage.footer).toContainText(/Copyright © .* Sauce Demo/);
  });

  test('Blog page displays its article and the primary navigation remains usable', async ({
    blogPage,
  }) => {
    await blogPage.goto('/blogs/news');
    await blogPage.expectLoaded();
    await expect(blogPage.primaryLink('Home')).toHaveAttribute('href', '/');
    await expect(blogPage.primaryLink('Catalog')).toHaveAttribute('href', '/collections/all');
  });

  test('wishlist and referral navigation links update to their configured anchors', async ({
    homePage,
  }) => {
    await homePage.goto('/');
    await homePage.expectLoaded();

    await homePage.primaryLink('Wish list').click();
    await expect(homePage.page).toHaveURL(/#sauce-show-wish-list$/);
    await expect(homePage.brandHeading).toBeVisible();

    await homePage.primaryLink('Refer a friend').click();
    await expect(homePage.page).toHaveURL(/#sauce-show-refer-friend$/);
    await expect(homePage.brandHeading).toBeVisible();
  });
});
