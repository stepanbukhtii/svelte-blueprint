<script lang="ts">
	import { cn } from '$lib/shared/lib';
	import type { Snippet } from 'svelte';

	interface Props {
		for?: string;
		class?: string;
		children?: Snippet;
	}

	let { for: htmlFor, class: className = '', children }: Props = $props();
</script>

<label for={htmlFor} class={cn('block text-sm font-medium leading-6 text-gray-900', className)}>
	{@render children?.()}
</label>
