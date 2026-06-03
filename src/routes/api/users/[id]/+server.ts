import { error, json } from '@sveltejs/kit';
import { store } from '../_mock';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ params }) => {
	const user = store.get(params.id);
	if (!user) throw error(404, 'User not found');
	return json({ data: user, status: 'success' });
};

export const PATCH: RequestHandler = async ({ params, request }) => {
	const user = store.get(params.id);
	if (!user) throw error(404, 'User not found');

	const body = await request.json();
	const updated = { ...user, ...body, id: params.id };
	store.set(params.id, updated);
	return json({ data: updated, status: 'success' });
};

export const DELETE: RequestHandler = ({ params }) => {
	if (!store.has(params.id)) throw error(404, 'User not found');
	store.delete(params.id);
	return new Response(null, { status: 204 });
};
