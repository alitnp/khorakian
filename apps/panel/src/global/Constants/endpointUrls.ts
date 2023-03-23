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

  //image
  imageUpload: '/image/upload',

  //video
  videoUpload: '/video/upload',
  videoDetail: '/video',
};

export default endpointUrls;
