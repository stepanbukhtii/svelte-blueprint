import { ApiError, httpClient } from '$lib/shared/api';
import { createMutation, createQuery } from '@tanstack/svelte-query';
import type { AuthProfile } from '../model/types';
import { mapMeResponse } from './mapper';
import type { LoginRequest, LoginResponse, ProfileResponse } from './types';

export const authKeys = {
	me: () => ['auth', 'me'] as const
};

export function createLoginMutation() {
	return createMutation<LoginResponse, ApiError, LoginRequest>(() => ({
		mutationFn: async (login) => httpClient.post<LoginResponse>('/auth/login', login).then((r) => r.data)
	}));
}

export function createProfileQuery(enabled: boolean) {
	return createQuery<ProfileResponse, ApiError, AuthProfile>(() => ({
		queryKey: authKeys.me(),
		queryFn: async () => await httpClient.get<ProfileResponse>('/auth/me').then((r) => r.data),
		select: mapMeResponse,
		enabled: enabled,
		retry: false,
		staleTime: 5 * 60_000
	}));
}
