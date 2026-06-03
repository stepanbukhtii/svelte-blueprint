import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { type MockUser, store } from './_mock';

export const GET: RequestHandler = () => {
	// return json({ status: 'error', error: 'not found users' }, { status: 404 });
	return json({ status: 'success', data: [...store.values()] });
};

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const id = crypto.randomUUID();

	const user: MockUser = {
		public_name: '',
		description: '',
		user_type: '',
		age: 0,
		initial_age: 0,
		rate: 0,
		last_rate: 0,
		is_active: true,
		read_message: false,
		balance: 0,
		lock_balance: 0,
		last_login: null,
		...body,
		id
	};

	store.set(id, user);

	return json({ status: 'success', data: user }, { status: 201 });
};
