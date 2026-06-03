export type User = {
	id: string;
	name: string;
	username: string;
	password: string;
	publicName: string;
	description: string;
	userType: string;
	age: number;
	initialAge: number;
	rate: number;
	lastRate: number;
	isActive: boolean;
	readMessage: boolean;
	balance: number;
	lockBalance: number;
	lastLogin: string | null;
};

export const EmptyUser: User = {
	id: '',
	name: '',
	username: '',
	password: '',
	publicName: '',
	description: '',
	userType: '',
	age: 0,
	initialAge: 0,
	rate: 0,
	lastRate: 0,
	isActive: true,
	readMessage: false,
	balance: 0,
	lockBalance: 0,
	lastLogin: null
};
