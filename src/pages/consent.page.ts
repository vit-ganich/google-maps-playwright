import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ConsentPage extends BasePage {
  acceptAll: Locator = this.page.locator('form button').nth(1);

  constructor(page: Page) {
    super(page);
  }
}
