<script lang="ts">
	import { UserCreate } from '$lib/features/users';
</script>

<div class="mx-auto max-w-xl px-4 py-8">
	<div class="mb-6">
		<a href="/" class="text-sm text-indigo-600 hover:underline">← Back to users</a>
		<h1 class="mt-3 text-2xl font-bold text-gray-900">New user</h1>
	</div>

	<UserCreate />
</div>
