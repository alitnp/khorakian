

const webRoutes = {
	home: { path: "/", private: false },
	login: { path: "/login", private: false },
	register: { path: "/register", private: false },

	//post
	postAllContents: { path: "/postcontents", private: false },
	postDetail: { path: "/postdetail", private: false },

	//experience
	experience: { path: "/experience", private: false },
	experienceAllContents: {
		path: "/experiencecontents",
		private: false,
	},
	experienceDetail: {
		path: "/experiencedetail",
		private: false,
	},
	userExperienceDetail: {
		path: "/userexperiencedetail",
		private: false,
	},

	//idea
	idea: { path: "/idea", private: false },
	ideaAllContents: { path: "/ideacontents", private: false },
	ideaDetail: { path: "/ideadetail", private: false },
};

export default webRoutes;
