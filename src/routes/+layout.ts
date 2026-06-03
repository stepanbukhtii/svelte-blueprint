import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';

export const prerender = false;
export const ssr = false;

export function load({ url }) {
	if (!browser) return;

	const token = localStorage.getItem('access_token');
	const isLoginPage = url.pathname === '/login';

	if (!token && !isLoginPage) {
		redirect(302, '/login');
	}

	if (token && isLoginPage) {
		redirect(302, '/');
	}
}
