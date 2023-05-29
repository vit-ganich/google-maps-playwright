import { test as baseTest } from '@playwright/test';
import { GoogleMapsPage } from './pages/google-maps.page';

export * from '@playwright/test';

// Extend basic test by providing a fixture with page objects.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = baseTest.extend<{
  googleMapsPage: GoogleMapsPage;
}>({
  googleMapsPage: async ({ page }, use) => {
    await use(new GoogleMapsPage(page));
  },
});
