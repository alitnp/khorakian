const endpointUrls = {
  //development

  //!A-a
  //!B-b
  //!C-c
  //!D-d
  //defaultImage
  defaultImageGetList: '/defaultImage',
  defaultImageDetail: (id: number | string) => '/defaultImage/' + id,
  defaultImageCreate: '/defaultImage',
  defaultImageEdit: (id: number | string) => '/defaultImage/' + id,
  defaultImageDelete: (id: number | string) => '/defaultImage/' + id,

  //! E-e
  //experience
  experienceGetList: '/experience',
  experienceDetail: (id: number | string) => '/experience/' + id,
  experienceCreate: '/experience',
  experienceEdit: (id: number | string) => '/experience/' + id,
  experienceDelete: (id: number | string) => '/experience/' + id,

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
  setUserIdeaDisApprove: '/idea/disApprove',

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
  //pageItem
  pageItemGetList: '/pageItem',
  pageItemDetail: (id: number | string) => '/pageItem/' + id,
  pageItemCreate: '/pageItem',
  pageItemEdit: (id: number | string) => '/pageItem/' + id,
  pageItemDelete: (id: number | string) => '/pageItem/' + id,

  //pageItemType
  pageItemTypeGetList: '/pageItemType',
  pageItemTypeDetail: (id: number | string) => '/pageItemType/' + id,
  pageItemTypeCreate: '/pageItemType',
  pageItemTypeEdit: (id: number | string) => '/pageItemType/' + id,
  pageItemTypeDelete: (id: number | string) => '/pageItemType/' + id,

  //pageItemSorting
  pageItemSortingGetList: '/pageItemSorting',
  pageItemSortingDetail: (id: number | string) => '/pageItemSorting/' + id,
  pageItemSortingCreate: '/pageItemSorting',
  pageItemSortingEdit: (id: number | string) => '/pageItemSorting/' + id,
  pageItemSortingDelete: (id: number | string) => '/pageItemSorting/' + id,

  //pageItemStyle
  pageItemStyleGetList: '/pageItemStyle',
  pageItemStyleDetail: (id: number | string) => '/pageItemStyle/' + id,
  pageItemStyleCreate: '/pageItemStyle',
  pageItemStyleEdit: (id: number | string) => '/pageItemStyle/' + id,
  pageItemStyleDelete: (id: number | string) => '/pageItemStyle/' + id,

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
  //UserExperience
  userExperienceGetList: '/userExperience',
  userExperienceDetail: (id: number | string) => '/userExperience/' + id,
  userExperienceCreate: '/userExperience',
  userExperienceEdit: (id: number | string) => '/userExperience/' + id,
  userExperienceDelete: (id: number | string) => '/userExperience/' + id,
  setUserExperienceApprove: '/userExperience/approve',
  setUserExperienceDisApprove: '/userExperience/disApprove',

  //userExperienceCategory
  userExperienceCategoryGetList: '/userExperienceCategory',
  userExperienceCategoryDetail: (id: number | string) => '/userExperienceCategory/' + id,
  userExperienceCategoryCreate: '/userExperienceCategory',
  userExperienceCategoryEdit: (id: number | string) => '/userExperienceCategory/' + id,
  userExperienceCategoryDelete: (id: number | string) => '/userExperienceCategory/' + id,

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
