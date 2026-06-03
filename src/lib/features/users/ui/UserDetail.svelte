<script lang="ts">
	import { goto } from '$app/navigation';
	import { cn, formatBool, formatDate } from '$lib/shared/lib';
	import { createUserDetailQuery } from '../api';
	import { UserDetailModel } from '../model/UserDetail.svelte';
	import UserForm from './UserForm.svelte';
	import UserDeleteButton from './UserDeleteButton.svelte';

	type Props = {
		userId: string;
	};

	let { userId }: Props = $props();

	const user = $derived(createUserDetailQuery(userId));
	const model = new UserDetailModel();
</script>

<div class="mx-auto max-w-3xl px-4 py-8">
	<div class="mb-6">
		<a href="/" class="text-sm text-indigo-600 hover:underline">← Back to users</a>
	</div>

	{#if user.isLoading}
		<div class="space-y-3">
			<div class="h-6 w-48 animate-pulse rounded bg-gray-100"></div>
			<div class="h-4 w-64 animate-pulse rounded bg-gray-100"></div>
			<div class="mt-4 h-40 animate-pulse rounded-lg bg-gray-100"></div>
		</div>
	{:else if user.isError}
		<p class="text-sm text-red-600">Failed to load user: {user.error.message}</p>
	{:else if user.data}
		{@const userData = user.data}

		<!-- Header -->
		<div class="mb-6 flex items-start justify-between">
			<div>
				<h1 class="text-2xl font-bold text-gray-900">{userData.name}</h1>
				<p class="mt-1 text-sm text-gray-500">@{userData.username}</p>
			</div>
			<div class="flex items-center gap-2">
				<span
					class={cn(
						'rounded-full px-2.5 py-1 text-xs font-medium',
						userData.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
					)}
				>
					{userData.isActive ? 'Active' : 'Inactive'}
				</span>
				{#if model.mode === 'view'}
					<button
						onclick={() => model.setMode('edit')}
						class="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
					>
						Edit
					</button>
					<UserDeleteButton {userId} onSuccess={() => goto('/')} />
				{:else}
					<span class="text-sm text-gray-400">Editing…</span>
				{/if}
			</div>
		</div>

		{#if model.mode === 'edit'}
			<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<UserForm
					user={userData}
					onSuccess={() => model.setMode('view')}
					onCancel={() => model.setMode('view')}
				/>
			</div>
		{:else}
			<!-- Account -->
			<section class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<h2 class="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Account</h2>
				<dl class="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
					<div>
						<dt class="text-xs font-medium text-gray-500">ID</dt>
						<dd class="mt-1 font-mono text-xs text-gray-700">{userData.id}</dd>
					</div>
					<div>
						<dt class="text-xs font-medium text-gray-500">User type</dt>
						<dd class="mt-1 text-sm text-gray-900">{userData.userType || '—'}</dd>
					</div>
					<div>
						<dt class="text-xs font-medium text-gray-500">Full name</dt>
						<dd class="mt-1 text-sm text-gray-900">{userData.name || '—'}</dd>
					</div>
					<div>
						<dt class="text-xs font-medium text-gray-500">Public name</dt>
						<dd class="mt-1 text-sm text-gray-900">{userData.publicName || '—'}</dd>
					</div>
					<div>
						<dt class="text-xs font-medium text-gray-500">Username</dt>
						<dd class="mt-1 text-sm text-gray-900">@{userData.username}</dd>
					</div>
					<div>
						<dt class="text-xs font-medium text-gray-500">Last login</dt>
						<dd class="mt-1 text-sm text-gray-900">{formatDate(userData.lastLogin)}</dd>
					</div>
				</dl>
				{#if userData.description}
					<div class="mt-4 border-t border-gray-100 pt-4">
						<dt class="text-xs font-medium text-gray-500">Description</dt>
						<dd class="mt-1 whitespace-pre-line text-sm text-gray-900">{userData.description}</dd>
					</div>
				{/if}
			</section>

			<!-- Profile -->
			<section class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<h2 class="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Profile</h2>
				<dl class="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
					<div>
						<dt class="text-xs font-medium text-gray-500">Age</dt>
						<dd class="mt-1 text-sm text-gray-900">{userData.age}</dd>
					</div>
					<div>
						<dt class="text-xs font-medium text-gray-500">Initial age</dt>
						<dd class="mt-1 text-sm text-gray-900">{userData.initialAge}</dd>
					</div>
				</dl>
			</section>

			<!-- Financial -->
			<section class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<h2 class="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Financial</h2>
				<dl class="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
					<div>
						<dt class="text-xs font-medium text-gray-500">Rate</dt>
						<dd class="mt-1 text-sm text-gray-900">{userData.rate}</dd>
					</div>
					<div>
						<dt class="text-xs font-medium text-gray-500">Last rate</dt>
						<dd class="mt-1 text-sm text-gray-900">{userData.lastRate}</dd>
					</div>
					<div>
						<dt class="text-xs font-medium text-gray-500">Balance</dt>
						<dd class="mt-1 text-sm text-gray-900">{userData.balance}</dd>
					</div>
					<div>
						<dt class="text-xs font-medium text-gray-500">Lock balance</dt>
						<dd class="mt-1 text-sm text-gray-900">{userData.lockBalance}</dd>
					</div>
				</dl>
			</section>

			<!-- Status -->
			<section class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<h2 class="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Status</h2>
				<dl class="grid grid-cols-2 gap-x-8 gap-y-4">
					<div>
						<dt class="text-xs font-medium text-gray-500">Active</dt>
						<dd class="mt-1">
							<span
								class={cn(
									'inline-flex rounded-full px-2 py-0.5 text-xs font-medium',
									userData.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
								)}
							>
								{formatBool(userData.isActive)}
							</span>
						</dd>
					</div>
					<div>
						<dt class="text-xs font-medium text-gray-500">Read message</dt>
						<dd class="mt-1">
							<span
								class={cn(
									'inline-flex rounded-full px-2 py-0.5 text-xs font-medium',
									userData.readMessage ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
								)}
							>
								{formatBool(userData.readMessage)}
							</span>
						</dd>
					</div>
				</dl>
			</section>
		{/if}
	{/if}
</div>
