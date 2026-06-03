<script lang="ts">
	import { cn } from '$lib/shared/lib';
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		class?: string;
		onclick?: () => void;
		children?: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		type = 'button',
		disabled = false,
		class: className = '',
		onclick,
		children
	}: Props = $props();

	const variants = {
		primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500',
		secondary: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
		danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
		ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
	};

	const sizes = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base'
	};
</script>

<button
	{type}
	{disabled}
	{onclick}
	class={cn(
		'inline-flex items-center justify-center rounded-md font-medium transition-colors',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
		'disabled:pointer-events-none disabled:opacity-50',
		variants[variant],
		sizes[size],
		className
	)}
>
	{@render children?.()}
</button>
