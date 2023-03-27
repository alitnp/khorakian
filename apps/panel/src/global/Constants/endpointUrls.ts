const endpointUrls = {
  //development
  // baseUrl: 'http://Apitest.levelupfx724.com/api',
  imageBaseUrl: 'http://Apitest.levelupfx724.com/',
  mobileApp: 'http://Dl.levelupfx724.com/levelup.apk',

  //login
  login: '/user/login',
  whoAmI: '/user/getCurrentUser',

  //postCategory
  postCategoryGetList: '/postcategory',
  postCategoryDetail: (id: number | string) => '/postcategory/' + id,
  postCategoryCreate: '/postcategory',
  postCategoryEdit: (id: number | string) => '/postcategory/' + id,
  postCategoryDelete: (id: number | string) => '/postcategory/' + id,

  //ideaCategory
  ideaCategoryGetList: '/ideaCategory',
  ideaCategoryDetail: (id: number | string) => '/ideaCategory/' + id,
  ideaCategoryCreate: '/ideaCategory',
  ideaCategoryEdit: (id: number | string) => '/ideaCategory/' + id,
  ideaCategoryDelete: (id: number | string) => '/ideaCategory/' + id,

  //experienceCategory
  experienceCategoryGetList: '/experienceCategory',
  experienceCategoryDetail: (id: number | string) => '/experienceCategory/' + id,
  experienceCategoryCreate: '/experienceCategory',
  experienceCategoryEdit: (id: number | string) => '/experienceCategory/' + id,
  experienceCategoryDelete: (id: number | string) => '/experienceCategory/' + id,

  //video
  videoGetList: '/video',
  videoUpload: '/video/upload',
  videoDetail: (id: string) => '/video/' + id,
  videoEdit: (id: string) => '/video/' + id,
  videoDelete: (id: string) => '/video/' + id,

  //image
  imageGetList: '/image',
  imageUpload: '/image/upload',
  imageDetail: (id: string) => '/image/' + id,
  imageEdit: (id: string) => '/image/' + id,
  imageDelete: (id: string) => '/image/' + id,

  //user
  userGetList: '/user',
  setUserIsAdmin: (id: string | number) => '/user/toggleUserAdminAccess/' + id,
};

export default endpointUrls;
