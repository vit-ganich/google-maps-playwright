import { Locator, Page } from '@playwright/test';

/**
 * BaseElement wraps a Playwright Locator.
 * This class an contain methods to help with interactions.
 * Useful in case of complex elements with multiple actions.
 */
export abstract class BaseElement {
  constructor(private readonly locator: Locator) {}

  /**
   * Get a Locator for the current element.
   * Locators represent a way to find element(s) on the page at any moment.
   * @returns Locator
   */
  get() {
    return this.locator;
  }
}
