import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { CartPage } from '../pages/cartPage';
import { ItemCardPage } from '../pages/itemCardPage';

export class ProductPage extends BasePage {
    //Element locators
    readonly mainNavBar = this.page.locator('.navbar-brand');
    readonly phonesCategory = this.page.getByRole('link', { name: 'Phones' });
    readonly laptopsCategory = this.page.getByRole('link', { name: 'Laptops' });
    readonly monitorsCategory = this.page.getByRole('link', { name: 'Monitors' });

    //Actions
    async SelectPhonesCategory() {
        await this.phonesCategory.click()
    }

    async SelectLaptopsCategory() {
        await this.laptopsCategory.click()
    }

    async SelectMonitorsCategory() {
        await this.monitorsCategory.click()
    }

    productByName(name: string) {
        return this.page.locator('.card-title a').filter({ hasText: name });
    }

    async verifyProductsAreVisible(productNames: string[]) {
        for (const name of productNames) {
            const product = this.productByName(name);
            await product.waitFor({ state: 'visible', timeout: 10000 });
            await expect(product).toHaveText(name, { timeout: 10000 });
        }
    }

    async addProductsToCart(name: string) {
        await this.productByName(name).click();
        await this.page.getByRole('link', { name: 'Add to cart' }).click();
        await this.getAlertText();
        await this.mainNavBar.click();
        await this.page.locator('.card').first().waitFor({ state: 'visible' });
    }

    async addMultipleProductsToCart(productNames: string[]) {
        for (const name of productNames) {
            await this.productByName(name).click();
            await this.page.getByRole('link', { name: 'Add to cart' }).click();
            await this.getAlertText();
            await this.mainNavBar.click();
            await this.page.locator('.card').first().waitFor({ state: 'visible' });
        }
    }
}
