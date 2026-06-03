import { createCreateUserMutation, createEditUserMutation } from '../api';
import { createUserSchema, editUserSchema, type UserFormErrors } from './schemas';
import { EmptyUser, type User } from './types';

export class UserFormModel {
	user = $state<User>({ ...EmptyUser });

	isPending = $state(false);
	isError = $state(false);
	errorMessage = $state<string | undefined>();
	fieldErrors = $state<UserFormErrors>({});

	private readonly isEditing: boolean = false;
	private createMut = createCreateUserMutation();
	private editMut = createEditUserMutation();

	constructor(user?: User) {
		this.isEditing = !!user;

		if (user) {
			this.user = user;
		}

		$effect(() => {
			const mut = this.isEditing ? this.editMut : this.createMut;
			this.isPending = mut.isPending;
			this.isError = mut.isError;
			this.errorMessage = mut.error?.message;
		});
	}

	private validate(): boolean {
		const schema = this.isEditing ? editUserSchema : createUserSchema;
		const result = schema.safeParse(this.user);

		if (result.success) {
			this.fieldErrors = {};
			return true;
		}

		const errors: UserFormErrors = {};
		for (const issue of result.error.issues) {
			const field = issue.path[0] as string;
			if (!errors[field]) errors[field] = issue.message;
		}
		this.fieldErrors = errors;

		return false;
	}

	async handleSubmit(onSuccess?: (userId?: string) => void) {
		if (!this.validate()) return;

		if (this.isEditing) {
			await this.editMut.mutateAsync(this.user);
			onSuccess?.();
		} else {
			const result = await this.createMut.mutateAsync(this.user);
			onSuccess?.(result.data.id);
		}
	}
}
