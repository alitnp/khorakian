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
	fullName: string;
	mobileNumber: string;
	password: string;
	isAdmin: boolean;
	image?: string;
	notification: INotification[];
}
export interface IUserRead extends DefaultModelProperties {
	_id: string;
	fullName: string;
	mobileNumber: string;
	isAdmin: boolean;
	image: IImage;
}

export interface INotification
	extends DefaultModelProperties {
	title: string;
	text: string;
	frontEndRoute?: string;
	contextId?: string;
	unReadNotification: boolean;
}
export interface INotificationRead
	extends DefaultModelProperties {
	title: string;
	text: string;
	frontEndRoute: IFrontEndRoute;
	contextId?: string;
	unReadNotification: boolean;
}
/* #endregion */

/* #region postCategory */
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

/* #region media */
export interface IImage extends DefaultModelProperties {
	_id: string;
	fileName: string;
	format: string;
	pathname: string;
	thumbnailPathname?: string;
	thumbnailWidth: number;
	thumbnailHeight: number;
	width: number;
	height: number;
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

/* region userExperienceCategory */
export interface IUserExperienceCategory
	extends DefaultModelProperties {
	_id: string;
	title: string;
}
/* region UserExperienceCategory */

/* #region UserExperience */
export interface IUserExperience
	extends DefaultModelProperties {
	_id: string;
	title: string;
	text: string;
	experienceCategory?: string;
	featured: boolean;
	viewCount: number;
	likeCount: number;
	commentCount: number;
	isAdminSubmitted: boolean;
	isApprove: boolean;
	user?: string;
}

export interface IUserExperienceLike
	extends DefaultModelProperties {
	content?: string;
	user?: string;
}
export interface IUserExperienceComment
	extends DefaultModelProperties {
	content?: string;
	user?: string;
	text: string;
	replies?: ICommentReply[];
}

export interface IUserExperienceRead
	extends DefaultModelProperties {
	_id: string;
	title: string;
	text: string;
	experienceCategory: IExperienceCategory;
	featured: boolean;
	viewCount: number;
	likeCount: number;
	commentCount: number;
	liked?: boolean;
	isAdminSubmitted: boolean;
	isApprove: boolean;
	user: IUserRead;
}

/* #endregion UserExperience */

/* region ideaCategory */
export interface IIdeaCategory
	extends DefaultModelProperties {
	_id: string;
	title: string;
}
/* region ideaCategory */

/* #region idea */
export interface IIdea extends DefaultModelProperties {
	_id: string;
	title: string;
	text: string;
	ideaCategory?: string;
	featured: boolean;
	viewCount: number;
	likeCount: number;
	commentCount: number;
	isAdminSubmitted: boolean;
	isApprove: boolean;
	user?: string;
}

export interface IIdeaLike extends DefaultModelProperties {
	content?: string;
	user?: string;
}
export interface IIdeaComment
	extends DefaultModelProperties {
	content?: string;
	user?: string;
	text: string;
	replies?: ICommentReply[];
}

export interface IIdeaRead extends DefaultModelProperties {
	_id: string;
	title: string;
	text: string;
	ideaCategory: IIdeaCategory;
	featured: boolean;
	viewCount: number;
	likeCount: number;
	commentCount: number;
	liked?: boolean;
	isAdminSubmitted: boolean;
	isApprove: boolean;
	user: IUserRead;
}

/* #endregion idea */

/* #region EXPERIRNCE */
export interface IExperience
	extends DefaultModelProperties {
	_id: string;
	title: string;
	text: string;
	images: string[];
	videos: string[];
	experienceCategory?: string;
	featured: boolean;
	viewCount: number;
	likeCount: number;
	commentCount: number;
	article: string;
}
export interface IExperienceCreate
	extends DefaultModelProperties {
	title: string;
	text: string;
	images: string[];
	videos: string[];
	experienceCategory: string;
	featured: boolean;
	article: string;
}

export interface IExperienceRead
	extends DefaultModelProperties {
	_id: string;
	title: string;
	text: string;
	images: IImage[];
	videos: IVideoRead[];
	experienceCategory: IExperienceCategory;
	featured: boolean;
	viewCount: number;
	likeCount: number;
	commentCount: number;
	liked?: boolean;
	article: string;
}
export interface IExperienceWithComments
	extends DefaultModelProperties {
	_id: string;
	title: string;
	text: string;
	images: IImage[];
	videos: IVideoRead[];
	experienceCategory: IExperienceCategory;
	featured: boolean;
	viewCount: number;
	likeCount: number;
	commentCount: number;
	liked?: boolean;
	article: string;
	comments: IExperienceCommentRead[];
}

export interface IExperienceLike
	extends DefaultModelProperties {
	content?: string;
	user?: string;
}
export interface IExperienceLikeCreate {
	content: string;
	user: string;
}
export interface IExperienceLikeRead
	extends DefaultModelProperties {
	_id: string;
	content: IExperience;
	user: IUser;
}

export interface IExperienceComment
	extends DefaultModelProperties {
	_id: string;
	content?: string;
	user?: string;
	text: string;
	replies?: ICommentReply[];
}

export interface IExperienceCommentRead
	extends DefaultModelProperties {
	_id: string;
	content: string;
	user: IUserRead;
	text: string;
	replies: ICommentReply[];
}

/* #END region EXPERIRNCE */

/* #region post */
export interface IPost extends DefaultModelProperties {
	_id: string;
	title: string;
	text: string;
	images: string[];
	videos: string[];
	postCategory?: string;
	featured: boolean;
	viewCount: number;
	likeCount: number;
	commentCount: number;
	eventDate: number;
}
export interface IPostCreate
	extends DefaultModelProperties {
	title: string;
	text: string;
	images: string[];
	videos: string[];
	postCategory: string;
	featured: boolean;
	eventDate?: number;
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
	eventDate: number;
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
	replies: ICommentReplyRead[];
}
export interface ICommentReply
	extends DefaultModelProperties {
	user?: string;
	text: string;
}

export interface ICommentReplyRead
	extends DefaultModelProperties {
	user: IUserRead;
	text: string;
}

export interface IGeneralReply
	extends DefaultModelProperties {
	user?: string;
	text: string;
}
export interface IGeneralReplyRead
	extends DefaultModelProperties {
	_id: string;
	user: IUserRead;
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
	image: IImage;
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
	persianTitle: string;
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

export interface IPageItem extends DefaultModelProperties {
	_id: string;
	title: string;
	subTitle?: string;
	type?: string;
	sorting?: string;
	style?: string;
	index: number;
}

export interface IPageItemRead
	extends DefaultModelProperties {
	_id: string;
	title: string;
	subTitle?: string;
	type: IPageItemType;
	sorting: IPageItemSorting;
	style: IPageItemStyle;
	index: number;
}
export interface IPageItemConents
	extends DefaultModelProperties {
	_id: string;
	title: string;
	subTitle?: string;
	type: IPageItemType;
	sorting: IPageItemSorting;
	style: IPageItemStyle;
	index: number;
	content: any;
	totalItems: number;
}
export interface IPageItemGeneric<T>
	extends DefaultModelProperties {
	_id: string;
	title: string;
	subTitle?: string;
	type: IPageItemType;
	sorting: IPageItemSorting;
	style: IPageItemStyle;
	index: number;
	content: T;
	totalItems: number;
}

export interface ISocialMedia
	extends DefaultModelProperties {
	_id: string;
	title: string;
	url: string;
	image?: string;
}

export interface ISocialMediaRead
	extends DefaultModelProperties {
	_id: string;
	title: string;
	url: string;
	image: IImage;
}
export interface ISocialMedia
	extends DefaultModelProperties {
	_id: string;
	title: string;
	englishTitle?: string;
	url: string;
	image?: string;
}

export interface ISocialMediaRead
	extends DefaultModelProperties {
	_id: string;
	title: string;
	englishTitle?: string;
	url: string;
	image: IImage;
}

//#endregion Home

//#region DefaulImage
export interface IDefaultImage
	extends DefaultModelProperties {
	_id: string;
	key: string;
	image?: string;
	persianKey: string;
}
export interface IDefaultImageRead
	extends DefaultModelProperties {
	_id: string;
	key: string;
	image: IImage;
	persianKey: string;
}
//#endregion
/* # about me*/
export interface IAboutMe extends DefaultModelProperties {
	_id: string;
	post?: string;
	name: string;
	position: string;
	text: string;
}
export interface IAboutMeRead
	extends DefaultModelProperties {
	_id: string;
	post: IPostRead;
	name: string;
	position: string;
	text: string;
}

/* # end of about me*/

/*#DirectMessage */
export interface IDirectMessage
	extends DefaultModelProperties {
	user?: string;
	text: string;
	replies?: IGeneralReply[];
}

export interface IDirectMessageRead
	extends DefaultModelProperties {
	_id: string;
	user: IUserRead;
	text: string;
	replies: IGeneralReplyRead[];
}

/*#end of DirectMessage */

/*#DefaultText */
export interface IDefaultText
	extends DefaultModelProperties {
	text: string;
	key: string;
	persianKey: string;
}
/*#end DefaultText */

export interface IFrontEndRoute
	extends DefaultModelProperties {
	title: string;
	path: string;
}
