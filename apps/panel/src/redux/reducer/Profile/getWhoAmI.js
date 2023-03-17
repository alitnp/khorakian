import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { localApiCatcher } from 'global/helperFunctions/localApiCatcher';
import { setUserProfile } from 'redux/reducer/Profile/profileReducer';

export const getWhoAmI = () => async (dispatch) => {
  await ApiService.post(endpointUrls.whoAmI)
    .then((res) => {
      if (res.isSuccess) {
        dispatch(setUserProfile(res.data));
      }
    })
    .catch(() => {
      localApiCatcher(errorResponse, dispatch);
    });
};
