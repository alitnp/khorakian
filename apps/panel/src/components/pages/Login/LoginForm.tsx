import { Form, Input } from 'antd';
import TcButton from 'components/UI/Button/TcButton';
import TcCard from 'components/UI/Card/TcCard';
import TcForm from 'components/UI/Form/TcForm';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { FC, useState } from 'react';
import cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { login } from 'redux/reducer/Login/loginReducer';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcDevider from 'components/UI/Devider/TcDevider';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import { ApiDataResponse } from '@my/types';

const LoginForm: FC = () => {
  //states
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const apiCatcher = useApiCatcher();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  //functions
  const onFinish = async (values: { username: string }) => {
    setLoading(true);

    await ApiService.post(endpointUrls.login, values)
      .then((res: ApiDataResponse<{ token: string }>) => {
        handleApiThen({
          res,
          dispatch,
          onSuccess: (res) => {
            cookie.set('token', 'Bearer ' + res.data.token);
            dispatch(login({ isLoggedIn: true }));
          },
          notifFail: true,
          notifSuccess: false,
        });
      })
      .catch(() => {
        apiCatcher(errorResponse);
      });

    setLoading(false);
  };

  return (
    <TcCard className='w-full'>
      <>
        <div className='flex flex-col items-center justify-center mb-12'>
          <h1 className='text-2xl font-bold text-center text-t-primary-color'>
            پنل مدیریت محتوا سایت
            <br />
            امیر خوراکیان
          </h1>
        </div>
        <TcDevider orientation='center'>ورود به حساب کاربری</TcDevider>
        <TcForm form={form} onFinish={onFinish}>
          <TcFormWrapper singleColumn>
            <TcFormItem
              label='شماره همراه'
              name='mobileNumber'
              rules={[
                {
                  required: true,
                  message: 'شماره همراه خود را وارد کنید',
                },
              ]}>
              <Input />
            </TcFormItem>
            <TcFormItem
              label='رمز عبور'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'رمز عبور خود را وارد کنید',
                },
                {
                  min: 8,
                  message: 'رمز عبور باید حداقل 8 کاراکتر باشد',
                },
              ]}>
              <Input.Password />
            </TcFormItem>

            <div></div>
          </TcFormWrapper>
          <div className='flex justify-end mt-6'>
            <TcButton htmlType='submit' type='primary'>
              ورود
            </TcButton>
          </div>
        </TcForm>
        {loading && <TcCoverLoading />}
      </>
    </TcCard>
  );
};

export default LoginForm;
