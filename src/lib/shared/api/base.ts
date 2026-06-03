import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import axios, { type AxiosError } from 'axios';
import { env } from '../config/env';
import { ApiError } from './types';

export const httpClient = axios.create({
	baseURL: env.apiUrl,
	timeout: 30_000,
	withCredentials: true,
	headers: { 'Content-Type': 'application/json' }
});

httpClient.interceptors.request.use((config) => {
	if (browser) {
		const token = localStorage.getItem('access_token');
		if (token) config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

httpClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError<{ error?: string }>) => {
		if (error.response?.status === 401 && browser) {
			localStorage.removeItem('access_token');
			goto('/login');
		}

		const status = error.response?.status ?? 0;
		const message = error.response?.data?.error ?? error.message;
		return Promise.reject(new ApiError(status, message));
	}
);
