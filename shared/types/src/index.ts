import { Types } from "mongoose";

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
	creationDate: Date;
	isPublished: boolean;
};
/* #endregion */

/* #region user */
export interface IUser extends DefaultModelProperties {
	_id?: Types.ObjectId;
	firstName: string;
	lastName: string;
	fullName: string;
	mobileNumber: string;
	password: string;
	isAdmin: boolean;
}
export interface IUserRead extends DefaultModelProperties {
	_id: Types.ObjectId;
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
	_id?: Types.ObjectId;
	title: string;
}
/* #endregion */

/* #region image */
export interface IImage extends DefaultModelProperties {
	_id?: Types.ObjectId;
	fileName: string;
	format: string;
	size: number;
	temp: boolean;
	pathname: string;
}
/* #endregion */
