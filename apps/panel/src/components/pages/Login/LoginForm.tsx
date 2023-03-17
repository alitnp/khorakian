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
import { backendReponse, loginResponse } from 'global/Models/globalModels';
import { luLogo } from 'global/Constants/icons';
import { useDispatch } from 'react-redux';
import { login } from 'redux/reducer/Login/loginReducer';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcDevider from 'components/UI/Devider/TcDevider';
import { Link } from 'react-router-dom';
import routes from 'global/Constants/routes';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';

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

    await ApiService.post(endpointUrls.login, { ...values, grant_type: 'password' })
      .then((res: backendReponse<loginResponse>) => {
        handleApiThen({
          res,
          dispatch,
          onSuccess: (res) => {
            cookie.set('token', 'bearer ' + res.data.access_token);
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
          {luLogo('120', '80')}
          <h1 className='text-2xl font-bold text-t-primary-color'>Level Up Dashboard</h1>
        </div>
        <TcDevider orientation='center'>ورود به حساب کاربری</TcDevider>
        <TcForm form={form} onFinish={onFinish}>
          <TcFormWrapper singleColumn>
            <TcFormItem
              label='نام کاربری'
              name='username'
              rules={[
                {
                  required: true,
                  message: 'نام کاربری خود را وارد کنید',
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
                  message: 'رمز عبور باید بیشتر از 8 کاراکتر باشد',
                },
              ]}>
              <Input.Password />
            </TcFormItem>

            <div></div>
          </TcFormWrapper>
          <div className='flex justify-between mt-6'>
            <Link to={routes.register.path}>
              <TcButton>ایجاد حساب</TcButton>
            </Link>
            <TcButton htmlType='submit'>ورود</TcButton>
          </div>
        </TcForm>
        {loading && <TcCoverLoading />}
      </>
    </TcCard>
  );
};

export default LoginForm;
