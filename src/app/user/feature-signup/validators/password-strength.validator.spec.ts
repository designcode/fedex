import { FormControl, ValidatorFn } from '@angular/forms';

import { passwordStrengthValidator } from './password-strength.validator';

describe(passwordStrengthValidator.name, () => {
	let validatorFn: ValidatorFn;

	beforeEach(() => {
		validatorFn = passwordStrengthValidator();
	});

	it('returns { strength: true } if password do not contain uppercase', () => {
		const control = new FormControl();
		control.setValue('all-lower-case');

		const result = validatorFn(control);

		expect(result).toEqual({ strength: true });
	});

	it('returns { strength: true } if password do not contain lowercase', () => {
		const control = new FormControl();
		control.setValue('ALL-UPPER-CASE');

		const result = validatorFn(control);

		expect(result).toEqual({ strength: true });
	});

	it('returns null only if password contain both uppercase and lowercase', () => {
		const control = new FormControl();
		control.setValue('UPPERlowerCaSe');

		const result = validatorFn(control);

		expect(result).toBeNull();
	});
});
