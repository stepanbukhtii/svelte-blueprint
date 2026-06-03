<script lang="ts">
	import { cn } from '$lib/shared/lib';

	interface Props {
		id?: string;
		name?: string;
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		disabled?: boolean;
		error?: string;
		class?: string;
	}

	let { id, name, value = $bindable(0), min, max, step, disabled = false, error, class: className = '' }: Props =
		$props();
</script>

<input
	type="number"
	{id}
	{name}
	bind:value
	{min}
	{max}
	{step}
	{disabled}
	class={cn(
		'block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm',
		'ring-1 ring-inset',
		'focus:outline-none focus:ring-2 focus:ring-inset',
		'disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm sm:leading-6',
		error
			? 'ring-red-400 focus:ring-red-500'
			: 'ring-gray-300 focus:ring-indigo-600',
		className
	)}
/>
