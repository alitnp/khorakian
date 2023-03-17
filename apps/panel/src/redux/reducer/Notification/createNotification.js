import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';
import { setNotificationLoading } from 'redux/reducer/Notification/notificationReducer';
import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import { localApiCatcher } from 'global/helperFunctions/localApiCatcher';
import { englishNumber } from 'global/default';

export const createNotification = (values, redirect) => async (dispatch) => {
  dispatch(setNotificationLoading(true));

  await ApiService.post(endpointUrls.createNotification, { ...values, SendDate: englishNumber(new DateObject({ date: values.SendDate, calendar: persian }).format('YYYY/MM/DD')) })
    .then((res) => {
      if (res.isSuccess) {
        dispatch(setNotificationData({ message: 'اعلان با موفقیت ثبت شد.', type: 'success' }));
        redirect();
      } else {
        dispatch(setNotificationData({ message: res.message, type: 'warning' }));
      }
    })
    .catch(() => localApiCatcher(errorResponse, dispatch));

  dispatch(setNotificationLoading(false));
};
