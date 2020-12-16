import { Selector } from 'testcafe';

class LandingPage {
  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async gotToLogIn(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-button');

  }
}

export const landingPage = new LandingPage();
