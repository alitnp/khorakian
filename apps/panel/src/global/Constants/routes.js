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

  //directMessage
  directMessage: { path: '/directMessage', isPrivate: true },
  directMessageDetail: { path: '/directMessage/detail', isPrivate: true },

  //defaultImage
  defaultImage: { path: '/defaultImage', isPrivate: true },
  defaultImageCreate: { path: '/defaultImage/create', isPrivate: true },
  defaultImageEdit: { path: '/defaultImage/edit', isPrivate: true },
  defaultImageDetail: { path: '/defaultImage/detail', isPrivate: true },

  //defaultText
  defaultText: { path: '/defaultText', isPrivate: true },
  defaultTextCreate: { path: '/defaultText/create', isPrivate: true },
  defaultTextEdit: { path: '/defaultText/edit', isPrivate: true },
  defaultTextDetail: { path: '/defaultText/detail', isPrivate: true },

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

  //pageItemType
  pageItemType: { path: '/pageItemType', isPrivate: true },
  pageItemTypeCreate: { path: '/pageItemType/create', isPrivate: true },
  pageItemTypeEdit: { path: '/pageItemType/edit', isPrivate: true },
  pageItemTypeDetail: { path: '/pageItemType/detail', isPrivate: true },

  //pageItemStyle
  pageItemStyle: { path: '/pageItemStyle', isPrivate: true },
  pageItemStyleCreate: { path: '/pageItemStyle/create', isPrivate: true },
  pageItemStyleEdit: { path: '/pageItemStyle/edit', isPrivate: true },
  pageItemStyleDetail: { path: '/pageItemStyle/detail', isPrivate: true },

  //pageItemSorting
  pageItemSorting: { path: '/pageItemSorting', isPrivate: true },
  pageItemSortingCreate: { path: '/pageItemSorting/create', isPrivate: true },
  pageItemSortingEdit: { path: '/pageItemSorting/edit', isPrivate: true },
  pageItemSortingDetail: { path: '/pageItemSorting/detail', isPrivate: true },

  //pageItem
  pageItem: { path: '/pageItem', isPrivate: true },
  pageItemCreate: { path: '/pageItem/create', isPrivate: true },
  pageItemEdit: { path: '/pageItem/edit', isPrivate: true },
  pageItemDetail: { path: '/pageItem/detail', isPrivate: true },

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
