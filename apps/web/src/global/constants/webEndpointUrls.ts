const webEndpointUrls = {
	//A
	aboutMeGetAll: "/aboutMe",

	//D
	//defaultImage
	getDefaultImageByKey: (key: string) =>
		"/defaultImage/getByKey/" + key,
	//defaultText
	defautlTextGetAll: "/defaultText",
	defautlImageGetAll: "/defaultImage",

	//E
	getExperienceDetail: (id: string) => "/experience/" + id,
	getAllExperienceWithComments:
		"/experience/getAllWithComments",
	getAllExperience: "/experience",
	getAllExperienceCategories: "/experienceCategory",
	createUserExperience: "/userExperience",
	experienceLike: "/experience/like",
	experienceCommentsGetAll: "/experience/comment",
	experienceAdminCommentsGetAll: "/experience/adminComments",
	experienceMyCommentsGetAll: "/experience/myComments",
	experienceCommentCreate: "/experience/comment",
	experienceCommnetReply: "/experience/reply",

	//H
	historyGetAll: "/history",

	//I
	getAllIdeas: "/idea",
	getAllIdeaCategories: "/ideaCategory",
	ideaGetAll: "/idea",
	ideaCreate: "/idea",
	ideaDetail: (_id: string) => "/idea/" + _id,
	ideaDelete: (_id: string) => "/idea/" + _id,
	ideaEdit: (_id: string) => "/idea/" + _id,
	ideaLike: "/idea/like",

	//N
	notificationGetAll: "/user/getMyNotifications",

	//U
	userLogin: "/user/login",
	userRegister: "/user",
	userWhoAmI: "/user/getCurrentUser",
	userUploadProfile: "/user/uploadProfile",
	userChangePassword: "/user/changePassword",
	userExperienceGetAll: "/userExperience",
	userExperienceDetail: (_id: string) =>
		"/userExperience/" + _id,
	userExperienceDelete: (_id: string) =>
		"/userExperience/" + _id,
	userExperienceEdit: (_id: string) =>
		"/userExperience/" + _id,
	userExperienceLike: "/userExperience/like",

	//P
	pageItemWithContent: "/pageItem/getWithContents",
	getPostDetail: (id: string) => "/post/" + id,
	getAllPosts: "/post",
	getAllPostComments: "/post/comment",
	getAllPostCategories: "/postcategory",
	getAllPostAdminComments: "/post/adminComments",
	postLike: "/post/like",

	//S
	socialMediaGetAll: "/socialMedia",
	postCommentCreate: "/post/comment",
	postCommnetReply: "/post/reply",
	getAllMyComments: "/post/myComments",
};

export default webEndpointUrls;
