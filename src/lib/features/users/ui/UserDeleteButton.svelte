<script lang="ts">
	import { untrack } from 'svelte';
	import { Button } from '$lib/shared/ui';
	import { UserDeleteModel } from '../model/UserDelete.svelte';

	type Props = {
		userId: string;
		onSuccess?: () => void;
	};

	let { userId, onSuccess }: Props = $props();

	const model = untrack(() => new UserDeleteModel(userId));
</script>

{#if model.confirming}
	<div class="flex items-center gap-2">
		<span class="text-sm text-gray-600">Are you sure?</span>
		<Button variant="danger" size="sm" disabled={model.isPending} onclick={() => model.handleDelete(onSuccess)}>
			{model.isPending ? 'Deleting…' : 'Yes, delete'}
		</Button>
		<Button variant="ghost" size="sm" onclick={() => (model.confirming = false)}>Cancel</Button>
	</div>
{:else}
	<Button variant="danger" size="sm" onclick={() => (model.confirming = true)}>Delete</Button>
{/if}

{#if model.isError}
	<p class="mt-1 text-sm text-red-600">{model.errorMessage}</p>
{/if}
