const webRoutes: Record<
	string,
	{ path: string; private: boolean }
> = {
	home: { path: "/", private: false },
	login: { path: "/login", private: false },
	register: { path: "/register", private: false },
	dashboard: { path: "/dashboard", private: false },

	//dashboard
	dashboardExperience: {
		path: "/dashboard/experience",
		private: true,
	},
	dashboardIdea: {
		path: "/dashboard/idea",
		private: true,
	},
	dashboardProfile: {
		path: "/dashboard/profile",
		private: true,
	},

	//post
	postAllContents: { path: "/post", private: false },
	postDetail: { path: "/post", private: false },

	//experience
	experience: { path: "/experience", private: false },
	experiencePage: {
		path: "/experience",
		private: false,
	},
	experienceAllContent: {
		path: "/experience/all",
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
