import { AsyncPipe, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
} from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { SignUpRequest, UserStoreService } from '@user/data-access';
import { passwordStrengthValidator } from '../validators/password-strength.validator';
import { passwordNameMatchValidator } from '../validators/password-name-match.validator';

@Component({
	selector: 'app-fedex-sign-up',
	standalone: true,
	templateUrl: './sign-up.component.html',
	styleUrl: './sign-up.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AsyncPipe, NgIf, ReactiveFormsModule],
})
export class SignUpComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly formBuilder = inject(FormBuilder);
	private readonly userStore = inject(UserStoreService);

	readonly signUpForm = this.formBuilder.nonNullable.group(
		{
			firstName: ['', [Validators.required]],
			lastName: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(8),
					passwordStrengthValidator(),
				],
			],
			thumbnailUrl: [''],
		},
		{
			validators: passwordNameMatchValidator(),
		}
	);

	readonly firstName = this.signUpForm.controls.firstName;
	readonly lastName = this.signUpForm.controls.lastName;
	readonly email = this.signUpForm.controls.email;
	readonly password = this.signUpForm.controls.password;

	readonly vm$ = this.userStore.vm$;

	constructor() {
		this.signUpForm.valueChanges
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() =>
				this.userStore.updateUser(this.signUpForm.getRawValue())
			);
	}

	submitSignUpForm(event: Event) {
		event.preventDefault();

		const signUpData: SignUpRequest = {
			...this.signUpForm.getRawValue(),
			thumbnailUrl: '',
		};

		this.userStore
			.signUp(signUpData)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(console.log);
	}

	hasError(control: FormControl | FormGroup, error: string) {
		return (
			control?.invalid &&
			(control?.dirty || control?.touched) &&
			control.errors?.[error]
		);
	}
}
