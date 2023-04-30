const webEndpointUrls = {
	//D
	//defaultImage
	getDefaultImageByKey: (key: string) =>
		"/defaultImage/getByKey/" + key,

	//U
	userLogin: "/user/login",
	userRegister: "/user",
	userWhoAmI: "/user/getCurrentUser",

	//P
	pageItemWithContent: "/pageItem/getWithContents",
};

export default webEndpointUrls;
