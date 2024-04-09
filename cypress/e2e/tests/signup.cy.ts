import { SignUpData } from '../data/signup.data';
import { Homepage } from '../pages/home.page';
import { SignUpPage } from '../pages/signup.page';

const baseUrl = 'http://localhost:4200';

context('Sign up process', () => {
	const homePage = new Homepage();
	const signUpPage = new SignUpPage();

	describe('Homepage before signup', () => {
		beforeEach(() => {
			cy.visit(baseUrl);
		});

		it('shows signup message and link to signup when user is not logged in', () => {
			cy.get(homePage.signupMessage).should('be.visible');
			cy.get(homePage.signupLink).should('be.visible');
		});

		it('clicking signup link sends to sign up page', () => {
			cy.get(homePage.signupLink).click();
			cy.url().should('include', '/signup');
		});
	});

	describe('Signup Page', () => {
		beforeEach(() => {
			cy.visit(`${baseUrl}/signup`);
		});

		it('shows signup message when user is not logged in', () => {
			cy.get(signUpPage.title).should('be.visible');
		});

		it('shows signup form and fields', () => {
			cy.get(signUpPage.signUpForm).should('be.visible');
			cy.get(signUpPage.firstNameField).should('be.visible');
			cy.get(signUpPage.lastNameField).should('be.visible');
			cy.get(signUpPage.emailField).should('be.visible');
			cy.get(signUpPage.passwordField).should('be.visible');
			cy.get(signUpPage.submitButton).should('be.visible');
		});

		it('submitting the form should result in signup and redirect user to homepage', () => {
			signUpPage.fillData();
			cy.get(signUpPage.submitButton).click();

			cy.url().should('equal', `${baseUrl}/`);
		});
	});

	describe('Homepage after signup', () => {
		it('shows user information on homepage', () => {
			cy.visit(`${baseUrl}/signup`);

			signUpPage.fillData();
			cy.get(signUpPage.submitButton).click();

			cy.get(homePage.userInfo).should('be.visible');
			cy.get(homePage.userInfoThumbnail).should('be.visible');
			cy.get(homePage.userInfoFirstName).should(
				'contain.text',
				SignUpData.firstName
			);
			cy.get(homePage.userInfoEmail).should(
				'contain.text',
				SignUpData.email
			);
		});
	});
});
