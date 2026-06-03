<script lang="ts">
	import { goto } from '$app/navigation';
	import { untrack } from 'svelte';
	import { Button, Input, Label } from '$lib/shared/ui';
	import { LoginFormModel } from '../model/LoginForm.svelte';

	const form = untrack(() => new LoginFormModel());

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		form.handleSubmit(() => goto('/'));
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50">
	<div class="w-full max-w-sm">
		<div class="rounded-xl bg-white px-8 py-10 shadow-sm ring-1 ring-gray-200">
			<div class="mb-8 text-center">
				<h1 class="text-2xl font-bold text-gray-900">Sign in</h1>
				<p class="mt-1 text-sm text-gray-500">Blueprint App</p>
			</div>

			<form onsubmit={handleSubmit} class="space-y-5">
				<div>
					<Label for="username">Username</Label>
					<Input
						id="username"
						name="username"
						bind:value={form.username}
						placeholder="alice"
						autocomplete="username"
						disabled={form.isPending}
						class="mt-1"
					/>
					{#if form.fieldErrors.username}
						<p class="mt-1 text-sm text-red-600">{form.fieldErrors.username}</p>
					{/if}
				</div>

				<div>
					<Label for="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						bind:value={form.password}
						placeholder="••••••••"
						autocomplete="current-password"
						disabled={form.isPending}
						class="mt-1"
					/>
					{#if form.fieldErrors.password}
						<p class="mt-1 text-sm text-red-600">{form.fieldErrors.password}</p>
					{/if}
				</div>

				{#if form.error}
					<p class="text-sm text-red-600">{form.error}</p>
				{/if}

				<Button type="submit" class="w-full" disabled={form.isPending}>
					{form.isPending ? 'Signing in…' : 'Sign in'}
				</Button>
			</form>
		</div>
	</div>
</div>
