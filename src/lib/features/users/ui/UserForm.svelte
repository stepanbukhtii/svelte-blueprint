<script lang="ts">
	import { untrack } from 'svelte';
	import { Button, Input, Label, NumberInput, Textarea } from '$lib/shared/ui';
	import { UserFormModel } from '../model/UserForm.svelte';
	import type { User } from '../model/types';

	type Props = {
		user?: User;
		onSuccess?: (userId?: string) => void;
		onCancel?: () => void;
	};

	let { user, onSuccess, onCancel }: Props = $props();

	const model = untrack(() => new UserFormModel(user));
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		model.handleSubmit(onSuccess);
	}}
	class="space-y-6"
>
	<!-- Account -->
	<div class="space-y-4">
		<h3 class="text-xs font-semibold uppercase tracking-wide text-gray-400">Account</h3>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<Label for="name">
					Full name {#if !user}<span class="text-red-500">*</span>{/if}
				</Label>
				<div class="mt-1">
					<Input
						id="name"
						name="name"
						bind:value={model.user.name}
						placeholder={user ? '' : 'Jane Doe'}
						error={model.fieldErrors.name}
					/>
				</div>
				{#if model.fieldErrors.name}
					<p class="mt-1 text-xs text-red-500">{model.fieldErrors.name}</p>
				{/if}
			</div>
			<div>
				<Label for="username">
					Username {#if !user}<span class="text-red-500">*</span>{/if}
				</Label>
				<div class="mt-1">
					<Input
						id="username"
						name="username"
						bind:value={model.user.username}
						placeholder={user ? '' : 'janedoe'}
						error={model.fieldErrors.username}
					/>
				</div>
				{#if model.fieldErrors.username}
					<p class="mt-1 text-xs text-red-500">{model.fieldErrors.username}</p>
				{/if}
			</div>
		</div>
		<div>
			<Label for="password">
				{user ? 'New password' : 'Password'}
				{#if !user}<span class="text-red-500">*</span>{/if}
			</Label>
			<div class="mt-1">
				<Input
					id="password"
					name="password"
					type="password"
					bind:value={model.user.password}
					error={model.fieldErrors.password}
				/>
			</div>
			{#if model.fieldErrors.password}
				<p class="mt-1 text-xs text-red-500">{model.fieldErrors.password}</p>
			{:else if user}
				<p class="mt-1 text-xs text-gray-400">Leave blank to keep the current password.</p>
			{/if}
		</div>
	</div>

	<!-- Profile -->
	<div class="space-y-4 border-t border-gray-100 pt-4">
		<h3 class="text-xs font-semibold uppercase tracking-wide text-gray-400">Profile</h3>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<Label for="public_name">Public name</Label>
				<div class="mt-1">
					<Input id="public_name" name="public_name" bind:value={model.user.publicName} />
				</div>
			</div>
			<div>
				<Label for="user_type">User type</Label>
				<div class="mt-1">
					<Input id="user_type" name="user_type" bind:value={model.user.userType} />
				</div>
			</div>
		</div>
		<div>
			<Label for="description">Description</Label>
			<div class="mt-1">
				<Textarea id="description" name="description" bind:value={model.user.description} rows={3} />
			</div>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<Label for="age">Age</Label>
				<div class="mt-1">
					<NumberInput id="age" name="age" min={0} bind:value={model.user.age} error={model.fieldErrors.age} />
				</div>
				{#if model.fieldErrors.age}
					<p class="mt-1 text-xs text-red-500">{model.fieldErrors.age}</p>
				{/if}
			</div>
			<div>
				<Label for="initial_age">Initial age</Label>
				<div class="mt-1">
					<NumberInput
						id="initial_age"
						name="initial_age"
						min={0}
						bind:value={model.user.initialAge}
						error={model.fieldErrors.initialAge}
					/>
				</div>
				{#if model.fieldErrors.initialAge}
					<p class="mt-1 text-xs text-red-500">{model.fieldErrors.initialAge}</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- Financial -->
	<div class="space-y-4 border-t border-gray-100 pt-4">
		<h3 class="text-xs font-semibold uppercase tracking-wide text-gray-400">Financial</h3>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<Label for="rate">Rate</Label>
				<div class="mt-1">
					<NumberInput
						id="rate"
						name="rate"
						step={0.01}
						bind:value={model.user.rate}
						error={model.fieldErrors.rate}
					/>
				</div>
				{#if model.fieldErrors.rate}
					<p class="mt-1 text-xs text-red-500">{model.fieldErrors.rate}</p>
				{/if}
			</div>
			<div>
				<Label for="last_rate">Last rate</Label>
				<div class="mt-1">
					<NumberInput
						id="last_rate"
						name="last_rate"
						step={0.01}
						bind:value={model.user.lastRate}
						error={model.fieldErrors.lastRate}
					/>
				</div>
				{#if model.fieldErrors.lastRate}
					<p class="mt-1 text-xs text-red-500">{model.fieldErrors.lastRate}</p>
				{/if}
			</div>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<Label for="balance">Balance</Label>
				<div class="mt-1">
					<NumberInput id="balance" name="balance" step={0.01} bind:value={model.user.balance} />
				</div>
			</div>
			<div>
				<Label for="lock_balance">Lock balance</Label>
				<div class="mt-1">
					<NumberInput
						id="lock_balance"
						name="lock_balance"
						step={0.01}
						bind:value={model.user.lockBalance}
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- Status -->
	<div class="space-y-3 border-t border-gray-100 pt-4">
		<h3 class="text-xs font-semibold uppercase tracking-wide text-gray-400">Status</h3>
		<div class="flex items-center gap-2">
			<input
				id="is_active"
				name="is_active"
				type="checkbox"
				bind:checked={model.user.isActive}
				class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
			/>
			<label for="is_active" class="text-sm text-gray-700">Active</label>
		</div>
		<div class="flex items-center gap-2">
			<input
				id="read_message"
				name="read_message"
				type="checkbox"
				bind:checked={model.user.readMessage}
				class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
			/>
			<label for="read_message" class="text-sm text-gray-700">Read message</label>
		</div>
	</div>

	{#if model.isError}
		<p class="text-sm text-red-600">{model.errorMessage}</p>
	{/if}

	<div class="flex gap-3 border-t border-gray-100 pt-4">
		<Button type="submit" disabled={model.isPending}>
			{model.isPending ? (user ? 'Saving…' : 'Creating…') : user ? 'Save changes' : 'Create user'}
		</Button>
		{#if onCancel}
			<Button type="button" variant="secondary" onclick={onCancel}>Cancel</Button>
		{/if}
	</div>
</form>
