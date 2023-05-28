import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  outputDir: './test-results',
  preserveOutput: 'always',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 1,
  reporter: [['list'], ['html']],
  globalSetup: require.resolve('./global-setup'),
  use: {
    baseURL: 'https://www.google.com/maps',
    storageState: process.env.CI ? undefined : 'state.json',
    actionTimeout: 0,
    screenshot: 'on',
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    contextOptions: {
      ignoreHTTPSErrors: true,
      acceptDownloads: true,
    },
    headless: true,
    locale: process.env.LOCALE ? process.env.LOCALE : 'en-GB',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};

export default config;
