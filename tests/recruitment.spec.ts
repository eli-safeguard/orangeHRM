import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');
});


test('not logged in', async ({ page }) => {

  console.log('current page: ' + page.url());
  
  // Expect url not to contain "dashboard"
  await expect(page).not.toHaveURL(/dashboard/);
});


test('can login', async ({ page }) => {

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.keyboard.press('Enter');

  // Expect url to contain "dashboard"
  await expect(page).toHaveURL(/dashboard/);
});

