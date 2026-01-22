import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Global function that open URLs
  async open(url: string) {
    await this.page.goto(url);
  }

  async getAlertText() {
    // Get the text from Browser Native Popups
    const dialogPromise = this.page.waitForEvent('dialog');

    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();

    return message;
  }

  async waitForNumberOfSeconds(timeInSeconds: number) {
    await this.page.waitForTimeout(timeInSeconds * 1000)
  }
}