import { FullConfig, chromium } from '@playwright/test';
import { ConsentPage } from './src/pages/consent.page';

export default async function (config: FullConfig) {
  if (!process.env.CI) {
    await acceptConsentPage(config);
  }
}

/**
 * Consent page occurs only during the local test run.
 * Click "Accept All" button and save the user session to file.
 * This file will be reused for all the tests
 * @param config
 */
async function acceptConsentPage(config: FullConfig) {
  const { storageState } = config.projects[0].use;
  const { outputDir } = config.projects[0];

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const context = page.context();

  const consentPage = new ConsentPage(page);

  try {
    await context.tracing.start({ screenshots: true, snapshots: true });

    await consentPage.open();
    await consentPage.acceptAll.click();

    await context.storageState({ path: storageState as string });

    await context.tracing.stop({ path: outputDir + '/setup-trace.zip' });
    await browser.close();
  } catch (error) {
    await context.tracing.stop({ path: outputDir + '/setup-trace.zip' });
    await browser.close();

    throw error;
  }
}
