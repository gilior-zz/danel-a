import { browser, element, by } from 'protractor';

export class DanelAPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('lg-root h1')).getText();
  }
}
