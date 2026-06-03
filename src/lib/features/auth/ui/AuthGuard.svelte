<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import { Button } from '$lib/shared/ui';
	import { useAuth } from '../model/AuthSession.svelte';
	import { createProfileQuery } from '../api';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	const authSession = useAuth();
	const isLoginPage = $derived(page.url.pathname === '/login');

	const profileQuery = createProfileQuery(browser && authSession.isAuthenticated && page.url.pathname !== '/login');

	$effect(() => {
		if (!authSession.isAuthenticated && !isLoginPage) {
			goto('/login', { replaceState: true });
		}
	});

	const showContent = $derived(!browser || isLoginPage || (authSession.isAuthenticated && !profileQuery.isLoading));

	function logout() {
		authSession.logout();
		goto('/login');
	}
</script>

{#if showContent}
	{#if !isLoginPage}
		<header class="sticky top-0 z-50 border-b border-gray-200 bg-white">
			<div class="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
				<a href="/" class="text-sm font-semibold text-gray-900">Blueprint</a>
				<Button variant="ghost" size="sm" onclick={logout}>Log out</Button>
			</div>
		</header>
	{/if}
	{@render children()}
{/if}
