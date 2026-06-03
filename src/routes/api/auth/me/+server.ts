import { error, json } from '@sveltejs/kit';
import { store } from '../../users/_mock.js';

export async function GET({ request }) {
	const auth = request.headers.get('Authorization');
	if (!auth?.startsWith('Bearer mock-token-')) {
		throw error(401, { message: 'Unauthorized' });
	}

	const userId = auth.slice('Bearer mock-token-'.length);
	const user = store.get(userId);
	if (!user) {
		throw error(401, { message: 'Invalid token' });
	}

	return json({
		id: user.id,
		name: user.name,
		username: user.username,
		user_type: user.user_type
	});
}
