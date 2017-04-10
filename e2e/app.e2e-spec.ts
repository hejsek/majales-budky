import { BudkyMajalesClientPage } from './app.po';

describe('budky-majales-client App', () => {
  let page: BudkyMajalesClientPage;

  beforeEach(() => {
    page = new BudkyMajalesClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
