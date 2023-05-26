import { test as baseTest } from '@playwright/test';
import { GoogleMapsPage } from './pages/google-maps.page';

export * from '@playwright/test';

export const test = baseTest.extend<{
  googleMapsPage: GoogleMapsPage;
}>({
  googleMapsPage: async ({ page }, use) => {
    await use(new GoogleMapsPage(page));
  },
});
