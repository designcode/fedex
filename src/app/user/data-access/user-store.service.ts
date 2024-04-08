import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { SignUpRequest, UserEntity } from './api-types';
import { Store, StoreState, Status } from '@shared/store';
import { catchError, filter, map, of } from 'rxjs';

export interface UserState extends StoreState {
	user: UserEntity | undefined;
}

const initialState: UserState = {
	user: undefined,
	status: Status.IDLE,
};

@Injectable({
	providedIn: 'root',
})
export class UserStoreService extends Store<UserState> {
	private readonly userApiService = inject(UserApiService);

	constructor() {
		super(initialState);
	}

	readonly fullName$ = this.getState().pipe(
		filter(({ user }) => user !== undefined),
		map(state => `${state.user?.firstName} ${state.user?.lastName}`)
	);

	readonly vm$ = this.getState().pipe(
		map(state => ({
			fullName: `${state.user?.firstName ?? ''} ${state.user?.lastName ?? ''}`,
			isPending: state.status === Status.PENDING,
			signUpSuccess: state.status === Status.SUCCESS,
		}))
	);

	updateUser(signUpRequest: SignUpRequest) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = signUpRequest;

		this.setState({ user });
	}

	signUp(signUpRequest: SignUpRequest) {
		this.setState({ status: Status.PENDING });

		return this.userApiService.signUp(signUpRequest).pipe(
			map(user => this.setState({ status: Status.SUCCESS, user })),
			catchError(error => {
				this.setState({ status: Status.ERROR, error });

				return of(error);
			})
		);
	}
}
