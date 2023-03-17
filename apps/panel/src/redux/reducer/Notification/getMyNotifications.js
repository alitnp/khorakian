import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { localApiCatcher } from 'global/helperFunctions/localApiCatcher';
import { setMyNotifications, setNotificationLoading } from 'redux/reducer/Notification/notificationReducer';

export const getMyNotifications = (userId) => async (dispatch) => {
  dispatch(setNotificationLoading(true));
  await ApiService.post(endpointUrls.getMyNotifications, { userId, pageSize: 50 })
    .then((res) => {
      if (res.isSuccess) dispatch(setMyNotifications(res));
      else dispatch(setMyNotifications(null));
    })
    .catch(() => {
      localApiCatcher(errorResponse, dispatch);
      dispatch(setMyNotifications(null));
    });
  dispatch(setNotificationLoading(false));
};
