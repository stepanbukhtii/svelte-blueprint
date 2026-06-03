<script lang="ts">
	import { UserDetail } from '$lib/features/users';

	let { data } = $props();
</script>

<UserDetail userId={data.id} />
