<script lang="ts">
	import { cn } from '$lib/shared/lib';
	import type { User } from '../model/types';

	type Props = {
		user: User;
	};

	let { user }: Props = $props();
</script>

<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
	<div class="flex items-start justify-between gap-4">
		<div class="min-w-0 flex-1">
			<div class="flex items-center gap-2">
				<p class="truncate text-sm font-semibold text-gray-900">{user.name}</p>
				{#if user.publicName && user.publicName !== user.name}
					<span class="truncate text-sm text-gray-400">"{user.publicName}"</span>
				{/if}
			</div>
			<p class="mt-0.5 text-sm text-gray-500">@{user.username}</p>
			{#if user.userType}
				<p class="mt-1 text-xs text-gray-400">{user.userType}</p>
			{/if}
		</div>
		<div class="flex shrink-0 flex-col items-end gap-1.5">
			<span
				class={cn(
					'rounded-full px-2 py-0.5 text-xs font-medium',
					user.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
				)}
			>
				{user.isActive ? 'Active' : 'Inactive'}
			</span>
			{#if user.rate !== undefined}
				<span class="text-xs text-gray-400">rate: {user.rate}</span>
			{/if}
		</div>
	</div>
</div>
