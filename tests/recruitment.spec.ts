import { test, expect } from '@playwright/test';
import { BasePage } from 'e2e/methods/base-page';

let basePage: BasePage;

test.beforeEach(async ({ page }) => {
	basePage = new BasePage(page);
	await page.goto('https://opensource-demo.orangehrmlive.com/');
});


test('not logged in', async ({ page }) => {
  console.log('current page: ' + page.url());
  // Expect url not to contain "dashboard"
  await expect(page).not.toHaveURL(/dashboard/);
});

test('login', async ({ page }) => {
	await basePage.login();
});

test('navigate to recruitment page', async ({ page }) => {
	await basePage.login();
	await basePage.getToRecruitment();
});

// READ
test('validate candidate on recruitment page', async () => {
	await basePage.login();
	await basePage.getToRecruitment();
	await basePage.verifyCandidateAppears('Chris Harris');
});

// CREATE
test('create candidate on recruitment page', async () => {
	await basePage.login();
	await basePage.getToRecruitment();
	await basePage.addCandidate('test3', 'person3', 'b3@c3.com');
	await basePage.getToRecruitment();
	await basePage.verifyCandidateAppears('test3 person3');
});

// UPDATE
test('update candidate on recruitment page', async ({ page }) => {
	await page.waitForTimeout(5000);
	await basePage.login();
	await basePage.getToRecruitment();
	await basePage.updateCandidate('test3', 'person3', 'test2', 'person2');
	await basePage.getToRecruitment();
	await basePage.verifyCandidateAppears('test2 person2');
});

// DELETE
test('delete candidate on recruitment page', async ({ page }) => {
	await basePage.login();
	await basePage.getToRecruitment();
	await basePage.deleteCandidate('test3', 'person3');
	await basePage.verifyCandidateAppears('test3 person3', false);
});