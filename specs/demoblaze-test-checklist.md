# Demoblaze Test Checklist

This document contains a comprehensive E2E test checklist for the Demoblaze store website (https://www.demoblaze.com). It is intended for manual QA review and future Playwright automation.

## 1. Authentication

### 1.1 Sign up
- Open the Sign up modal from the main navigation.
- Verify that the modal opens correctly and all fields are visible and enabled.
- Register a new user with a unique username and password.
- Verify the success flow and confirm the user can sign in afterward.
- Verify the failure cases:
  - empty username
  - empty password
  - whitespace-only username/password
  - already existing username
  - very long username/password
  - invalid special-character input if applicable
- Verify the modal can be closed using Close and the cross button.

### 1.2 Log in
- Open the Log in modal from the main navigation.
- Verify successful login with valid credentials.
- Verify failed login with:
  - wrong username
  - wrong password
  - wrong combination of credentials
  - empty fields
  - whitespace-only values
- Confirm the interface changes correctly after a successful login and returns to the guest state after logout.

### 1.3 Logout
- Log in successfully.
- Verify the logout option is available and works as expected.
- Confirm the user is returned to the guest state after logout.

## 2. Navigation

### 2.1 Home page
- Open the homepage and confirm it loads successfully.
- Verify the page title contains STORE.
- Verify the key UI elements are visible: logo, menu, categories, main content, and footer.

### 2.2 Main menu
- Verify links for Home, Contact, About us, Cart, Log in, and Sign up are present and clickable.
- Confirm the navigation routes behave as expected.
- Verify the current page state is reflected correctly in the menu.

### 2.3 Categories
- Open Phones, Laptops, and Monitors.
- Verify that product lists update correctly for each category.
- Verify that switching between categories does not break the page.
- Verify that a category can be selected repeatedly without errors.

### 2.4 Product details
- Open a product from the home page.
- Verify the product page loads correctly and shows the expected product name and price.
- Navigate back to the catalog and confirm the page returns correctly.
- Open a product page directly via URL and verify it renders correctly.

### 2.5 Additional sections
- Open Contact and verify the modal/section displays correctly.
- Open About us and confirm the informational content is visible and readable.
- Test the carousel controls (Previous/Next) on the main page.
- Verify that repeated clicks on carousel controls do not break the layout.

## 3. Cart

### 3.1 Add products
- Add a product from the home page to the cart.
- Add multiple products from different categories.
- Add the same product multiple times and verify behavior.
- Add a product from the product detail page.
- Confirm that products appear in the cart correctly.

### 3.2 Cart page
- Open the cart page from the menu.
- Verify the cart page loads correctly.
- Confirm that empty cart state is handled properly.
- Verify the cart shows expected product details such as image, title, price, and quantity.

### 3.3 Cart actions
- Remove a single product from the cart.
- Remove all products from the cart.
- Verify that totals and item counts update correctly after changes.
- Verify that the cart behaves correctly after a page refresh.

## 4. Checkout / Order Placement

### 4.1 Positive checkout flow
- Add at least one product to the cart.
- Open the Place Order form.
- Fill in all required fields with valid input.
- Submit the order successfully.
- Verify that the order confirmation is shown and the purchase flow completes as expected.

### 4.2 Negative checkout flow
- Try to place an order with empty required fields.
- Try to submit an incomplete form.
- Try invalid card data and invalid numeric input.
- Try special characters, long text, and whitespace-only values.
- Verify that the system blocks invalid orders and shows proper feedback.

### 4.3 Checkout form behavior
- Close the order form and verify it closes properly.
- Reopen the form and confirm it works again.
- Verify that placing an order from an empty cart is handled correctly.
- Confirm the user receives a clear result when the checkout flow fails or is blocked.

## 5. Cross-functional / Regression

- Navigate through Home → Category → Product → Cart → Order repeatedly.
- Verify the UI remains stable across repeated navigation.
- Refresh pages after login, cart updates, and category switches to confirm expected behavior.
- Verify that the site remains usable under delayed loading conditions.
- Confirm that navigation, modals, and primary actions are accessible and do not break unexpectedly.
