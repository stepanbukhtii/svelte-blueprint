<script lang="ts">
	import { goto } from '$app/navigation';
	import UserForm from './UserForm.svelte';
</script>

<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
	<UserForm onSuccess={(id) => goto(`/users/${id}`)} onCancel={() => goto('/')} />
</div>
