import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { SearchResults } from './sections';

export class GoogleMapsPage extends BasePage {
  searchBox: Locator = this.page.locator('#searchboxinput');

  searchButton: Locator = this.page.locator('#searchbox-searchbutton');

  constructor(page: Page) {
    super(page);
  }

  async perfomSearch(keyword: string): Promise<SearchResults> {
    await this.searchBox.type(keyword);
    await this.searchButton.click();

    return new SearchResults(this.page);
  }
}
