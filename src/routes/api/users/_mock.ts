export interface MockUser {
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
}

const seed: MockUser[] = [
	{
		id: 'a1b2c3d4-0001-0000-0000-000000000001',
		name: 'Alice Johnson',
		username: 'alice',
		password: '$2b$10$hashed_password_alice',
		public_name: 'Alice J.',
		description: 'Senior product manager with 8 years of experience in B2B SaaS.',
		user_type: 'admin',
		age: 32,
		initial_age: 24,
		rate: 4.8,
		last_rate: 4.6,
		is_active: true,
		read_message: true,
		balance: 25000.0,
		lock_balance: 5000.0,
		last_login: '2026-05-07T09:15:00Z'
	},
	{
		id: 'a1b2c3d4-0002-0000-0000-000000000002',
		name: 'Bob Smith',
		username: 'bobsmith',
		password: '$2b$10$hashed_password_bob',
		public_name: 'Bob',
		description: 'Full-stack developer. Loves TypeScript and Svelte.',
		user_type: 'user',
		age: 28,
		initial_age: 20,
		rate: 4.2,
		last_rate: 4.0,
		is_active: true,
		read_message: false,
		balance: 8750.5,
		lock_balance: 0,
		last_login: '2026-05-06T22:45:00Z'
	},
	{
		id: 'a1b2c3d4-0003-0000-0000-000000000003',
		name: 'Charlie Brown',
		username: 'charlie',
		password: '$2b$10$hashed_password_charlie',
		public_name: 'Charlie B.',
		description: 'Community moderator and content reviewer.',
		user_type: 'moderator',
		age: 35,
		initial_age: 30,
		rate: 3.9,
		last_rate: 4.1,
		is_active: true,
		read_message: true,
		balance: 3200.0,
		lock_balance: 200.0,
		last_login: '2026-05-07T08:00:00Z'
	},
	{
		id: 'a1b2c3d4-0004-0000-0000-000000000004',
		name: 'Diana Prince',
		username: 'diana',
		password: '$2b$10$hashed_password_diana',
		public_name: 'Diana',
		description: '',
		user_type: 'user',
		age: 41,
		initial_age: 35,
		rate: 2.5,
		last_rate: 3.0,
		is_active: false,
		read_message: false,
		balance: 120.0,
		lock_balance: 120.0,
		last_login: '2026-03-14T11:20:00Z'
	},
	{
		id: 'a1b2c3d4-0005-0000-0000-000000000005',
		name: 'Eve Williams',
		username: 'eve',
		password: '$2b$10$hashed_password_eve',
		public_name: 'Evelyn W.',
		description: 'Platform administrator and security auditor.',
		user_type: 'admin',
		age: 38,
		initial_age: 28,
		rate: 4.95,
		last_rate: 4.9,
		is_active: true,
		read_message: true,
		balance: 150000.0,
		lock_balance: 10000.0,
		last_login: '2026-05-07T10:55:00Z'
	}
];

// Module-level map — persists for the lifetime of the dev server process
export const store = new Map<string, MockUser>(seed.map((u) => [u.id, u]));
