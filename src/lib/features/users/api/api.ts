import { ApiError, type ApiResponse, httpClient } from '$lib/shared/api';
import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
import type { User } from '../model/types';
import { mapCreateUser, mapUpdateUser, mapUser, mapUsers } from './mapper';
import type { GetUsersParams, UserResponse } from './types';

export const userKeys = {
	all: () => ['users'] as const,
	list: (params?: GetUsersParams) => ['users', 'list', params] as const,
	detail: (id: string) => ['users', 'detail', id] as const
};

export function createUsersListQuery(params?: GetUsersParams) {
	return createQuery<ApiResponse<UserResponse[]>, ApiError, User[]>(() => ({
		queryKey: userKeys.list(params),
		queryFn: () => httpClient.get<ApiResponse<UserResponse[]>>('/users', { params }).then((r) => r.data),
		staleTime: 30_000,
		select: (response) => mapUsers(response.data)
	}));
}

export function createUserDetailQuery(id: string) {
	return createQuery<ApiResponse<UserResponse>, ApiError, User>(() => ({
		queryKey: userKeys.detail(id),
		queryFn: () => httpClient.get<ApiResponse<UserResponse>>(`/users/${id}`).then((r) => r.data),
		staleTime: 60_000,
		select: (response) => mapUser(response.data)
	}));
}

export function createCreateUserMutation() {
	const queryClient = useQueryClient();

	return createMutation<ApiResponse<UserResponse>, ApiError, User>(() => ({
		mutationFn: (user) => {
			const body = mapCreateUser(user);
			return httpClient.post<ApiResponse<UserResponse>>('/users', body).then((r) => r.data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all() });
		}
	}));
}

export function createEditUserMutation() {
	const queryClient = useQueryClient();

	return createMutation<ApiResponse<UserResponse>, ApiError, User, User | unknown>(() => ({
		mutationFn: (user) => {
			const body = mapUpdateUser(user);
			return httpClient.patch<ApiResponse<UserResponse>>(`/users/${body.id}`, body).then((r) => r.data);
		},
		onMutate: async (user) => {
			const queryKey = userKeys.detail(user.id);
			await queryClient.cancelQueries({ queryKey: queryKey });
			const previous = queryClient.getQueryData<User>(queryKey);
			queryClient.setQueryData(queryKey, (old: User | undefined) => (old ? { ...old, ...user } : old));
			return previous;
		},
		onError: (_err, user, context) => {
			queryClient.setQueryData(userKeys.detail(user.id), context);
		},
		onSettled: (_data, _err, user) => {
			queryClient.invalidateQueries({ queryKey: userKeys.detail(user.id) });
			queryClient.invalidateQueries({ queryKey: userKeys.all() });
		}
	}));
}

export function createDeleteUserMutation() {
	const queryClient = useQueryClient();

	return createMutation<unknown, ApiError, string>(() => ({
		mutationFn: (id: string) => httpClient.delete(`/users/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all() });
		}
	}));
}
