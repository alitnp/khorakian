const routes = {
  //baseRoutes

  //user
  login: { path: '/login', isPrivate: false },
  register: { path: '/register', isPrivate: false },
  profile: { path: '/profile', isPrivate: true },

  //dashboard
  dashboard: { path: '/dashboard', isPrivate: true },
  setting: { path: '/setting', isPrivate: true },

  //post
  post: { path: '/post', isPrivate: true },
  postCreate: { path: '/post/create', isPrivate: true },

  //postCategory
  postCategory: { path: '/postcategory', isPrivate: true },
  postCategoryCreate: { path: '/postcategory/create', isPrivate: true },
  postCategoryEdit: { path: '/postcategory/edit', isPrivate: true },
  postCategoryDetail: { path: '/postcategory/detail', isPrivate: true },

  //payment
  payment: { path: '/payment', isPrivate: true },

  //user
  user: { path: '/user', isPrivate: true },

  //video
  video: { path: '/video', isPrivate: true },
  videoCreate: { path: '/video/create', isPrivate: true },
  videoUpdate: { path: '/video/edit', isPrivate: true },

  //video
  image: { path: '/image', isPrivate: true },
  imageCreate: { path: '/image/create', isPrivate: true },
  imageUpdate: { path: '/image/edit', isPrivate: true },

  //content
  content: { path: '/content', isPrivate: true },
  contentCreate: { path: '/content/create', isPrivate: true },
  contentEdit: { path: '/content/edit', isPrivate: true },
};

export default routes;
