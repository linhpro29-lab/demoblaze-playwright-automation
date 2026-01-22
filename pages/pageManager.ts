import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from './basePage';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from "./productPage";
import { ItemCardPage } from "./itemCardPage";
import { CartPage } from "./cartPage";

export class PageManager {

    private readonly page: Page

    private readonly basePage: BasePage
    private readonly loginPage: LoginPage
    private readonly productPage: ProductPage
    private readonly itemCardPage: ItemCardPage
    private readonly cartPage: CartPage

    constructor(page: Page) {
        this.page = page

        this.loginPage = new LoginPage(this.page)
        this.productPage = new ProductPage(this.page)
        this.itemCardPage = new ItemCardPage(this.page)
        this.cartPage = new CartPage(this.page)
        this.basePage = new BasePage(this.page)
    }

    onBasePage() {
        return this.basePage
    }

    onLoginPage() {
        return this.loginPage
    }

    onProductPage() {
        return this.productPage
    }

    onItemCardPage() {
        return this.itemCardPage
    }

    onCartPage() {
        return this.cartPage
    }
}