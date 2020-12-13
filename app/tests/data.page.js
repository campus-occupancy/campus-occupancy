import { Selector } from 'testcafe';

class DataPage {
  constructor() {
    this.pageId = '#dataMenuPage';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}
export const dataPage = new DataPage();
