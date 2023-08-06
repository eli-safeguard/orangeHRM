import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('https://opensource-demo.orangehrmlive.com/');
});


// test('not logged in', async ({ page }) => {
//   console.log('current page: ' + page.url());
//   // Expect url not to contain "dashboard"
//   await expect(page).not.toHaveURL(/dashboard/);
// });

// test('login', async ({ page }) => {
// 	await login({ page });
// });

// test('navigate to recruitment page', async ({ page }) => {
// 	await login({ page });
// 	await getToRecruitment({ page });
// });

// NEED: CRUD tests

// test('validate candidate on recruitment page', async ({ page }) => {
// 	await login({ page });
// 	await getToRecruitment({ page });
// 	await verifyCandidateAppears({ page }, 'mohan k');
// });

test('create candidate on recruitment page', async ({ page }) => {
	await login({ page });
	await getToRecruitment({ page });
	await addCandidate({ page }, 'test', 'person', 'b@c.com');
	await getToRecruitment({ page });
	await verifyCandidateAppears({ page }, 'test person');
});



async function login({ page }) {
	await page.getByPlaceholder('Username').fill('Admin');
	await page.getByPlaceholder('Password').fill('admin123');
	await page.keyboard.press('Enter');
	await expect(page).toHaveURL(/dashboard/);
}

async function getToRecruitment({ page }) {
	await page.getByRole('link', { name: /Recruitment/ }).click();
	await expect(page).toHaveURL(/recruitment\/viewCandidates/);
}

async function verifyCandidateAppears({ page }, candidate: string) {
	await expect(page.getByRole('cell', { name: candidate })).toBeVisible();
}

async function addCandidate({ page }, firstName: string, lastName: string, email: string) {
	await page.getByRole('button', { name: 'Add' }).click();
	await page.getByPlaceholder('First Name').fill(firstName);
	await page.getByPlaceholder('Last Name').fill(lastName);
	await page.getByPlaceholder('Type here').first().fill(email);
	await page.getByRole('button', { name: 'Save' }).click();
	await expect (page.getByText(firstName + ' ' + lastName, { exact: true })).toBeVisible();
}