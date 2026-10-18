# Sauce Demo Storefront Comprehensive Test Plan

## Application Overview

Functional and UX test plan for https://sauce-demo.myshopify.com/, covering storefront navigation and content, product catalog and details, search, cart and checkout handoff, customer account forms, and the wishlist/referral entry points. The observed catalog includes seven products: Black heels (£45.00), Bronze sandals (£39.99), Brown Shades (£20.00, sold out), Grey jacket (£55.00), Noir jacket (£60.00), Striped top (£50.00), and White sandals (£25.00, sold out). Run each scenario independently in a new browser context with a fresh cart, no authenticated customer, and no saved state. Use only approved test customer data and stop checkout before submitting payment or placing a real order.

## Test Scenarios

### 1. Storefront Navigation and Content

**Seed:** `tests/seed.spec.ts`

#### 1.1. Load homepage and verify primary navigation

**File:** `tests/storefront-navigation/homepage-and-global-navigation.spec.ts`

**Steps:**
  1. Open https://sauce-demo.myshopify.com/ in a fresh browser context.
    - expect: The homepage loads successfully and displays the Sauce Demo brand and store tagline.
    - expect: The header shows Search, About Us, Log In, Sign up, My Cart (0), and Check Out links or controls.
    - expect: Primary navigation exposes Home, Catalog, Blog, About Us, Wish list, and Refer a friend.
  2. Use Catalog, Blog, About Us, Log In, and Sign up navigation links one at a time, returning to the homepage between checks.
    - expect: Each link opens its matching page without a broken-page or unexpected redirect.
    - expect: The store header and primary navigation remain available on each page.

#### 1.2. Verify About Us and footer content

**File:** `tests/storefront-navigation/about-and-footer.spec.ts`

**Steps:**
  1. Open /pages/about-us directly.
    - expect: The About Us page heading and store breadcrumb are visible.
    - expect: The page includes the Sauce demo description and a working Sauce link.
  2. Inspect the footer on the About Us page and navigate through its Search and About Us links.
    - expect: Footer navigation links resolve to their intended pages.
    - expect: Payment acceptance images for Amex, Visa, and Mastercard are present with meaningful accessible names.
    - expect: Footer copyright and Shopify cart attribution are visible.

#### 1.3. Verify news blog content and navigation

**File:** `tests/storefront-navigation/blog-and-breadcrumbs.spec.ts`

**Steps:**
  1. Open /blogs/news from a fresh context and follow the Blog navigation link.
    - expect: The News page loads and its breadcrumb identifies the News page.
    - expect: The visible article listing includes the First Post entry and author information.
    - expect: Navigation back to Home and Catalog works.
  2. Open the blog RSS link from the site navigation, if in scope for browser testing.
    - expect: The RSS link resolves to the store's news feed rather than a broken storefront route.

#### 1.4. Check wishlist and referral entry points

**File:** `tests/storefront-navigation/social-entry-points.spec.ts`

**Steps:**
  1. From the homepage, click Wish list and record the resulting URL, visible panels, and accessible controls.
    - expect: The wishlist entry point produces a usable wishlist interaction or a clear user-facing explanation if the feature is unavailable.
    - expect: The link does not lead to a blank page, an unhandled error, or a misleading success state.
  2. Return to the homepage and click Refer a friend; inspect any resulting dialog, panel, or page.
    - expect: The referral entry point provides a usable referral interaction or a clear explanation if unavailable.
    - expect: Any dialog/panel can be dismissed and does not block normal store navigation.

### 2. Catalog and Product Details

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify full catalog listing and sold-out labels

**File:** `tests/catalog/catalog-products-and-prices.spec.ts`

**Steps:**
  1. Open /collections/all.
    - expect: The Products heading is visible.
    - expect: The catalog lists Black heels (£45.00), Bronze sandals (£39.99), Brown Shades (£20.00), Grey jacket (£55.00), Noir jacket (£60.00), Striped top (£50.00), and White sandals (£25.00).
    - expect: Brown Shades and White sandals are visibly marked Sold Out; other listed products are not marked sold out.
  2. Open each catalog card and use the browser Back action to return to the catalog.
    - expect: Each card navigates to a product detail page for the matching product.
    - expect: Product links, names, and prices do not point to another product or show inconsistent data.

#### 2.2. Verify featured products and recommendations

**File:** `tests/catalog/homepage-featured-products.spec.ts`

**Steps:**
  1. Open the homepage and inspect its featured product cards.
    - expect: Grey jacket (£55.00), Noir jacket (£60.00), and Striped top (£50.00) are displayed as featured products.
    - expect: Each featured card opens its matching product detail page.
  2. Open Grey jacket and inspect the You Might Also Like section.
    - expect: The recommendation section is present and recommended product links open the corresponding product pages.
    - expect: Product names and displayed prices agree with their catalog entries.

#### 2.3. Verify available product detail information

**File:** `tests/catalog/product-details-and-variants.spec.ts`

**Steps:**
  1. Open Grey jacket, Noir jacket, and Striped top detail pages separately.
    - expect: Each page displays the correct product name, price, product image, description area, and breadcrumb.
    - expect: The product option selector, when present, shows the valid option selected and does not offer unrelated variants.
  2. Use each product page breadcrumb to return to the parent collection and the homepage.
    - expect: Breadcrumb links resolve to the correct collection and home routes.
    - expect: The user can return without losing the expected page context or encountering an error.

#### 2.4. Prevent purchasing sold-out products

**File:** `tests/catalog/sold-out-products.spec.ts`

**Steps:**
  1. Open the Brown Shades product page from /collections/all.
    - expect: The page identifies Brown Shades as sold out or unavailable.
    - expect: A purchase action is unavailable or clearly disabled; the product cannot be added to the cart.
  2. Repeat the check for White sandals and inspect the cart afterward.
    - expect: White sandals is identified as sold out or unavailable.
    - expect: Neither sold-out product is added to the cart and the cart count/contents remain unchanged.

#### 2.5. Add an available product to cart

**File:** `tests/catalog/add-product-to-cart.spec.ts`

**Steps:**
  1. From a fresh empty cart, open the Grey jacket detail page and activate Add to Cart once.
    - expect: The action completes without an error.
    - expect: The cart count increments to one and the cart contains one Grey jacket at £55.00.
  2. Open /cart and compare the line item, unit price, quantity, and total.
    - expect: The line item identifies Grey jacket, quantity 1, and price/line total £55.00.
    - expect: The cart total is £55.00 and the cart header count reflects one item.

### 3. Search

**Seed:** `tests/seed.spec.ts`

#### 3.1. Find an existing product by name

**File:** `tests/search/product-search.spec.ts`

**Steps:**
  1. From the homepage, enter Grey jacket in the header Search field and submit the search.
    - expect: The search results page loads and reflects the submitted query.
    - expect: Grey jacket is returned and its result links to the correct product page with the expected £55.00 price.
  2. Repeat using a distinct catalog item such as Bronze sandals.
    - expect: The matching product appears with the correct name and £39.99 price.
    - expect: Results do not incorrectly substitute a different product.

#### 3.2. Handle empty and unmatched searches

**File:** `tests/search/no-results-and-empty-search.spec.ts`

**Steps:**
  1. Submit a search for a distinctive term that cannot match any product, such as zz-no-such-item-987.
    - expect: The results page clearly communicates that no matching results were found.
    - expect: No unrelated product is presented as a match, and the user can return to the catalog or homepage.
  2. Open /search directly without a query and submit the search field empty.
    - expect: The page communicates that no search was performed or prompts the user to enter a term.
    - expect: The empty submission does not crash, show stale results, or navigate to an invalid route.

#### 3.3. Check search input formatting and case handling

**File:** `tests/search/search-input-boundaries.spec.ts`

**Steps:**
  1. Search for a valid product name with leading/trailing spaces and a different letter case.
    - expect: Search handling is consistent with the storefront's supported matching behavior and does not fail due only to surrounding whitespace or case.
    - expect: If a match is returned, it identifies the intended product and correct price.
  2. Submit a query containing punctuation and a long string, then inspect the results page.
    - expect: The query is safely handled and displayed/encoded without breaking the page.
    - expect: No script-like input is executed and the page remains navigable.

### 4. Cart and Checkout

**Seed:** `tests/seed.spec.ts`

#### 4.1. Update quantity and verify calculated totals

**File:** `tests/cart/quantity-and-totals.spec.ts`

**Steps:**
  1. In a fresh cart, add one Grey jacket and open /cart.
    - expect: One Grey jacket line item is shown at £55.00 with quantity 1 and cart total £55.00.
  2. Change the line-item quantity to 2 and activate Update.
    - expect: The cart retains Grey jacket with quantity 2.
    - expect: The line total and cart total update to £110.00, and the header item count reflects two units.

#### 4.2. Maintain multiple items and an order note

**File:** `tests/cart/multiple-items-and-note.spec.ts`

**Steps:**
  1. Add one Grey jacket (£55.00) and one Noir jacket (£60.00), then open the cart.
    - expect: Both distinct products appear as separate correct line items at quantity 1.
    - expect: The total equals £115.00 and the header count equals two.
  2. Enter a plain-text note in Add a note to your order and activate Update.
    - expect: The note is retained after the cart update/reload according to the cart's supported behavior.
    - expect: Line items, quantities, and the £115.00 total remain unchanged.

#### 4.3. Remove cart items and verify empty state

**File:** `tests/cart/remove-items-and-empty-state.spec.ts`

**Steps:**
  1. Add one Grey jacket and open the cart; activate the remove control for the item.
    - expect: The item is removed and the cart header count becomes zero.
    - expect: The cart displays its empty-state message and a Continue Shopping link.
  2. Activate Continue Shopping.
    - expect: The user is taken to the catalog and can continue browsing.

#### 4.4. Reject invalid cart quantities

**File:** `tests/cart/invalid-quantity.spec.ts`

**Steps:**
  1. Add an available product, enter a nonnumeric or below-minimum quantity in its quantity field, and activate Update.
    - expect: The cart rejects or safely corrects the invalid quantity with clear feedback.
    - expect: The cart does not display a negative quantity, an incorrect total, or a false successful update.
  2. Enter a valid quantity of 1 and activate Update.
    - expect: The cart returns to a valid quantity and recalculates the total correctly.

#### 4.5. Validate checkout handoff without placing an order

**File:** `tests/cart/checkout-handoff.spec.ts`

**Steps:**
  1. Add one available item and open the cart, then activate Check Out.
    - expect: The site opens the configured Shopify checkout flow without losing the cart contents.
    - expect: Checkout presents its expected customer/shipping/payment steps over a secure connection.
  2. Stop at the checkout information stage; do not enter real payment details or submit an order.
    - expect: No order is placed and no payment is charged.
    - expect: The shopper can return to the storefront/cart without a broken or blank page.

### 5. Customer Accounts

**Seed:** `tests/seed.spec.ts`

#### 5.1. Validate login form required fields and credentials

**File:** `tests/accounts/login-validation.spec.ts`

**Steps:**
  1. Open /account/login and submit Sign In with both fields empty.
    - expect: The form provides required-field feedback or native validation and does not authenticate an empty submission.
  2. Enter a syntactically valid but unregistered approved test email and an incorrect password, then submit.
    - expect: Authentication is denied with a clear, non-sensitive error.
    - expect: The page does not reveal whether unrelated customer accounts exist and does not show a successful login state.

#### 5.2. Check password recovery entry point

**File:** `tests/accounts/forgot-password.spec.ts`

**Steps:**
  1. Open /account/login and activate Forgot your password?.
    - expect: The link opens or reveals a password-recovery form/flow.
    - expect: The flow requests the appropriate account identifier and gives a safe confirmation/error response without disclosing account existence.

#### 5.3. Validate account registration fields

**File:** `tests/accounts/registration-validation.spec.ts`

**Steps:**
  1. Open /account/register and submit Create with all fields empty.
    - expect: The form reports required-field validation for first name, last name, email, and password, and no customer account is created.
  2. Enter first and last names, an invalid email format, and a password; submit the form.
    - expect: The invalid email is rejected with actionable validation.
    - expect: No account is created and entered values are handled without exposing credentials.
  3. Enter a valid-format email with a deliberately short password and submit.
    - expect: The password policy is enforced with clear guidance; if no minimum policy exists, record the observed behavior for product review.
    - expect: A failed submission does not create an account or produce a success state.

#### 5.4. Create an account using approved test data

**File:** `tests/accounts/registration-success.spec.ts`

**Steps:**
  1. Use an explicitly approved, unique test email address and valid first name, last name, and password on /account/register; submit Create.
    - expect: Registration succeeds only when the configured account requirements are met.
    - expect: The resulting confirmation or account page is clear and the signed-in state is consistent.
    - expect: The test uses non-production customer data and the account can be removed/managed by the test owner.

#### 5.5. Verify account links and form usability

**File:** `tests/accounts/login-page-navigation.spec.ts`

**Steps:**
  1. Navigate between Log In and Sign up using the header links and inspect labels, keyboard focus, and password field masking.
    - expect: Login and registration routes are reachable from the header and expose their respective forms.
    - expect: Inputs have usable accessible labels, keyboard focus is visible, and passwords are masked.
    - expect: Form actions do not submit accidentally when the user is navigating between pages.
