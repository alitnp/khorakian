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
	getAllExperienceCategories: "/experiencecategory",

	//H
	historyGetAll: "/history",

	//I
	getAllIdeas: "/idea",

	//U
	userLogin: "/user/login",
	userRegister: "/user",
	userWhoAmI: "/user/getCurrentUser",
	userUploadProfile: "/user/uploadProfile",
	userChangePassword: "/user/changePassword",

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
