import { Selector } from 'testcafe';

class SignoutPage {
  constructor() {
    this.pageId = '#signout-page';
    this.pageSelector = Selector(this.pageId);
  }

  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async backToHome(testController) {
    await this.ensureLogout(testController);
    await testController.click('#home-button');
  }

  async backToLogIn(testController) {
    await this.isDisplayed(testController);
    await testController.click('#login-button');
  }

}

export const signoutPage = new SignoutPage();
