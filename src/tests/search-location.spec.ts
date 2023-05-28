import { expect } from '@playwright/test';
import { test } from '../test-runner';
import locales from '../locale/locales';
import config from '../../playwright.config';

/**
 * User Story
 * As a Google Maps user, I want to search for a location via the search bar
 * so that I can see a map of that specific location with additional information displayed or accessible.
 */
test.beforeEach(async ({ googleMapsPage }) => {
  // GIVEN a user is on the Google Maps page
  await googleMapsPage.open();
});

test('AC1: Search by keyword', async ({ googleMapsPage }) => {
  // WHEN the user enters “Paris” in the search box
  // AND clicks “Search”
  const searchResults = await googleMapsPage.perfomSearch('Paris');

  // THEN the left panel should have the place name as the headline text
  await expect(searchResults.placeName).toHaveText('Paris');
  // And the left panel should have the country name as the headline text
  await expect(searchResults.countryName).toHaveText('France');
});

test('AC2: Search by keyword and get directions', async ({
  googleMapsPage,
}) => {
  // WHEN the user enters “Paris” in the search box
  // AND clicks “Search”
  const searchResults = await googleMapsPage.perfomSearch('London');

  // THEN the left panel should have the place name as the headline text
  await expect(searchResults.placeName).toHaveText('London');
  // And the left panel should have the country name as the headline text
  await expect(searchResults.countryName).toHaveText('United Kingdom');

  // WHEN the user clicks the "Directions" button
  const directions = await searchResults.goToDirections();
  // THEN the destination field should contain "London"
  await expect(directions.destination).toHaveAttribute(
    'aria-label',
    'Destination London, UK',
  );
});

// Localization test. Depends on the locale from .env
const localization = config.use?.locale;
const locale = locales[localization as keyof typeof locales];

test(`AC3: ${localization} - Empty search results with an invalid keyword`, async ({
  googleMapsPage,
}) => {
  // WHEN the user enters invalid characters in the search box
  // AND clicks “Search”
  const searchResults = await googleMapsPage.perfomSearch('*//-&*(><+_');

  // THEN the empty search results message should be visible
  await expect(searchResults.resultsNotFound).toContainText(
    locale.emptySearch.message,
  );
  // AND the empty search results description should be visible
  await expect(searchResults.resultsNotFound).toContainText(
    locale.emptySearch.description,
  );
});
