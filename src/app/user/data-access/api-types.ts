export interface UserEntity {
	firstName: string;
	lastName: string;
	email: string;
	thumbnailUrl?: string;
}

export interface ThumbnailEntity {
	thumbnailUrl: string;
}

export interface SignUpRequest extends UserEntity {
	password: string;
}
