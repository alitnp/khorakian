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

	//H
	historyGetAll: "/history",

	//I
	getAllIdeas: "/idea",
	getAllIdeaCategories: "/ideaCategory",
	ideaGetAll: "/idea",
	ideaDetail: (_id: string) => "/idea/" + _id,
	ideaDelete: (_id: string) => "/idea/" + _id,
	ideaEdit: (_id: string) => "/idea/" + _id,

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

	//P
	pageItemWithContent: "/pageItem/getWithContents",
	getPostDetail: (id: string) => "/post/" + id,
	getAllPosts: "/post",
	getAllPostComments: "/post/comment",
	getAllPostCategories: "/postcategory",
	getAllPostAdminComments: "/post/adminComments",

	//S
	socialMediaGetAll: "/socialMedia",
};

export default webEndpointUrls;
