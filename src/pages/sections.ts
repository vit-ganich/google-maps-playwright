import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class SearchResults extends BasePage {
  placeName: Locator = this.page.locator('h1.fontHeadlineLarge');
  countryName: Locator = this.page.locator('h2>span');

  directions: Locator = this.page.locator(
    'button[jsaction="pane.placeActions.directions;keydown:pane.placeActions.directions"]',
  );

  // Empty search results
  resultsNotFound: Locator = this.page.getByRole('main');

  async goToDirections(): Promise<Directions> {
    await this.directions.click();
    return new Directions(this.page);
  }
}

export class Directions extends BasePage {
  startingPoint: Locator = this.page.locator('#directions-searchbox-0 input');
  destination: Locator = this.page.locator('#directions-searchbox-1 input');
}
