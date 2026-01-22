import { test, expect } from '@playwright/test';
import { LoginData } from '../Test data/loginData';
import { ProductData } from '../Test data/productData';
import { PageManager } from '../pages/PageManager';

test.describe('User authorization', () => {
    let pm: PageManager;

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
        await pm.onLoginPage().open(LoginData.urls.mainPage);
        await pm.onLoginPage().login(LoginData.user.email, LoginData.user.password);
    });

    test('CRT_08_Search product by category menu', async () => {

        const expectedMonitors = ProductData.categories.monitors;

        await test.step('Navigate to categories', async () => {
            const expectedMonitors = ProductData.categories.monitors;
            await pm.onProductPage().SelectMonitorsCategory();
        });

        //Assertions
        await test.step('Product verification after navigation to categories', async () => {
            await pm.onProductPage().verifyProductsAreVisible(expectedMonitors);
            expect(pm.onProductPage().productByName(ProductData.products.appleMonitor)).toHaveText(ProductData.products.appleMonitor);
            expect(pm.onProductPage().productByName(ProductData.products.asusMonitor)).toHaveText(ProductData.products.asusMonitor);
        });

    });
});