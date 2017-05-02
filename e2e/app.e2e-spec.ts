import { DanelAPage } from './app.po';

describe('danel-a App', () => {
  let page: DanelAPage;

  beforeEach(() => {
    page = new DanelAPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('lg works!');
  });
});
