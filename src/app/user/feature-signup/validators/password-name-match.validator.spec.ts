import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { passwordNameMatchValidator } from './password-name-match.validator';

describe(passwordNameMatchValidator.name, () => {
	let validatorFn: ValidatorFn;

	beforeEach(() => {
		validatorFn = passwordNameMatchValidator();
	});

	it('returns { passwordnamematch: true } if password matches first name', () => {
		const control = new FormGroup({
			firstName: new FormControl('firstName'),
			lastName: new FormControl('lastName'),
			password: new FormControl('firstName'),
		});

		expect(validatorFn(control)).toEqual({ passwordnamematch: true });
	});

	it('returns { passwordnamematch: true } if password matches first name partially', () => {
		const control = new FormGroup({
			firstName: new FormControl('firstName'),
			lastName: new FormControl('lastName'),
			password: new FormControl('firstName123'),
		});

		expect(validatorFn(control)).toEqual({ passwordnamematch: true });
	});

	it('returns { passwordnamematch: true } if password matches last name', () => {
		const control = new FormGroup({
			firstName: new FormControl('firstName'),
			lastName: new FormControl('lastName'),
			password: new FormControl('lastName'),
		});

		expect(validatorFn(control)).toEqual({ passwordnamematch: true });
	});

	it('returns { passwordnamematch: true } if password matches last name partially', () => {
		const control = new FormGroup({
			firstName: new FormControl('firstName'),
			lastName: new FormControl('lastName'),
			password: new FormControl('lastName123'),
		});

		expect(validatorFn(control)).toEqual({ passwordnamematch: true });
	});

	it('returns null first or last name are empty', () => {
		const control = new FormGroup({
			firstName: new FormControl(''),
			lastName: new FormControl(''),
			password: new FormControl('Password'),
		});

		expect(validatorFn(control)).toBeNull();
	});

	it('returns null only if password does not match first and last name', () => {
		const control = new FormGroup({
			firstName: new FormControl('firstName'),
			lastName: new FormControl('lastName'),
			password: new FormControl('Password'),
		});

		expect(validatorFn(control)).toBeNull();
	});
});
