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

	//H
	historyGetAll: "/history",

	//U
	userLogin: "/user/login",
	userRegister: "/user",
	userWhoAmI: "/user/getCurrentUser",

	//P
	pageItemWithContent: "/pageItem/getWithContents",
	getPostDetail: (id: string) => "/post/" + id,
	getAllPosts: "/post",
	getAllPostComments: "/post/comment",
	getAllPostCategories: "/postcategory",

	//S
	socialMediaGetAll: "/socialMedia",
};

export default webEndpointUrls;
