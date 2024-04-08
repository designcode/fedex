import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_HOST } from '@shared/tokens';
import { Observable } from 'rxjs';
import { SignUpRequest, UserEntity } from './api-types';

@Injectable({ providedIn: 'root' })
export class UserApiService {
	private readonly apiHost = inject(API_HOST);
	private readonly http = inject(HttpClient);

	getAvatar() {}

	signUp(user: SignUpRequest): Observable<UserEntity> {
		return this.http.post<UserEntity>(`${this.apiHost}/users`, user);
	}
}
