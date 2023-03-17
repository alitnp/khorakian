import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { localApiCatcher } from 'global/helperFunctions/localApiCatcher';
import { setNotificationList, setNotificationLoading } from 'redux/reducer/Notification/notificationReducer';

export const getNotificationList =
  (filters = {}) =>
  async (dispatch) => {
    dispatch(setNotificationLoading(true));

    await ApiService.post(endpointUrls.getNotificationList, { ...filters })
      .then((res) => {
        if (res.isSuccess) dispatch(setNotificationList(res));
        else dispatch(setNotificationList(null));
      })
      .catch(() => localApiCatcher(errorResponse, dispatch, false));

    dispatch(setNotificationLoading(false));
  };
