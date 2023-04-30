const routes = {
  //baseRoutes

  //aboutMe
  aboutMe: { path: '/aboutMe', isPrivate: true },
  aboutMeCreate: { path: '/aboutMe/create', isPrivate: true },
  aboutMeEdit: { path: '/aboutMe/edit', isPrivate: true },
  aboutMeDetail: { path: '/aboutMe/detail', isPrivate: true },

  //user
  login: { path: '/login', isPrivate: false },
  register: { path: '/register', isPrivate: false },
  profile: { path: '/profile', isPrivate: true },

  //dashboard
  dashboard: { path: '/dashboard', isPrivate: true },
  setting: { path: '/setting', isPrivate: true },

  //postCategory
  postCategory: { path: '/postcategory', isPrivate: true },
  postCategoryCreate: { path: '/postcategory/create', isPrivate: true },
  postCategoryEdit: { path: '/postcategory/edit', isPrivate: true },
  postCategoryDetail: { path: '/postcategory/detail', isPrivate: true },

  //ideaCategory
  ideaCategory: { path: '/ideacategory', isPrivate: true },
  ideaCategoryCreate: { path: '/ideacategory/create', isPrivate: true },
  ideaCategoryEdit: { path: '/ideacategory/edit', isPrivate: true },
  ideaCategoryDetail: { path: '/ideacategory/detail', isPrivate: true },

  //idea
  idea: { path: '/idea', isPrivate: true },
  ideaCreate: { path: '/idea/create', isPrivate: true },
  ideaEdit: { path: '/idea/edit', isPrivate: true },
  ideaDetail: { path: '/idea/detail', isPrivate: true },
  //user idea
  userIdea: { path: '/userIdea', isPrivate: true },

  //Experience
  experience: { path: '/experience', isPrivate: true },
  experienceCreate: { path: '/experience/create', isPrivate: true },
  experienceEdit: { path: '/experience/edit', isPrivate: true },

  //UserExperience
  userExperience: { path: '/userExperience', isPrivate: true },
  userExperienceCreate: { path: '/userExperience/create', isPrivate: true },
  userExperienceEdit: { path: '/userExperience/edit', isPrivate: true },

  //experienceCategory
  experienceCategory: { path: '/experienceCategory', isPrivate: true },
  experienceCategoryCreate: { path: '/experienceCategory/create', isPrivate: true },
  experienceCategoryEdit: { path: '/experienceCategory/edit', isPrivate: true },
  experienceCategoryDetail: { path: '/experienceCategory/detail', isPrivate: true },

  //USER
  user: { path: '/user', isPrivate: true },

  //video
  video: { path: '/video', isPrivate: true },
  videoCreate: { path: '/video/create', isPrivate: true },
  videoEdit: { path: '/video/edit', isPrivate: true },

  //video
  image: { path: '/image', isPrivate: true },
  imageCreate: { path: '/image/create', isPrivate: true },
  imageEdit: { path: '/image/edit', isPrivate: true },

  //post
  post: { path: '/post', isPrivate: true },
  postCreate: { path: '/post/create', isPrivate: true },
  postEdit: { path: '/post/edit', isPrivate: true },

  //socialMedia
  socialMedia: { path: '/socialMedia', isPrivate: true },
  socialMediaEdit: { path: '/socialMedia/edit', isPrivate: true },
  socialMediaCreate: { path: '/socialMedia/create', isPrivate: true },
};

export default routes;
