import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { localApiCatcher } from 'global/helperFunctions/localApiCatcher';
import { profile } from 'redux/reducer/Profile/profileReducer';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';

export const getUserProfile = () => async (dispatch, getState) => {
  const profileData = getState().profile.value;

  if (!profileData.userName) return;

  await ApiService.post(endpointUrls.getUserByNationalId, { userName: profileData.userName })
    .then((res) => {
      if (res.isSuccess) {
        dispatch(profile({ data: res.data }));
      } else {
        dispatch(setNotificationData({ message: res.Message, type: 'error', time: 5000 }));
      }
    })
    .catch(() => {
      localApiCatcher(errorResponse, dispatch);
    });
};
