import { test, expect } from '@playwright/test';
import { LoginData } from '../Test data/loginData';
import { PageManager } from '../pages/pageManager';

test.describe('Main Page navigation', () => {
    let pm: PageManager;

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
        await pm.onLoginPage().open(LoginData.urls.mainPage);
    });

    test('LOG_01_Log In with valid data', async () => {

        await test.step('Login with credentials from Test Data', async () => {
            await pm.onLoginPage().login(LoginData.user.email, LoginData.user.password);
        });

        //Assertion
        await test.step('Verification that log in was successful', async () => {
            await expect(pm.onLoginPage().welcomeMessage).toHaveText(`Welcome ${LoginData.user.email}`);
            await expect(pm.onLoginPage().logOutNavigation).toBeVisible();
        });
    });

    test('LOG_02_Negative scenario: Log In with invalid password', async () => {

        await test.step('Login with invalid credentials from Test Data', async () => {
            await pm.onLoginPage().login(LoginData.user.email, LoginData.user.invalidPassword);
        });

        //Assertion
        await test.step('Verification that password is incorrect', async () => {
            const alertText = await pm.onBasePage().getAlertText();
            expect(alertText).toBe('Wrong password.');
        });
    });

    test('LOG_04_Log out functionality', async ({ page }) => {

        await test.step('Login with credentials from Test Data', async () => {
            await pm.onLoginPage().login(LoginData.user.email, LoginData.user.password);
        });

        await test.step('Click on Log out button', async () => {
            await pm.onLoginPage().logout();
        });

        //Assertion
        await test.step('Verification that Log out was successful', async () => {
            await page.reload();
            await pm.onLoginPage().loginNavigation.waitFor({ state: 'visible' });
            await expect(pm.onLoginPage().loginNavigation).toBeVisible();
            await expect(pm.onLoginPage().logOutNavigation).not.toBeVisible();
        });
    });
});