/* #region global */
export interface ApiDataResponse<T> {
	status?: number;
	message: string;
	data?: T;
	isSuccess?: boolean;
}
export interface ApiDataListResponse<T> {
	status?: number;
	message?: string;
	pageNumber: number;
	pageSize: number;
	totalItems: number;
	totalPages: number;
	data: T[];
	isSuccess?: boolean;
	sortBy: string;
	desc: boolean;
}

export type DefaultModelProperties = {
	creationDate: Date;
	isPublished: boolean;
};
/* #endregion */
