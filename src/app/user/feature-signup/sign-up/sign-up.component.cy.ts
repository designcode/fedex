import { UserStoreService } from '@user/data-access';
import { SignUpComponent } from './sign-up.component';
import { provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const SignUpData = {
	firstName: 'Abdullah',
	lastName: 'Ibrahim',
	email: 'hello@designcode.me',
	password: 'Password',
};

describe(SignUpComponent.name, () => {
	beforeEach(() => {
		cy.mount('<app-fedex-sign-up/>', {
			imports: [HttpClientTestingModule, SignUpComponent],
			providers: [UserStoreService, provideRouter([])],
		});
	});

	it('should update the full name on screen when firstname and lastname fields are updated', () => {
		cy.get('.title .name').should('contains.text', '');
		cy.get('[name="firstName"]').type(SignUpData.firstName);
		cy.get('[name="lastName"]').type(SignUpData.lastName);
		cy.get('.title .name').should(
			'contains.text',
			`${SignUpData.firstName} ${SignUpData.lastName}`
		);
	});

	describe('should show error when the first name field fails validation', () => {
		it('should show error when the first name field is empty', () => {
			cy.get('[name="firstName"]').focus().blur();
			cy.get('[name="firstName"] + .error').should(
				'contains.text',
				`First name is required`
			);
		});
	});

	it('should show error when the last name field fails validation', () => {
		it('should show error when the last name field is empty', () => {
			cy.get('[name="lastName"]').focus().blur();
			cy.get('[name="lastName"] + .error').should(
				'contains.text',
				`Last name is required`
			);
		});
	});

	describe('should show error when the email field fails validation', () => {
		it('should show error when the email field is empty', () => {
			cy.get('[name="email"]').focus().blur();
			cy.get('[name="email"] + .error').should(
				'contains.text',
				`Email is required`
			);
		});

		it('should show error when the email field is invalid', () => {
			cy.get('[name="email"]').type('wrongEmail');
			cy.get('[name="email"] + .error').should(
				'contains.text',
				`Email is not valid, please use a valid email (user@domain)`
			);
		});
	});

	describe('should show error when the password field fails validation', () => {
		it('should show error when the password field is empty', () => {
			cy.get('[name="password"]').focus().blur();
			cy.get('[name="password"] + .error').should(
				'contains.text',
				`Password is required`
			);
		});

		it('should show error when the password field is less than 8 characters', () => {
			cy.get('[name="password"]').type('Short');
			cy.get('[name="password"] + .error').should(
				'contains.text',
				`Password should be a minimum of eight characters`
			);
		});

		it('should show error when the password field is not mix of uppercase and lowercase characters', () => {
			cy.get('[name="password"]').type('alllowercase');
			cy.get('[name="password"] + .error').should(
				'contains.text',
				`Password should contain lower and uppercase letters`
			);
		});

		it('should show error when the password field contains first or last name', () => {
			cy.get('[name="firstName"]').type(SignUpData.firstName);
			cy.get('[name="password"]').type(SignUpData.firstName);
			cy.get('[name="password"] + .error').should(
				'contains.text',
				`Password should not contain the user's first or last name`
			);
		});
	});

	describe('Submit button Behavior', () => {
		it('should be disabled by default', () => {
			cy.get('#signUpFormSubmitButton').should('be.disabled');
		});

		it('should be disabled when form is invalid', () => {
			cy.get('[name="firstName"]').type(SignUpData.firstName);
			cy.get('[name="lastName"]').type(SignUpData.lastName);
			cy.get('[name="email"]').type(SignUpData.email);
			cy.get('[name="password"]').type(SignUpData.firstName);

			cy.get('#signUpFormSubmitButton').should('be.disabled');
		});

		it('should be enabled only when form is valid', () => {
			cy.get('[name="firstName"]').type(SignUpData.firstName);
			cy.get('[name="lastName"]').type(SignUpData.lastName);
			cy.get('[name="email"]').type(SignUpData.email);
			cy.get('[name="password"]').type(SignUpData.password);

			cy.get('#signUpFormSubmitButton').should('be.enabled');
		});
	});
});
