import { test, expect } from '@playwright/test';
import { BasePage } from 'e2e/methods/base-page';

let basePage: BasePage;

test.beforeEach(async ({ page }) => {
	basePage = new BasePage(page);
	await page.goto('https://opensource-demo.orangehrmlive.com/');
	await basePage.login();
});


// CREATE
test('create candidate on recruitment page', async () => {
	await basePage.getToRecruitment();
	await basePage.addCandidate('test', 'person', 'a@b.com');
	await basePage.getToRecruitment();
	await basePage.verifyCandidateAppears('test person');
});

// READ
test('validate candidate on recruitment page', async () => {
	await basePage.getToRecruitment();
	await basePage.verifyCandidateAppears('Chris Harris');
});

// UPDATE
test('update candidate on recruitment page', async () => {
	await basePage.getToRecruitment();
	await basePage.updateCandidate('test', 'person', 'test2', 'person2');
	await basePage.getToRecruitment();
	await basePage.verifyCandidateAppears('test2 person2');
});

// DELETE
test('delete candidate on recruitment page', async () => {
	await basePage.getToRecruitment();
	await basePage.deleteCandidate('test2', 'person2');
	await basePage.verifyCandidateAppears('test2 person2', false);
});

test('log out', async ({ page }) => {
	await page.locator('span[class*="userdropdown"]').click();
	await page.getByRole('menuitem', { name: 'Logout' }).click();

	// Expect url not to contain "dashboard"
	await expect(page).not.toHaveURL(/dashboard/);
	await expect(page).toHaveURL(/auth\/login/);
});