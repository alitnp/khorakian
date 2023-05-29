const webEndpointUrls = {
  //A
  aboutMeGetAll: '/aboutMe',

  //D
  //defaultImage
  getDefaultImageByKey: (key: string) => '/defaultImage/getByKey/' + key,
  //defaultText
  defautlTextGetAll: '/defaultText',
  defautlImageGetAll: '/defaultImage',

  //E
  getExperienceDetail: (id: string) => '/experience/' + id,
  getAllExperienceWithComments: '/experience/getAllWithComments',
  getAllExperience: '/experience',
  getAllExperienceCategories: '/experienceCategory',
  createUserExperience: '/userExperience',
  experienceCommentsGetAll: '/experience/comment',
  experienceAdminCommentsGetAll: '/experience/adminComments',
  experienceMyCommentsGetAll: '/experience/myComments',
  experienceCommentCreate: '/experience/comment',
  experienceCommnetReply: '/experience/reply',

  //H
  historyGetAll: '/history',

  //I
  getAllIdeas: '/idea',
  getAllIdeaCategories: '/ideaCategory',
  ideaGetAll: '/idea',
  ideaCreate: '/idea',
  ideaDetail: (_id: string) => '/idea/' + _id,
  ideaDelete: (_id: string) => '/idea/' + _id,
  ideaEdit: (_id: string) => '/idea/' + _id,

  //U
  userLogin: '/user/login',
  userRegister: '/user',
  userWhoAmI: '/user/getCurrentUser',
  userUploadProfile: '/user/uploadProfile',
  userChangePassword: '/user/changePassword',
  userExperienceGetAll: '/userExperience',
  userExperienceDetail: (_id: string) => '/userExperience/' + _id,
  userExperienceDelete: (_id: string) => '/userExperience/' + _id,
  userExperienceEdit: (_id: string) => '/userExperience/' + _id,

  //P
  pageItemWithContent: '/pageItem/getWithContents',
  getPostDetail: (id: string) => '/post/' + id,
  getAllPosts: '/post',
  getAllPostComments: '/post/comment',
  getAllPostCategories: '/postcategory',
  getAllPostAdminComments: '/post/adminComments',
  postCommentCreate: '/post/comment',
  postCommnetReply: '/post/reply',
  getAllMyComments: '/post/myComments',

  //S
  socialMediaGetAll: '/socialMedia',
};

export default webEndpointUrls;
