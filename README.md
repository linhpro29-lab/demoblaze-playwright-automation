# DemoBlaze E2E Automation Framework

This project is a modular End-to-End (E2E) test automation framework for the (https://www.demoblaze.com/) website, built with **Playwright** and **TypeScript**.

## Submit criteria
- **Page Object Model (POM)**: Modular design for high maintainability and scalability.
- **Cross-Browser Testing**: Configured to run across Chromium, Firefox, and WebKit.
- **CI/CD Integration**: Fully automated execution via GitHub Actions.
- **Stable Assertions**: Custom waits for handling dynamic web elements and network delays.
- **Comprehensive Reporting**: Built-in HTML reports with trace viewing for failed tests. (npx playwright show-report)

## Tech Stack
- **Language**: TypeScript
- **Test Runner**: Playwright
- **CI/CD**: GitHub Actions

## Scenarios Covered
- **User Authorization**: Login/Logout functionality (Positive & Negative scenarios).
- **Product Navigation**: Category-based search and product verification (Monitors, etc.).
- **Cart Management**: Adding products and cart cleanup with `afterEach` hooks.

## Framework structure
- **pages/ (page object model)**: each page of the website is described in a separate class. This separates the validation logic, allowing to update locators in one place.
- **basePage.ts**: contains common methods.
- **pageManager.ts**: The Manager pattern, initializing all pages at once, which simplifies use in tests.
- **tests/**: test scenarios are organized by functional areas (authentication, shopping cart, sorting).
- **testData/**: Separating data into separate JSON/TS files makes it easy to change test suites without interfering with the test code.
- **.github/workflows/**: A CI/CD pipeline (GitHub Actions) to run tests on Linux with every push on GitHub.

## How to Setup
- **Prerequisites**: Node.js

- **Clone the repository**:
   ```bash
   git clone <https://github.com/linhpro29-lab/demoblaze-playwright-automation.git>

- **Get dependencies**:
   npm install
   npx playwright install

## How to Run 
- **Execute tests through commands with useful flags**:
* npx playwright test
* npx playwright test --workers=1 (for better stability)
* npx playwright test --headed (run tests with open browser)
* npx playwright test --ui (run tests with opened interface for better tracking)
* npx playwright test --debug (run tests in debug mode)
* npx playwright test --trace on (run tests with detailed trace)

- **Execute tests through UI**:
1. Navigate to `Testing` bar on the left side menu
2. Choose Project browser to run
3. Select test suites or test case name to run
4. Press Play button

