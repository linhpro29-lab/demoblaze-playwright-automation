import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  //Element locators
  readonly loginNavigation = this.page.locator('#login2');
  readonly userNameInput = this.page.locator('#loginusername');
  readonly passwordInput = this.page.locator('#loginpassword');
  readonly loginButton = this.page.getByRole('button', { name: 'Log in' });
  readonly welcomeMessage = this.page.locator('#nameofuser');
  readonly logOutNavigation = this.page.locator('#logout2');

  //Actions
  async login(username: string, password: string) {
    await this.loginNavigation.click();
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logOutNavigation.click();
    await this.logOutNavigation.waitFor({ state: 'hidden' });
  }
}