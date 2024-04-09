import { AsyncPipe } from '@angular/common';
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
import { Status } from '@shared/store';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-fedex-sign-up',
	standalone: true,
	templateUrl: './sign-up.component.html',
	styleUrl: './sign-up.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AsyncPipe, ReactiveFormsModule],
})
export class SignUpComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly router = inject(Router);
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
		},
		{
			validators: passwordNameMatchValidator(),
		}
	);

	readonly firstName = this.signUpForm.controls.firstName;
	readonly lastName = this.signUpForm.controls.lastName;
	readonly email = this.signUpForm.controls.email;
	readonly password = this.signUpForm.controls.password;

	readonly vm$ = this.userStore.getState().pipe(
		map(state => ({
			fullName: `${state.user?.firstName ?? ''} ${state.user?.lastName ?? ''}`,
			isPending: state.status === Status.PENDING,
			signupFailed: state.status === Status.ERROR,
		}))
	);

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
			.subscribe(() => {
				this.router.navigate(['/']);
			});
	}

	hasError(control: FormControl | FormGroup, error: string) {
		return (
			control?.invalid &&
			(control?.dirty || control?.touched) &&
			control.errors?.[error]
		);
	}
}
