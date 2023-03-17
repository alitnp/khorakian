import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { localApiCatcher } from 'global/helperFunctions/localApiCatcher';
import { setUserProfile } from 'redux/reducer/Profile/profileReducer';
import { ApiDataResponse, IUserRead } from '@my/types';
import { AppDispatch } from 'redux/store';

export const getWhoAmI = () => async (dispatch: AppDispatch) => {
  await ApiService.get(endpointUrls.whoAmI)
    .then((res: ApiDataResponse<IUserRead>) => {
      if (res.isSuccess) {
        dispatch(setUserProfile(res.data));
      }
    })
    .catch(() => {
      localApiCatcher(errorResponse, dispatch);
    });
};
