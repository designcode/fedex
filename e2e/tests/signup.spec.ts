import { test, expect } from '@playwright/test';
import { SignUpData } from 'e2e/data/signup.data';
import { Homepage } from 'e2e/pages/home.page';
import { SignUpPage } from 'e2e/pages/signup.page';

const homePage = new Homepage();
const signUpPage = new SignUpPage();

test.describe('sign up process', () => {
	test.describe('Homepage before signup', () => {
		test('shows signup message when user is not logged in', async ({
			page,
		}) => {
			await page.goto('/');

			await expect(page.locator(homePage.signupMessage)).toBeVisible();
		});

		test('clicking signup link sends to sign up page', async ({ page }) => {
			await page.goto('/');
			page.locator(homePage.signupLink).click();

			await expect(page).toHaveURL('/signup');
		});
	});

	test.describe('Signup Page', () => {
		test('shows signup message when user is not logged in', async ({
			page,
		}) => {
			await page.goto('/signup');

			await expect(page.locator(signUpPage.title)).toBeVisible();
		});

		test('shows signup form and fields', async ({ page }) => {
			await page.goto('/signup');

			await expect(page.locator(signUpPage.signUpForm)).toBeVisible();
			await expect(page.locator(signUpPage.firstNameField)).toBeVisible();
			await expect(page.locator(signUpPage.lastNameField)).toBeVisible();
			await expect(page.locator(signUpPage.emailField)).toBeVisible();
			await expect(page.locator(signUpPage.passwordField)).toBeVisible();
			await expect(page.locator(signUpPage.submitButton)).toBeVisible();
		});

		test('button should be enabled only if form is valid', async ({
			page,
		}) => {
			await page.goto('/signup');

			// By default, the submit button should be disabled until form is valid
			await expect(page.locator(signUpPage.submitButton)).toBeDisabled();

			await signUpPage.fillData(page);

			// Once the form is valid, it should be enabled
			await expect(page.locator(signUpPage.submitButton)).toBeEnabled();
		});

		test('submitting the form should result in signup and redirect user to homepage', async ({
			page,
		}) => {
			await page.goto('/signup');

			// By default, the submit button should be disabled until form is valid
			await expect(page.locator(signUpPage.submitButton)).toBeDisabled();

			signUpPage.fillData(page);

			// Once the form is valid, it should be enabled
			await page.locator(signUpPage.submitButton).click();

			await expect(page).toHaveURL('/');
		});
	});

	test.describe('Homepage after signup', () => {
		test('shows user information on homepage', async ({ page }) => {
			await page.goto('/signup');

			// By default, the submit button should be disabled until form is valid
			await expect(page.locator(signUpPage.submitButton)).toBeDisabled();

			signUpPage.fillData(page);

			// Once the form is valid, it should be enabled
			await page.locator(signUpPage.submitButton).click();

			await expect(page.locator(homePage.userInfo)).toBeVisible();
			await expect(
				page.locator(homePage.userInfoFirstName)
			).toContainText(SignUpData.firstName);
			await expect(page.locator(homePage.userInfoEmail)).toContainText(
				SignUpData.email
			);
		});
	});
});
