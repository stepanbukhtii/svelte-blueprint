const apiUrl = import.meta.env.VITE_API_URL;

if (import.meta.env.PROD && !apiUrl) {
	throw new Error('VITE_API_URL is required in production');
}

export const env = {
	apiUrl: apiUrl ?? '/api',
	isDev: import.meta.env.DEV,
	isProd: import.meta.env.PROD
} as const;
