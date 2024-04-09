import { Page } from '@playwright/test';
import { SignUpData } from 'e2e/data/signup.data';

export class SignUpPage {
	title = '.title';
	signUpForm = '[name="signUpForm"]';
	firstNameField = '[name="firstName"]';
	lastNameField = '[name="lastName"]';
	emailField = '[name="email"]';
	passwordField = '[name="password"]';
	submitButton = '#signUpFormSubmitButton';

	async fillData(page: Page) {
		await page.locator(this.firstNameField).fill(SignUpData.firstName);
		await page.locator(this.lastNameField).fill(SignUpData.lastName);
		await page.locator(this.emailField).fill(SignUpData.email);
		await page.locator(this.passwordField).fill(SignUpData.password);
	}
}
