import { logout } from 'redux/reducer/Login/loginReducer';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';

export const localApiCatcher = (errorResponse, dispatch, checkApiCatcher = true) => {
  if (errorResponse.networkError?.message === 'Network Error') {
    dispatch(setNotificationData({ message: 'اینترنت یا سرور قطع می‌باشد. دوباره تلاش کنید', type: 'error', time: 5000 }));
  } else if (errorResponse.networkError?.code === 'ECONNABORTED') {
    dispatch(setNotificationData({ message: 'پاسخی از سمت سرور دریافت نشد. صفحه را رفرش کنید', type: 'error', time: 5000 }));
  } else if (errorResponse?.error?.status === 401) {
    // dispatch(setNotificationData({ message: errorResponse?.error?.data?.Message || errorResponse?.error?.data?.message, type: 'error', time: 5000 }));
    dispatch(logout());
  } else if (checkApiCatcher && errorResponse?.error) {
    dispatch(setNotificationData({ message: errorResponse?.error?.data?.Message || errorResponse?.error?.data?.message, type: 'error', time: 5000 }));
  }
};
