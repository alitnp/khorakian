import { setNotificationData } from 'redux/reducer/Toast/toastReducer';

type props = {
  res: any;
  onSuccess(_a: any): void;
  dispatch?: (_a: any) => void;
  dataOnly?: boolean;
  notifSuccess?: boolean;
  notifFail?: boolean;
  onFailed?: () => void;
  setLoading?: (_a: boolean) => void;
};

export const handleApiThen = ({ res, onSuccess, dispatch, dataOnly = false, notifSuccess = true, notifFail = true, onFailed, setLoading }: props) => {
  if (res.isSuccess) {
    if (dispatch && notifSuccess) {
      const message = typeof notifSuccess === 'string' ? notifSuccess : 'عملیات با موفقیت انجام شد.';
      dispatch(setNotificationData({ message, type: 'success' }));
    }
    onSuccess(dataOnly ? res.data : res);
  } else {
    dispatch && notifFail && dispatch(setNotificationData({ message: res.message, type: 'warning' }));
    onFailed && onFailed();
  }
  setLoading && setLoading(false);
};
