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
	_id: string;
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
	_id: string;
	title: string;
}
/* #endregion */

/* #region experienceCategory */
export interface IExperienceCategory
	extends DefaultModelProperties {
	_id: string;
	title: string;
}

/* region experienceCategory */
export interface IIdeaCategory
	extends DefaultModelProperties {
	_id: string;
	title: string;
}
/* region ideaCategory */

/* #region media */
export interface IImage extends DefaultModelProperties {
	_id: string;
	fileName: string;
	format: string;
	pathname: string;
	thumbnailPathname?: string;
	title: string;
}
export interface IVideo extends DefaultModelProperties {
	_id: string;
	thumbnail?: string;
	qualityVariations: qualityVariation[];
	title: string;
}
export interface IVideoRead extends DefaultModelProperties {
	_id: string;
	thumbnail?: IImage;
	qualityVariations: qualityVariation[];
	title: string;
}
export type qualityVariation = {
	fileName: string;
	size: number | string;
	pathname: string;
	format: string;
};

/* #endregion media */

/* #region post */
export interface IPost extends DefaultModelProperties {
	_id: string;
	title: string;
	text: string;
	images: string[];
	videos: string[];
	postCategory: IPostCategory;
	featured: boolean;
	viewCount: number;
	likeCount: number;
	commentCount: number;
}
export interface IPostCreate
	extends DefaultModelProperties {
	title: string;
	text: string;
	images: string[];
	videos: string[];
	postCategory: string;
	featured: boolean;
}

export interface IPostRead extends DefaultModelProperties {
	_id: string;
	title: string;
	text: string;
	images: IImage[];
	videos: IVideoRead[];
	postCategory: IPostCategory;
	featured: boolean;
	viewCount: number;
	likeCount: number;
	commentCount: number;
	liked?: boolean;
}

export interface IPostLike extends DefaultModelProperties {
	content?: string;
	user?: string;
}
export interface IPostLikeCreate {
	content: string;
	user: string;
}
export interface IPostLikeRead
	extends DefaultModelProperties {
	_id: string;
	content: IPost;
	user: IUser;
}

export interface IPostComment
	extends DefaultModelProperties {
	content?: string;
	user?: string;
	text: string;
	replies?: ICommentReply[];
}
export interface IPostCommentRead
	extends DefaultModelProperties {
	_id: string;
	content: string;
	user: IUserRead;
	text: string;
	replies: ICommentReply[];
}
export interface ICommentReply
	extends DefaultModelProperties {
	user?: string;
	text: string;
}

/* #endregion post*/

//#region Home
export interface ISlider extends DefaultModelProperties {
	_id: string;
	index: number;
	title?: string;
	subTitle?: string;
	shortDesc?: string;
	desc?: string;
	image?: string;
	url?: string;
	direction: "right" | "left" | "center";
}
export interface ISliderRead
	extends DefaultModelProperties {
	_id: string;
	index: number;
	title?: string;
	subTitle?: string;
	shortDesc?: string;
	desc?: string;
	image?: IImage;
	url?: string;
	direction: "right" | "left" | "center";
}
export interface IHistory extends DefaultModelProperties {
	_id: string;
	title: string;
	from: number;
	to: number;
}

export interface IPageItemType
	extends DefaultModelProperties {
	_id: string;
	title: string;
}

export interface IPageItemSorting
	extends DefaultModelProperties {
	_id: string;
	title: string;
}

export interface IPageItemStyle
	extends DefaultModelProperties {
	_id: string;
	title: string;
}
//#endregion Home
