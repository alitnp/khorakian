import { Form, Input } from 'antd';
import TcButton from 'components/UI/Button/TcButton';
import TcCard from 'components/UI/Card/TcCard';
import TcForm from 'components/UI/Form/TcForm';
import TcFormItem from 'components/UI/Form/TcFormItem';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { FC, useState } from 'react';
import { backendReponse } from 'global/Models/globalModels';
import { luLogo } from 'global/Constants/icons';
import { useDispatch } from 'react-redux';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcDevider from 'components/UI/Devider/TcDevider';
import { Link } from 'react-router-dom';
import routes from 'global/Constants/routes';
import { convertFormValuesToEnglishNumber } from 'global/default';
import RegisterToken from 'components/pages/Register/RegisterToken';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';

export type registerResponse = {
  id: number;
  userName: string;
  mobileNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  lastOtpSentDate: string;
};

const Register: FC = () => {
  //states
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUserId] = useState<registerResponse | undefined>();

  //hooks
  const apiCatcher = useApiCatcher();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  //functions
  const onFinish = async (values: any) => {
    setLoading(true);

    await ApiService.post(endpointUrls.register, { ...values, firebaseToken: 'string' })
      .then((res: backendReponse<registerResponse>) => handleApiThen({ res, dispatch, onSuccess: () => setUserId(res.data), notifFail: true, notifSuccess: false }))
      .catch(() => {
        apiCatcher(errorResponse);
      });

    setLoading(false);
  };
  const handleChange = (value: any, values: any) => {
    convertFormValuesToEnglishNumber(value, values, ['mobileNumber'], form, true);
  };

  return (
    <TcCard className='w-full'>
      <>
        <div className='flex flex-col items-center justify-center mb-12'>
          {luLogo('120', '80')}
          <h1 className='text-2xl font-bold text-t-primary-color'>Level Up Dashboard</h1>
        </div>
        <TcDevider orientation='center'>ایجاد حساب کاربری</TcDevider>
        <TcForm form={form} onFinish={onFinish} onValuesChange={handleChange}>
          <div className='flex flex-col gap-2'>
            <TcFormItem
              label='نام'
              name='firstName'
              rules={[
                {
                  required: true,
                  message: 'نام خود را وارد کنید',
                },
              ]}>
              <Input placeholder='نام' />
            </TcFormItem>
            <TcFormItem
              label='نام خانوادگی'
              name='lastName'
              rules={[
                {
                  required: true,
                  message: 'نام خانوادگی خود را وارد کنید',
                },
              ]}>
              <Input placeholder='نام خانوادگی' />
            </TcFormItem>
            <TcFormItem
              label='شماره موبایل'
              name='mobileNumber'
              rules={[
                {
                  required: true,
                  message: 'شماره خود را وارد کنید',
                },
              ]}>
              <Input placeholder='شماره موبایل' />
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
              <Input.Password placeholder='رمز عبور' />
            </TcFormItem>

            <div className='mt-6'>
              <TcFormItem
                label='شماره موبایل معرف'
                name='referrerUserMobileNumber'
                tooltip='با ورود شماره همراه فرد معرف، درصدی از پرداخت های شما در سامانه به حساب آن فرد تخصیص میگردد.'>
                <Input />
              </TcFormItem>
            </div>
          </div>
        </TcForm>
        <div className='flex justify-between mt-6'>
          <Link to={routes.login.path}>
            <TcButton>ورود به حساب</TcButton>
          </Link>
          <TcButton onClick={() => form.submit()}>ایجاد حساب</TcButton>
        </div>
        {loading && <TcCoverLoading />}
        <RegisterToken user={user} close={() => setUserId(undefined)} />
      </>
    </TcCard>
  );
};

export default Register;
