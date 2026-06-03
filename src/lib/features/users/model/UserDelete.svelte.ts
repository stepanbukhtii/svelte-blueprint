import { createDeleteUserMutation } from '../api';

export class UserDeleteModel {
	confirming = $state(false);
	isPending = $state(false);
	isError = $state(false);
	errorMessage = $state<string | undefined>();

	private mutation = createDeleteUserMutation();
	private readonly userId: string;

	constructor(userId: string) {
		this.userId = userId;

		$effect(() => {
			this.isPending = this.mutation.isPending;
			this.isError = this.mutation.isError;
			this.errorMessage = this.mutation.error?.message;
		});
	}

	async handleDelete(onSuccess?: () => void) {
		await this.mutation.mutateAsync(this.userId);
		onSuccess?.();
	}
}
