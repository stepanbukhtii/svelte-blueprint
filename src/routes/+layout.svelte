<script lang="ts">
	import '../app.css';
	import { AuthGuard, initAuth } from '$lib/features/auth';
	import { QueryProvider } from '$lib/shared/provider';

	let { children } = $props();

	initAuth();
</script>

<QueryProvider>
	<AuthGuard>
		{@render children()}
	</AuthGuard>
</QueryProvider>
