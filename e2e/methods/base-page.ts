import { expect, Page } from "@playwright/test";

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    async login() {
        await this.page.getByPlaceholder('Username').fill('Admin');
        await this.page.getByPlaceholder('Password').fill('admin123');
        await this.page.keyboard.press('Enter');
        await expect(this.page).toHaveURL(/dashboard/);
    }

    async getToRecruitment() {
        await this.page.getByRole('link', { name: /Recruitment/ }).click();
        await expect(this.page).toHaveURL(/recruitment\/viewCandidates/);
    }

    async verifyCandidateAppears(candidate: string, appears: boolean = true) {
        appears
            ? await expect(this.page.getByRole('cell', { name: candidate })).toBeVisible()
            : await expect(this.page.getByRole('cell', { name: candidate })).not.toBeVisible();
    }

    async addCandidate(firstName: string, lastName: string, email: string) {
        await this.page.getByRole('button', { name: 'Add' }).click();
        await this.page.getByPlaceholder('First Name').fill(firstName);
        await this.page.getByPlaceholder('Last Name').fill(lastName);
        await this.page.getByPlaceholder('Type here').first().fill(email);
        await this.page.getByRole('button', { name: 'Save' }).click();
        await expect(this.page.getByText(firstName + ' ' + lastName, { exact: true })).toBeVisible();
    }

    async updateCandidate(firstName: string, lastName: string, newFirstName: string, newLastName: string) {
        // click "Eye" button for specific row
        await this.page.getByRole('row', { name: firstName + ' ' + lastName }).getByRole('button').filter({ has: this.page.locator('[class*=eye]') }).click();
        await expect(this.page.getByText(firstName + ' ' + lastName, { exact: true })).toBeVisible();
        await this.page.locator('label').filter({ hasText: 'Edit' }).locator('span').click();

        await this.page.getByPlaceholder('First Name').clear();
        await this.page.getByPlaceholder('First Name').fill(newFirstName);

        await this.page.getByPlaceholder('Last Name').clear();
        await this.page.getByPlaceholder('Last Name').fill(newLastName);

        await this.page.getByRole('button', { name: 'Save' }).click();
        await expect(this.page.getByText(newFirstName + ' ' + newLastName, { exact: true })).toBeVisible();
    }
    
    async deleteCandidate(firstName: string, lastName: string) {
        // click "Delete" button for specific row
        await this.page.getByRole('row', { name: firstName + ' ' + lastName }).getByRole('button').filter({ has: this.page.locator('[class*=trash]') }).click();
        await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
    }
}
