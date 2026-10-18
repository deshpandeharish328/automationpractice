# automationpractice
automationpractice

## Storefront navigation and content tests

This Playwright suite uses a page object model for the Sauce Demo Shopify
storefront. Page objects (`pages`), fixtures (`fixtures`), and tests (`tests`)
are separate root-level directories. Keep test spec files directly in `tests`;
do not add subdirectories there.

Install dependencies and the Playwright browser binaries if needed:

```sh
npm install
npx playwright install
```

Run the storefront navigation and content suite in all configured browsers:

```sh
npm run test:e2e
```

Run only in Chromium:

```sh
npx playwright test --project=chromium
```

Open the interactive runner:

```sh
npm run test:e2e:ui
```

The tests use independent Playwright browser contexts. They verify storefront
navigation and content only; they do not create customer accounts, submit
orders, or enter payment details.
