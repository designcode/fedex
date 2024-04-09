import { SignUpData } from '../data/signup.data';

export class SignUpPage {
	title = '.title';
	signUpForm = '[name="signUpForm"]';
	firstNameField = '[name="firstName"]';
	lastNameField = '[name="lastName"]';
	emailField = '[name="email"]';
	passwordField = '[name="password"]';
	submitButton = '#signUpFormSubmitButton';

	async fillData() {
		cy.get(this.firstNameField).type(SignUpData.firstName);
		cy.get(this.lastNameField).type(SignUpData.lastName);
		cy.get(this.emailField).type(SignUpData.email);
		cy.get(this.passwordField).type(SignUpData.password);
	}
}
