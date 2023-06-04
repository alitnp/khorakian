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
	directMessagesGetMy: "/directMessage/myMessages",
	directMessagesCreate: "/directMessage",
	directMessagesReply: "/directMessage/reply",

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
	getMyIdeas: "/idea/getmy",
	getApprovedIdeas: "/idea/getapproved",
	getAllIdeaCategories: "/ideaCategory",
	ideaGetAll: "/idea",
	ideaCreate: "/idea",
	ideaDetail: (_id: string) => "/idea/" + _id,
	ideaDelete: (_id: string) => "/idea/" + _id,
	ideaEdit: (_id: string) => "/idea/" + _id,
	ideaLike: "/idea/like",
	ideaCommentsGetAll: "/idea/comment",
	ideaAdminCommentsGetAll: "/idea/adminComments",
	ideaMyCommentsGetAll: "/idea/myComments",
	ideaCommentCreate: "/idea/comment",
	ideaCommnetReply: "/idea/reply",

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
	getMyUserExperience: "/userExperience/getmy",
	getApprovedUserExperience: "/userExperience/getapproved",
	userExperienceCommentsGetAll: "/userExperience/comment",
	userExperienceAdminCommentsGetAll:
		"/userExperience/adminComments",
	userExperienceMyCommentsGetAll:
		"/userExperience/myComments",
	userExperienceCommentCreate: "/userExperience/comment",
	userExperienceCommnetReply: "/userExperience/reply",

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
