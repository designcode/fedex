import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value;

		if (!value) {
			return null;
		}

		const hasUpperCase = /[A-Z]+/.test(value);

		const hasLowerCase = /[a-z]+/.test(value);

		const passwordValid = hasUpperCase && hasLowerCase;

		return passwordValid ? null : { strength: true };
	};
}
