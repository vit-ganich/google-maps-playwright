import { Page, defineConfig } from '@playwright/test';
import config from '../../playwright.config';

/**
 * Base class for Page Objects
 */
export abstract class BasePage {
  url: string;

  title: string;

  constructor(
    protected page: Page,
    options?: Partial<{ url: string; title: string }>,
  ) {
    this.url = options?.url || 'https://www.google.com/maps';
    this.title = options?.title || 'Google Maps';
  }

  async open(): Promise<void> {
    await this.page.goto(this.url);
  }
}
