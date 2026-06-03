<script lang="ts">
	import type { Snippet } from 'svelte';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	let { children }: { children: Snippet } = $props();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60,
				retry: 1
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	{@render children()}
</QueryClientProvider>
