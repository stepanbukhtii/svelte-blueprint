import { error, json } from '@sveltejs/kit';
import { store } from '../../users/_mock.js';

export async function POST({ request }) {
	const body = await request.json();
	const { username, password } = body as { username: string; password: string };

	const user = [...store.values()].find((u) => u.username === username);

	if (!user || password !== 'password') {
		throw error(401, { message: 'Invalid username or password' });
	}

	return json({ access_token: `mock-token-${user.id}` });
}
