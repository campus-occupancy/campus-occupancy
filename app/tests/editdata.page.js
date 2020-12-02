import { Selector } from 'testcafe';

class EditDataPage {
  constructor() {
    this.pageId = '#editDataPage';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}
export const editdataPage = new EditDataPage();