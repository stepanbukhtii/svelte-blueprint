import type { PaginationParams } from '$lib/shared/api';

export type UserResponse = {
	id: string;
	name: string;
	username: string;
	password: string;
	public_name: string;
	description: string;
	user_type: string;
	age: number;
	initial_age: number;
	rate: number;
	last_rate: number;
	is_active: boolean;
	read_message: boolean;
	balance: number;
	lock_balance: number;
	last_login: string | null;
};

export type CreateUser = {
	name: string;
	username: string;
	password: string;
	public_name?: string;
	description?: string;
	user_type?: string;
	age?: number;
	initial_age?: number;
	rate?: number;
	last_rate?: number;
	is_active?: boolean;
	read_message?: boolean;
	balance?: number;
	lock_balance?: number;
};

export type UpdateUser = {
	id: string;
	name?: string;
	username?: string;
	password?: string;
	public_name?: string;
	description?: string;
	user_type?: string;
	age?: number;
	initial_age?: number;
	rate?: number;
	last_rate?: number;
	is_active?: boolean;
	read_message?: boolean;
	balance?: number;
	lock_balance?: number;
};

export type GetUsersParams = PaginationParams & {
	name?: string;
};
