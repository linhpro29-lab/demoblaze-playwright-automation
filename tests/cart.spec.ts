import { test, expect } from '@playwright/test';
import { LoginData } from '../Test data/loginData';
import { ProductData } from '../Test data/productData';
import { ClientData } from '../Test data/clientData';
import { PageManager } from '../pages/PageManager';

test.describe('User authorization', () => {
    let pm: PageManager;

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
        await pm.onLoginPage().open(LoginData.urls.mainPage);
        await pm.onLoginPage().login(LoginData.user.email, LoginData.user.password);
    });

    test.afterEach(async () => {
        await pm.onLoginPage().open(LoginData.urls.cartPage);

        try {
            await pm.onCartPage().cartItemNames.first().waitFor({ state: 'visible', timeout: 5000 });
            await pm.onCartPage().clearCart();
        } catch (e) {
            console.log('Cart is empty');
        }
    });

    test('CRT_01_Add product to cart', async () => {

        await test.step('Add product to Cart by product name', async () => {
            await pm.onProductPage().addProductsToCart(ProductData.products.samsungS6);
            await pm.onCartPage().cartNavigation.click();
        });

        //Assertions
        await test.step('Verification that selected product is added to cart', async () => {
            await pm.onCartPage().waitForTableToLoad();
            await expect(pm.onCartPage().cartTableBody).toContainText(ProductData.products.samsungS6);
        });
    });

    test('CRT_03_Add multiple product to cart', async () => {

        const products = ProductData.categories.monitors;

        await test.step('Add multiple product to Cart', async () => {
            for (const name of products) {
                await pm.onProductPage().SelectMonitorsCategory();
                await pm.onProductPage().productByName(name).click();
                await pm.onItemCardPage().addToCartButton.click();
                await pm.onBasePage().getAlertText();
                await pm.onProductPage().mainNavBar.click();
            }

            await pm.onCartPage().cartNavigation.click();
        });

        //Assertions
        await test.step('Multiple product verification', async () => {
            await pm.onCartPage().waitForTableToLoad();
            expect(pm.onCartPage().cartTableBody).toContainText(ProductData.products.appleMonitor);
            expect(pm.onCartPage().cartTableBody).toContainText(ProductData.products.asusMonitor);
        });
    });

    test('CRT_02_Delete product from cart', async () => {

        const productToDelete = ProductData.products.samsungS6;

        await test.step('Add product then Delete from the Cart', async () => {
            await pm.onProductPage().addProductsToCart(productToDelete);
            await pm.onCartPage().cartNavigation.click();
            await pm.onCartPage().deleteProduct(productToDelete);
        });

        //Assertions
        await test.step('Verify that product is deleted from the Cart', async () => {
            await expect(pm.onCartPage().cartTableBody).not.toContainText(productToDelete);
        });
    });

    test('CRT_05_Checkout product', async () => {

        await test.step('Add product to the cart then proceed checkout', async () => {
            await pm.onProductPage().addProductsToCart(ProductData.products.samsungS6);
            await pm.onCartPage().cartNavigation.click();
            await pm.onCartPage().fillCheckoutForm(ClientData.info.name, ClientData.info.country, ClientData.info.city, ClientData.info.creditCard, ClientData.info.month, ClientData.info.year);
            await pm.onCartPage().purchaseButton.click();
        });

        //Assertions
        await test.step('Verify that product purchased successfully', async () => {
            await expect(pm.onCartPage().purchaseCuccessMessage).toBeVisible();
            await expect(pm.onCartPage().purchaseCuccessMessage).toHaveText('Thank you for your purchase!');
            await expect(pm.onCartPage().okButton).toBeVisible();
            await pm.onCartPage().okButton.click();
        });
    });
});