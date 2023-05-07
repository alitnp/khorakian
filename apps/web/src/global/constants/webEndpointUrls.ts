const webEndpointUrls = {
  //A
  aboutMeGetAll: '/aboutMe',

  //D
  //defaultImage
  getDefaultImageByKey: (key: string) => '/defaultImage/getByKey/' + key,
  //defaultText
  defautlTextGetAll: '/defaultText',
  defautlImageGetAll: '/defaultImage',

  //H
  historyGetAll: '/history',

  //U
  userLogin: '/user/login',
  userRegister: '/user',
  userWhoAmI: '/user/getCurrentUser',

  //P
  pageItemWithContent: '/pageItem/getWithContents',
  getPostDetail: (id: string) => '/post/' + id,
  getAllPostComments: '/post/comment',

  //S
  socialMediaGetAll: '/socialMedia',
};

export default webEndpointUrls;
