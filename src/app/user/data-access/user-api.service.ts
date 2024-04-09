import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_HOST } from '@shared/tokens';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { SignUpRequest, ThumbnailEntity, UserEntity } from './api-types';

@Injectable({ providedIn: 'root' })
export class UserApiService {
	private readonly apiHost = inject(API_HOST);
	private readonly http = inject(HttpClient);

	getAvatar(id: number) {
		return this.http
			.get<ThumbnailEntity>(`${this.apiHost}/photoss/${id}`)
			.pipe(
				// Return an empty string if thumbnail API errors
				catchError(() => of({ thumbnailUrl: '' }))
			);
	}

	signUp(user: SignUpRequest): Observable<UserEntity> {
		return this.getAvatar(user.lastName.length).pipe(
			switchMap(({ thumbnailUrl }) =>
				this.http.post<UserEntity>(`${this.apiHost}/users`, {
					...user,
					thumbnailUrl,
				})
			)
		);
	}
}
