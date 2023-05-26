import { FullConfig, chromium } from '@playwright/test';
import path from 'path';
import { ConsentPage } from './src/pages/consent.page';

export default async function (config: FullConfig) {
  const { storageState } = config.projects[0].use;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const context = page.context();

  const consentPage = new ConsentPage(page);

  await consentPage.open();
  await consentPage.acceptAll.click();

  await context.storageState({ path: storageState as string });

  await browser.close();
}
