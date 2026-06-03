<script lang="ts">
	import { createUsersListQuery } from '../api';
	import UserCard from './UserCard.svelte';

	const usersQuery = createUsersListQuery();
</script>

{#if usersQuery.isLoading}
	<div class="space-y-3">
		{#each Array(3) as _}
			<div class="h-16 animate-pulse rounded-lg bg-gray-100"></div>
		{/each}
	</div>
{:else if usersQuery.isError}
	<p class="text-sm text-red-600">
		Failed to load users: {usersQuery.error.message}. Status code: {usersQuery.error.status}
	</p>
{:else if usersQuery.data?.length === 0}
	<p class="text-sm text-gray-500">
		No users yet. <a href="/users/new" class="text-indigo-600 underline">Add one</a>.
	</p>
{:else}
	<ul class="space-y-3">
		{#each usersQuery.data ?? [] as user (user.id)}
			<li>
				<a href="/users/{user.id}" class="block transition-opacity hover:opacity-80">
					<UserCard {user} />
				</a>
			</li>
		{/each}
	</ul>
{/if}
