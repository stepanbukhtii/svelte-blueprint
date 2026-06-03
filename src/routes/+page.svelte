<script lang="ts">
	import { UsersList } from '$lib/features/users';
</script>

<div class="mx-auto max-w-3xl px-4 py-8">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">Users</h1>
		<a
			href="/users/new"
			class="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
		>
			Add user
		</a>
	</div>
	<UsersList />
</div>
