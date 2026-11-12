# 🎭 Automated QA Framework for Demoblaze

[![Playwright E2E Tests](https://github.com/Geektasilla/AQA-demoblaze-com/actions/workflows/playwright-tests.yml/badge.svg)](https://github.com/Geektasilla/AQA-demoblaze-com/actions/workflows/playwright-tests.yml)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Browsers](https://img.shields.io/badge/browsers-Chromium%20%7C%20Firefox%20%7C%20WebKit-informational)

End-to-end test automation framework for the [Demoblaze](https://www.demoblaze.com) e-commerce demo store,
built with **Playwright + TypeScript** using the Page Object / Component Object pattern and custom fixtures.

**16 scenarios × 3 browsers = 48 test runs** on every push, pull request and nightly via GitHub Actions.

## What is covered

| Area | Scenarios |
|------|-----------|
| **Auth** | sign up, duplicate username rejection, empty-field validation, closing the modal, login / logout |
| **Cart** | add one / multiple products, remove a product, total price calculation |
| **Checkout** | successful order with purchase confirmation, closing the order form, empty-form validation |
| **Navigation** | categories (Phones / Laptops / Monitors), carousel controls, Contact and About us modals |

Full test plan: [specs/demoblaze-test-checklist.md](specs/demoblaze-test-checklist.md)

## Tech stack

- Playwright Test, TypeScript, Node.js
- Page Object Model + reusable UI components (`navbar`, `login`, `signup`, `order` modals)
- Custom Playwright fixtures for test isolation
- GitHub Actions: type check → cross-browser run → HTML report and traces as artifacts
- Playwright AI agents (planner / generator / healer) used for test planning and maintenance

## Project structure

```
├── .github/
│   ├── agents/              # Playwright planner / generator / healer agent configs
│   └── workflows/           # CI pipeline
├── specs/                   # test plan and QA checklist
├── src/
│   ├── components/          # modal & navbar component objects
│   ├── pages/               # page objects (main, product, cart)
│   ├── fixtures/baseTest.ts # custom fixtures, per-test guest isolation
│   └── utils/helpers.ts     # dialog handling, add-to-cart helper
├── tests/                   # specs grouped by feature: auth, cart, checkout, navigation
└── playwright.config.ts
```

## Engineering notes

Problems found while stabilising the suite against a live third-party site, and how they were solved:

- **Shared guest cart.** Demoblaze identifies guests by a `user` cookie that it sets only on the home page.
  Tests that open a product page directly ended up sharing one global cart with hundreds of items.
  A custom `page` fixture now issues a unique guest id per test, so every test starts with an empty cart.
- **No fixed sleeps.** `waitForTimeout` calls were replaced with state-based waits: the "Product added" alert
  signals a successful API call, and cart assertions wait for the exact row count.
- **Native alerts vs. SweetAlert.** The purchase confirmation is a SweetAlert popup, not a browser dialog —
  the test now asserts its content (name, card number) in the DOM.
- **Synchronous alerts block clicks.** A helper accepts the dialog while the click is still in flight,
  avoiding a deadlock when `alert()` is called inside a click handler.
- **Strict locators.** The order modal has two "Close" controls; the locator is scoped to the modal footer.
- **CI retries only.** `retries: 2` in CI absorbs network hiccups of the public site; locally failures surface immediately.

## Quick start

```bash
npm ci
npx playwright install --with-deps
npx playwright test                 # all browsers
npx playwright test --project=chromium
npx playwright test --ui            # interactive UI mode
npx playwright show-report          # open the last HTML report
```
