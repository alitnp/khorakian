import { registerResponse } from 'components/pages/Register/Register';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcModal from 'components/UI/Modal/TcModal';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { englishNumberOnly } from 'global/default';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

interface IRegisterToken {
  close(): void;
  user: registerResponse | undefined;
}

const RegisterToken: FC<IRegisterToken> = ({ close, user }) => {
  //states
  const [timeLeft, setTimeLeft] = useState<number>(4);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  //hooks
  const apiCathcer = useApiCatcher();
  const dispatch = useDispatch();
  const { push } = useHistory();

  //effect
  useEffect(() => {
    if (user) resetTimer();
  }, [user]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) setTimeLeft((prevState) => prevState - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  //functions
  const resetTimer = () => setTimeLeft(4);
  const resendToken = async () => {
    if (timeLeft > 0) return;
    setLoading(true);
    await ApiService.post(endpointUrls.registerResendToken, { userId: user?.id })
      .then((res: any) => handleApiThen({ res, dispatch, onSuccess: resetTimer, notifFail: true, notifSuccess: true }))
      .catch(() => apiCathcer(errorResponse));
    setLoading(false);
  };
  const handleSubmit = async () => {
    if (!token) return;
    setLoading(true);
    await ApiService.post(endpointUrls.registerSubmitToken, { userId: user?.id, token })
      .then((res: any) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.login.path), notifFail: true, notifSuccess: true }))
      .catch(() => apiCathcer(errorResponse));
    setLoading(false);
  };

  return (
    <TcModal footer={false} onCancel={close} title='تایید شماره همراه' visible={!!user}>
      <p className='my-4'>کد تایید ارسال شده به شماره {user?.mobileNumber} را در باکس زیر وارد کنید.</p>
      <TcInput style={{ width: '100%' }} placeholder='کد تایید' value={token} onChange={(e) => setToken(englishNumberOnly(e.target.value))} />
      <div className='flex justify-end gap-2 select-none'>
        <small>کدی دریافت نکردید؟ </small>
        <small className={`${timeLeft > 0 ? 'text-t-secondary-text-color' : 'text-t-secondary-color cursor-pointer'}`} onClick={resendToken}>
          ارسال مجدد {timeLeft > 0 ? `(${timeLeft})` : ''}
        </small>
      </div>
      <TcFormButtons submitButtonText='تایید' cancelButtonText='بازگشت' onCancel={close} loading={loading} onSubmit={handleSubmit} />
    </TcModal>
  );
};

export default RegisterToken;
