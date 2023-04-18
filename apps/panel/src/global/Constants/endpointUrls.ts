const endpointUrls = {
  //development
  // baseUrl: 'http://Apitest.levelupfx724.com/api',
  imageBaseUrl: 'http://Apitest.levelupfx724.com/',
  mobileApp: 'http://Dl.levelupfx724.com/levelup.apk',

  //!A-a
  //!B-b
  //!C-c
  //!D-d

  //! E-e
  //experienceCategory
  experienceCategoryGetList: '/experienceCategory',
  experienceCategoryDetail: (id: number | string) => '/experienceCategory/' + id,
  experienceCategoryCreate: '/experienceCategory',
  experienceCategoryEdit: (id: number | string) => '/experienceCategory/' + id,
  experienceCategoryDelete: (id: number | string) => '/experienceCategory/' + id,

  //!F-f
  //!G-g
  //!H-h

  //!I-i
  //idea
  ideaGetList: '/idea',
  ideaDetail: (id: number | string) => '/idea/' + id,
  ideaCreate: '/idea',
  ideaEdit: (id: number | string) => '/idea/' + id,
  ideaDelete: (id: number | string) => '/idea/' + id,
  //UserIdea
  setUserIdeaApprove: '/idea/approve',

  //ideaCategory
  ideaCategoryGetList: '/ideaCategory',
  ideaCategoryDetail: (id: number | string) => '/ideaCategory/' + id,
  ideaCategoryCreate: '/ideaCategory',
  ideaCategoryEdit: (id: number | string) => '/ideaCategory/' + id,
  ideaCategoryDelete: (id: number | string) => '/ideaCategory/' + id,

  //image
  imageGetList: '/image',
  imageUpload: '/image/upload',
  imageDetail: (id: string) => '/image/' + id,
  imageEdit: (id: string) => '/image/' + id,
  imageDelete: (id: string) => '/image/' + id,

  //!J-j
  //!K-k

  //!L-l
  //login
  login: '/user/login',
  whoAmI: '/user/getCurrentUser',

  //!M-m
  //!N-n
  //!O-o

  //!P-p
  //post
  postGetList: '/post',
  postDetail: (id: number | string) => '/post/' + id,
  postCreate: '/post',
  postEdit: (id: number | string) => '/post/' + id,
  postDelete: (id: number | string) => '/post/' + id,

  //postCategory
  postCategoryGetList: '/postcategory',
  postCategoryDetail: (id: number | string) => '/postcategory/' + id,
  postCategoryCreate: '/postcategory',
  postCategoryEdit: (id: number | string) => '/postcategory/' + id,
  postCategoryDelete: (id: number | string) => '/postcategory/' + id,

  //!Q-q
  //!R-r
  //!S-s
  //!T-t

  //!U-u
  //user
  userGetList: '/user',
  setUserIsAdmin: (id: string | number) => '/user/toggleUserAdminAccess/' + id,

  //!V-v
  //video
  videoGetList: '/video',
  videoUpload: '/video/upload',
  videoDetail: (id: string) => '/video/detail/' + id,
  videoEdit: (id: string) => '/video/' + id,
  videoDelete: (id: string) => '/video/' + id,

  //!W-w
  //!X-x
  //!Y-y
  //!Z-z
};

export default endpointUrls;
