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

  //signals
  signal: { path: '/signal', isPrivate: true },
  signalCreate: { path: '/signal/create', isPrivate: true },
  signalUpdate: { path: '/signal/edit', isPrivate: true },

  //content
  content: { path: '/content', isPrivate: true },
  contentCreate: { path: '/content/create', isPrivate: true },
  contentEdit: { path: '/content/edit', isPrivate: true },

  //evidence
  evidences: { path: '/evidences', isPrivate: true },
  evidencesDetail: { path: '/evidences/detail', isPrivate: true },
  evidencesCreate: { path: '/evidences/create', isPrivate: true },
  evidencesEdit: { path: '/evidences/edit', isPrivate: true },

  //paymentTypes
  paymentTypes: { path: '/PaymentTypes', isPrivate: true },
  paymentTypesDetail: { path: '/PaymentTypes/detail', isPrivate: true },
  paymentTypesCreate: { path: '/PaymentTypes/create', isPrivate: true },
  paymentTypesEdit: { path: '/PaymentTypes/edit', isPrivate: true },

  //effectivePointTypes
  effectivePointTypes: { path: '/effectivePointTypes', isPrivate: true },
  effectivePointTypesDetail: { path: '/effectivePointTypes/detail', isPrivate: true },
  effectivePointTypesCreate: { path: '/effectivePointTypes/create', isPrivate: true },
  effectivePointTypesEdit: { path: '/effectivePointTypes/edit', isPrivate: true },

  //signalStatuses
  signalStatuses: { path: '/signalStatuses', isPrivate: true },
  signalStatusesDetail: { path: '/signalStatuses/detail', isPrivate: true },
  signalStatusesCreate: { path: '/signalStatuses/create', isPrivate: true },
  signalStatusesEdit: { path: '/signalStatuses/edit', isPrivate: true },

  //signalTypes
  signalTypes: { path: '/signalTypes', isPrivate: true },
  signalTypesDetail: { path: '/signalTypes/detail', isPrivate: true },
  signalTypesCreate: { path: '/signalTypes/create', isPrivate: true },
  signalTypesEdit: { path: '/signalTypes/edit', isPrivate: true },

  //signalResultTypes
  signalResultTypes: { path: '/signalResultTypes', isPrivate: true },
  signalResultTypesDetail: { path: '/signalResultTypes/detail', isPrivate: true },
  signalResultTypesCreate: { path: '/signalResultTypes/create', isPrivate: true },
  signalResultTypesEdit: { path: '/signalResultTypes/edit', isPrivate: true },

  //strategies
  strategies: { path: '/strategies', isPrivate: true },
  strategiesDetail: { path: '/strategies/detail', isPrivate: true },
  strategiesCreate: { path: '/strategies/create', isPrivate: true },
  strategiesEdit: { path: '/strategies/edit', isPrivate: true },

  //symbols
  symbols: { path: '/symbols', isPrivate: true },
  symbolsDetail: { path: '/symbols/detail', isPrivate: true },
  symbolsCreate: { path: '/symbols/create', isPrivate: true },
  symbolsEdit: { path: '/symbols/edit', isPrivate: true },

  //TimeFrames
  timeFrames: { path: '/timeFrames', isPrivate: true },
  timeFramesDetail: { path: '/timeFrames/detail', isPrivate: true },
  timeFramesCreate: { path: '/timeFrames/create', isPrivate: true },
  timeFramesEdit: { path: '/timeFrames/edit', isPrivate: true },

  //tradingTypes
  tradingTypes: { path: '/tradingTypes', isPrivate: true },
  tradingTypesDetail: { path: '/tradingTypes/detail', isPrivate: true },
  tradingTypesCreate: { path: '/tradingTypes/create', isPrivate: true },
  tradingTypesEdit: { path: '/tradingTypes/edit', isPrivate: true },

  //Packages
};

export default routes;
