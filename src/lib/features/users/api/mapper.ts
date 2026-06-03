import type { User } from '../model/types';
import type { CreateUser, UpdateUser, UserResponse } from './types';

export const mapUser = (user: UserResponse): User => ({
	id: user.id,
	name: user.name,
	username: user.username,
	password: user.password,
	publicName: user.public_name,
	description: user.description,
	userType: user.user_type,
	age: user.age,
	initialAge: user.initial_age,
	rate: user.rate,
	lastRate: user.last_rate,
	isActive: user.is_active,
	readMessage: user.read_message,
	balance: user.balance,
	lockBalance: user.lock_balance,
	lastLogin: user.last_login
});

export const mapUsers = (users: UserResponse[]): User[] => users.map(mapUser);

export const mapUpdateUser = (user: User): UpdateUser => ({
	id: user.id,
	name: user.name.trim(),
	username: user.username.trim(),
	...(user.password.trim() ? { password: user.password.trim() } : {}),
	public_name: user.publicName.trim(),
	description: user.description.trim(),
	user_type: user.userType.trim(),
	age: user.age,
	initial_age: user.initialAge,
	rate: user.rate,
	last_rate: user.lastRate,
	is_active: user.isActive,
	read_message: user.readMessage,
	balance: user.balance,
	lock_balance: user.lockBalance
});

export const mapCreateUser = (user: Omit<User, 'id'>): CreateUser => ({
	name: user.name.trim(),
	username: user.username.trim(),
	public_name: user.publicName.trim(),
	password: user.password.trim(),
	description: user.description.trim(),
	user_type: user.userType.trim(),
	age: user.age,
	initial_age: user.initialAge,
	rate: user.rate,
	last_rate: user.lastRate,
	is_active: user.isActive,
	read_message: user.readMessage,
	balance: user.balance,
	lock_balance: user.lockBalance
});
