<script lang="ts">
	import { cn } from '$lib/shared/lib';

	interface Props {
		id?: string;
		name?: string;
		value?: string;
		placeholder?: string;
		rows?: number;
		required?: boolean;
		disabled?: boolean;
		error?: string;
		class?: string;
	}

	let {
		id,
		name,
		value = $bindable(''),
		placeholder = '',
		rows = 3,
		required = false,
		disabled = false,
		error,
		class: className = ''
	}: Props = $props();
</script>

<textarea
	{id}
	{name}
	bind:value
	{placeholder}
	{rows}
	{required}
	{disabled}
	class={cn(
		'block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm',
		'ring-1 ring-inset placeholder:text-gray-400',
		'focus:outline-none focus:ring-2 focus:ring-inset',
		'disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm sm:leading-6',
		error
			? 'ring-red-400 focus:ring-red-500'
			: 'ring-gray-300 focus:ring-indigo-600',
		className
	)}
></textarea>
