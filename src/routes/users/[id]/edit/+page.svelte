<script lang="ts">
	import { UserEdit } from '$lib/features/users';

	let { data } = $props();
</script>

<div class="mx-auto max-w-xl px-4 py-8">
	<div class="mb-6">
		<a href="/users/{data.id}" class="text-sm text-indigo-600 hover:underline">← Back to user</a>
		<h1 class="mt-3 text-2xl font-bold text-gray-900">Edit user</h1>
	</div>

	<UserEdit userId={data.id} />
</div>
