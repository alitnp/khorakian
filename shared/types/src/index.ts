/* #region global */
export interface ApiDataResponse<T> {
	status?: number;
	message: string;
	data: T;
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
	creationDate: number;
	isPublished: boolean;
};
/* #endregion */

/* #region user */
export interface IUser extends DefaultModelProperties {
	_id?: string;
	firstName: string;
	lastName: string;
	fullName: string;
	mobileNumber: string;
	password: string;
	isAdmin: boolean;
}
export interface IUserRead extends DefaultModelProperties {
	_id: string;
	firstName: string;
	lastName: string;
	fullName: string;
	mobileNumber: string;
	isAdmin: boolean;
}
/* #endregion */

/* #region post */
export interface IPostCategory
	extends DefaultModelProperties {
	_id?: string;
	title: string;
}
/* #endregion */

/* #region media */
export interface IImage extends DefaultModelProperties {
	_id: string;
	fileName: string;
	format: string;
	temp: boolean;
	pathname: string;
	thumbnailPathname?: string;
	title: string;
}
export interface IVideo extends DefaultModelProperties {
	_id: string;
	temp: boolean;
	thumbnailPathname?: string;
	qualityVariations: qualityVariation[];
	title: string;
}
export type qualityVariation = {
	fileName: string;
	size: number | string;
	pathname: string;
	format: string;
};

/* #endregion */

/* #region video */
export interface IPost extends DefaultModelProperties {
	_id: string;
	title: string;
	text: string;
	images: IImage[];
	videos: IVideo[];
	postCategory: IPostCategory;
}
/* #endregion */
