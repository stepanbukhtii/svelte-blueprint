import { browser } from '$app/environment';
import { getContext, setContext } from 'svelte';

const AUTH_KEY = Symbol('auth-session');

class AuthSession {
	token = $state<string | null>(null);

	constructor() {
		if (browser) {
			this.token = localStorage.getItem('access_token');
		}
	}

	get isAuthenticated() {
		return this.token !== null;
	}

	login(token: string) {
		localStorage.setItem('access_token', token);
		this.token = token;
	}

	logout() {
		localStorage.removeItem('access_token');
		this.token = null;
	}
}

export function initAuth() {
	return setContext(AUTH_KEY, new AuthSession());
}

export function useAuth() {
	return getContext<AuthSession>(AUTH_KEY);
}
