export interface LoginRequest {
	username: string;
	password: string;
}

export interface LoginResponse {
	access_token: string;
}

export interface ProfileResponse {
	id: string;
	name: string;
	username: string;
	user_type: string;
}
