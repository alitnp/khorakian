const webRoutes = {
	home: { path: "/", private: false },
	login: { path: "/login", private: false },
	register: { path: "/register", private: false },

	//post
	postAllContents: { path: "/postcontents", private: false },
	postDetail: { path: "/post", private: false },

	//experience
	experience: { path: "/experience", private: false },
	experienceAllContents: {
		path: "/experiencecontents",
		private: false,
	},
	experienceDetail: {
		path: "/experience",
		private: false,
	},
	userExperienceDetail: {
		path: "/userexperience",
		private: false,
	},

	//idea
	idea: { path: "/idea", private: false },
	ideaAllContents: { path: "/ideacontents", private: false },
	ideaDetail: { path: "/idead", private: false },
};

export default webRoutes;
