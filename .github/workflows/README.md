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

## How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone <https://github.com/linhpro29-lab/demoblaze-playwright-automation.git>