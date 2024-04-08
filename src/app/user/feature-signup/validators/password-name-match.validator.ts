import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordNameMatchValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const { firstName, lastName, password } = control.value;

		if (!password) {
			return null;
		}

		return password.toLowerCase().includes(firstName.toLowerCase()) ||
			password.toLowerCase().includes(lastName.toLowerCase())
			? { passwordnamematch: true }
			: null;
	};
}
