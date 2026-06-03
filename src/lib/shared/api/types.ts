export type ApiResponse<T> = {
	status: string;
	error?: string;
	data: T;
	meta?: MetaPages;
};

export type MetaPages = {
	pages: number;
};

export type PaginationParams = {
	page?: number;
	perPage?: number;
};

export class ApiError extends Error {
	public status: number;

	constructor(status: number, message: string) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
	}
}
