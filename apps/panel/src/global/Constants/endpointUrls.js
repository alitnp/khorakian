const endpointUrls = {
  //development
  baseUrl: 'http://Apitest.levelupfx724.com/api',
  imageBaseUrl: 'http://Apitest.levelupfx724.com/',
  mobileApp: 'http://Dl.levelupfx724.com/levelup.apk',

  //login
  login: '/Users/LoginWithoutToken',
  whoAmI: '/Users/WhoAmI',

  //register
  register: '/Users/RegisterUser',
  registerResendToken: '/Users/ResendToken',
  registerSubmitToken: '/Users/ConfirmUserByOtp',

  //signals
  getActiveSignals: '/Signal/GetActiveSignals',
  signalGetList: '/Signal/Search',
  signalCreate: '/Signal/Create',
  signalUpdate: '/Signal/Update',
  signalGetDetail: '/Signal/GetSignalDetails',
  signalDelete: '/Signal/Delete',
  signalSetResult: '/Signal/SetSignalResult',
  signalUploadImage: '/Signal/UploadSignalImage',
  signalAddImage: '/Signal/AddImageToSignal',
  signalRemoveImage: '/Signal/RemoveSignalImage',

  //content
  contentGetList: '/Contents/Search',
  contentCreate: '/Contents/Create',
  contentUpdate: '/Contents/Update',
  contentDelete: '/Contents/Delete',
  contentUploadImage: '/Contents/UploadContentImage',

  //user
  userGetList: '/Users/Search',

  //evidence
  evidencesGetList: '/Evidences/Search',
  evidencesGetDetail: '/Evidences',
  evidencesCreate: '/Evidences/Create',
  evidencesEdit: '/Evidences/Update',
  evidencesDelete: '/Evidences/Delete',

  //PaymentTypes
  paymentTypesGetList: '/PaymentTypes/Search',
  paymentTypesGetDetail: '/PaymentTypes',
  paymentTypesCreate: '/PaymentTypes/Create',
  paymentTypesEdit: '/PaymentTypes/Update',
  paymentTypesDelete: '/PaymentTypes/Delete',

  //effectivePointTypes
  effectivePointTypesGetList: '/effectivePointTypes/Search',
  effectivePointTypesGetDetail: '/effectivePointTypes',
  effectivePointTypesCreate: '/effectivePointTypes/Create',
  effectivePointTypesEdit: '/effectivePointTypes/Update',
  effectivePointTypesDelete: '/effectivePointTypes/Delete',

  //signalStatuses
  signalStatusesGetList: '/signalStatuses/Search',
  signalStatusesGetDetail: '/signalStatuses',
  signalStatusesCreate: '/signalStatuses/Create',
  signalStatusesEdit: '/signalStatuses/Update',
  signalStatusesDelete: '/signalStatuses/Delete',

  //signalTypes
  signalTypesGetList: '/signalTypes/Search',
  signalTypesGetDetail: '/signalTypes',
  signalTypesCreate: '/signalTypes/Create',
  signalTypesEdit: '/signalTypes/Update',
  signalTypesDelete: '/signalTypes/Delete',

  //signalTypes
  signalResultTypesGetList: '/signalResultTypes/Search',
  signalResultTypesGetDetail: '/signalResultTypes',
  signalResultTypesCreate: '/signalResultTypes/Create',
  signalResultTypesEdit: '/signalResultTypes/Update',
  signalResultTypesDelete: '/signalResultTypes/Delete',

  //strategies
  strategiesGetList: '/strategies/Search',
  strategiesGetDetail: '/strategies',
  strategiesCreate: '/strategies/Create',
  strategiesEdit: '/strategies/Update',
  strategiesDelete: '/strategies/Delete',

  //symbols
  symbolsGetList: '/symbols/Search',
  symbolsGetDetail: '/symbols',
  symbolsCreate: '/symbols/Create',
  symbolsEdit: '/symbols/Update',
  symbolsDelete: '/symbols/Delete',

  //timeFrames
  timeFramesGetList: '/timeFrames/Search',
  timeFramesGetDetail: '/timeFrames',
  timeFramesCreate: '/timeFrames/Create',
  timeFramesEdit: '/timeFrames/Update',
  timeFramesDelete: '/timeFrames/Delete',

  //tradingTypes
  tradingTypesGetList: '/tradingTypes/Search',
  tradingTypesGetDetail: '/tradingTypes',
  tradingTypesCreate: '/tradingTypes/Create',
  tradingTypesEdit: '/tradingTypes/Update',
  tradingTypesDelete: '/tradingTypes/Delete',

  //Packages
  packagesGetList: '/Packages/GetPackages',
  packagesActiveForUser: '/Packages/ActivatePackage',
};

export default endpointUrls;
