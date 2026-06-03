import { ApiError } from '$lib/shared/api';
import { createLoginMutation } from '../api';
import { useAuth } from './AuthSession.svelte';
import { loginSchema } from './schemas';

export class LoginFormModel {
	username = $state('');
	password = $state('');
	error = $state<string | null>(null);
	fieldErrors = $state<Partial<Record<'username' | 'password', string>>>({});
	isPending = $state(false);

	private mutation = createLoginMutation();
	private authSession = useAuth();

	constructor() {
		$effect(() => {
			this.isPending = this.mutation.isPending;
		});
	}

	async handleSubmit(onSuccess: () => void) {
		this.error = null;
		this.fieldErrors = {};

		const parsed = loginSchema.safeParse({ username: this.username, password: this.password });
		if (!parsed.success) {
			const errors: Partial<Record<'username' | 'password', string>> = {};
			for (const issue of parsed.error.issues) {
				const field = issue.path[0] as 'username' | 'password';
				errors[field] = issue.message;
			}
			this.fieldErrors = errors;
			return;
		}

		try {
			const result = await this.mutation.mutateAsync(parsed.data);
			this.authSession.login(result.access_token);
			onSuccess();
		} catch (err) {
			if (err instanceof ApiError && err.status === 401) {
				this.error = 'Invalid username or password';
			} else {
				this.error = 'An error occurred. Please try again.';
			}
		}
	}
}
