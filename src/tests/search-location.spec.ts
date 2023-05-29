import { expect } from '@playwright/test';
import { test } from '../test-runner';
import locales from '../locale/locales';
import config from '../../playwright.config';

// Localization test. Depends on the locale from .env
// Unfortunately, I did not found a way to test locales in sequence, like:
//  for(const localeName of ['en-GB', 'pl-PL']);
const localeName = config.use?.locale;
const locale = locales[localeName as keyof typeof locales];

/**
 * User Story
 * As a Google Maps user, I want to search for a location via the search bar
 * so that I can see a map of that specific location with additional information displayed or accessible.
 */
test.beforeEach(async ({ googleMapsPage }) => {
  // GIVEN a user is on the Google Maps page
  await googleMapsPage.open();
});

test(`AC1: ${localeName} - Search by keyword`, async ({ googleMapsPage }) => {
  // WHEN the user enters “Paris” in the search box
  // AND clicks “Search”
  const searchResults = await googleMapsPage.perfomSearch(locale.cities.paris);

  // THEN the left panel should have the place name as the headline text
  await expect.soft(searchResults.placeName).toHaveText(locale.cities.paris);
  // And the left panel should have the country name as the headline text
  await expect(searchResults.countryName).toHaveText(locale.countries.france);
});

test(`AC2: ${localeName} - Search by keyword and get directions`, async ({
  googleMapsPage,
}) => {
  // WHEN the user enters “Paris” in the search box
  // AND clicks “Search”
  const searchResults = await googleMapsPage.perfomSearch(locale.cities.london);

  // THEN the left panel should have the place name as the headline text
  await expect.soft(searchResults.placeName).toHaveText(locale.cities.london);
  // And the left panel should have the country name as the headline text
  await expect(searchResults.countryName).toHaveText(locale.countries.uk);

  // WHEN the user clicks the "Directions" button
  const directions = await searchResults.goToDirections();
  // THEN the destination field should contain "London"
  const destinationText = `${locale.search.destination} ${locale.cities.london}`;
  await expect(directions.destination).toHaveAttribute(
    'aria-label',
    new RegExp(destinationText),
  );
});

test(`AC3: ${localeName} - Empty search results with an invalid keyword`, async ({
  googleMapsPage,
}) => {
  // WHEN the user enters invalid characters in the search box
  // AND clicks “Search”
  const searchResults = await googleMapsPage.perfomSearch('*//-&*(><+_*&*#@$');

  // THEN the empty search results message should be visible
  await expect
    .soft(searchResults.resultsNotFound)
    .toContainText(locale.emptySearch.message);
  // AND the empty search results description should be visible
  await expect(searchResults.resultsNotFound).toContainText(
    locale.emptySearch.description,
  );
});
