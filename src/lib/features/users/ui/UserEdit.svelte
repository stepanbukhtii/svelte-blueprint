<script lang="ts">
	import { goto } from '$app/navigation';
	import { createUserDetailQuery as createUserQuery } from '../api';
	import UserForm from './UserForm.svelte';

	type Props = {
		userId: string;
	};

	let { userId }: Props = $props();

	const user = $derived(createUserQuery(userId));
</script>

{#if user.isLoading}
	<div class="space-y-3">
		<div class="h-10 animate-pulse rounded bg-gray-100"></div>
		<div class="h-10 animate-pulse rounded bg-gray-100"></div>
	</div>
{:else if user.isError}
	<p class="text-sm text-red-600">Failed to load user: {user.error.message}</p>
{:else if user.data}
	<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
		<UserForm
			user={user.data}
			onSuccess={() => goto(`/users/${userId}`)}
			onCancel={() => goto(`/users/${userId}`)}
		/>
	</div>
{/if}
