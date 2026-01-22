import { BasePage } from './BasePage';

export class ItemCardPage extends BasePage {
    //Element locators
    readonly itemTitle = this.page.locator('h2.name');
    readonly addToCartButton = this.page.getByRole('link', { name: 'Add to cart' });
}