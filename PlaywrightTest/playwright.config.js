import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests', // Ensure this is the correct test folder
  use: {
    headless: false, // Run in non-headless mode for debugging
    testDir: 'C:/Users/annav/PlaywrightTest/tests',  // Ensure Playwright looks in the 'tests/' folder
    testMatch: '**/*.test.js',  // Ensure it detects test files
  }
});

