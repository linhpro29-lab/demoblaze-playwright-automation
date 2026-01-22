import { BasePage } from './basePage';

export class CartPage extends BasePage {
    //Element locators
    readonly cartNavigation = this.page.locator('#cartur');
    readonly placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });
    readonly cartTableBody = this.page.locator('#tbodyid');
    readonly cartItemNames = this.page.locator('#tbodyid td:nth-child(2)');
    readonly deleteItemButton = this.page.getByRole('link', { name: 'Delete' });
    readonly nameCheckoutInput = this.page.locator('#name');
    readonly countryCheckoutInput = this.page.locator('#country');
    readonly cityCheckoutInput = this.page.locator('#city');
    readonly creditCardCheckoutInput = this.page.locator('#card');
    readonly monthCheckoutInput = this.page.locator('#month');
    readonly yearCheckoutInput = this.page.locator('#year');
    readonly purchaseButton = this.page.getByRole('button', { name: 'Purchase' });
    readonly closeButton = this.page.getByRole('button', { name: 'Close' });
    readonly purchaseCuccessMessage = this.page.getByRole('heading', { name: 'Thank you for your purchase!' });
    readonly okButton = this.page.getByRole('button', { name: 'OK' });

    // Actions
    async waitForTableToLoad() {
        await this.page.locator('#tbodyid tr').first().waitFor({ state: 'visible' });
    };

    async deleteProduct(productName: string) {
        const productRow = this.page.locator('#tbodyid tr').filter({ hasText: productName });
        await productRow.locator('text=Delete').click();
        await productRow.waitFor({ state: 'detached' });
    };

    async clearCart() {
        await this.page.waitForSelector('#tbodyid', { state: 'visible' });
        const firstDeleteBtn = this.deleteItemButton.first();

        while (await firstDeleteBtn.isVisible()) {
            try {
                await firstDeleteBtn.click();
                await this.page.waitForTimeout(3000);
            } catch (e) {
                console.log('Cart is empty');
                break;
            }
        }
    };

    async fillCheckoutForm(name: string, country: string, city: string, creditCard: number, month: number, year: number) {
        await this.placeOrderButton.click();
        await this.nameCheckoutInput.fill(name)
        await this.countryCheckoutInput.fill(country)
        await this.cityCheckoutInput.fill(city)
        await this.creditCardCheckoutInput.fill(creditCard.toString())
        await this.monthCheckoutInput.fill(month.toString())
        await this.yearCheckoutInput.fill(year.toString())
    }
}