![build](https://github.com/vit-ganich/google-maps-playwright/actions/workflows/ci.yml/badge.svg)

# google-maps-playwright

Playwright test project with smoke tests for Google Maps
CI - GitHub Actions with storing test artifacts

## Google Maps UI tests

This project contains Playwright tests for Google Maps

### Installation

Clone the repository:

```bash
git clone https://github.com/vit-ganich/google-maps-playwright.git
```

Install the dependencies using npm.  
Playwright will be installed automatically after `npm install` in the postinstall script

```bash
npm install
```

### Configure the test environment:

There is an .env file already created in the project root directory.  
It contains the parameter for the localization. The default locale id en-GB.

```bash
LOCALE=en-GB
```

Currently, the project supports the following locales:

- en-GB
- pl-PL

### Usage

To run the tests in a headless mode, execute the following command:

```bash
npm run test
```

To run the tests in a headed mode, execute the following command:

```bash
npm run test:headed
```

In order to debug a failing test, add tag @debug to the test name and run the following command:

```bash
npm run test:debug
```

To see the report from the previous test run, execute the following command:

```bash
npm run show:report
```

### CI

The project has a GitHub Actions workflow configured.  
Triggers: `on push`, `workflow_dispatch`  
If there is any push to main or test/\*\* branch - the CI will be triggered.  
The workflow can be triggered manually as well, need to specify the `locale` parameter.  
The tests will be run agains the chosen locale (en-GB or pl-PL).
Scheduled job can be run as well.

```yaml
on:
  push:
    branches:
      - main
      - test/**
  workflow_dispatch:
    inputs:
      locale:
        type: choice
        required: true
        description: Locale
        options:
          - en-GB
          - pl-PL
        default: en-GB

  schedule:
    # At 00:00 on every day-of-week from Monday through Friday
    - cron: '0 0 * * 1-5'
```

### Troubleshooting

If you encounter any issues while setting up or running the tests, consider the following solutions:

Playwright installation: Ensure that Playwright is installed correctly.  
If not, reinstall Playwright by running:

```bash
npm install playwright
```

---

If the test is failing within the `global-setup.ts` file, the reason might be the following.  
The Google Consent cookies page is occuring locally (in the incognito mode), but is not occuring during the CI test run.  
Concider commenting lines 5 - 7 in the `global-setup.ts`

```typescript
export default async function (config: FullConfig) {
  //   if (!process.env.CI) {
  //     await acceptConsentPage(config);
  //   }
}
```

### Browser selection

By default, Playwright uses Chromium as the browser.
