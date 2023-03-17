import TcForm from 'components/UI/Form/TcForm';
import { Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { logout } from 'redux/reducer/Login/loginReducer';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcButton from 'components/UI/Button/TcButton';
import { InfoCircleOutlined } from '@ant-design/icons';

const ChangePassword = ({ afterFinish, fullWidth }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile.value);
  const apiCatcher = useApiCatcher();

  function showConfirm() {
    Modal.warning({
      keyboard: false,
      title: 'تغییر رمز عبور موفقیت انجام شد',
      okText: 'باشه',
      content: 'جهت امنیت حساب کاربریتان لطفاً دوباره وارد شوید',
      onOk() {
        dispatch(logout());
      },
    });
  }

  const onFinish = async (values) => {
    const payload = {
      userName: profileData.userName,
      newPassword: values.newPassword,
      currentPassword: values.oldPassword,
    };
    if (values) {
      await ApiService.post(endpointUrls.changePasswordUser, payload)
        .then((res) => {
          if (res.isSuccess) {
            form.resetFields();
            showConfirm();
          } else {
            dispatch(setNotificationData({ message: res.message, type: 'error', time: 5000 }));
          }
        })
        .catch(() => {
          apiCatcher(errorResponse);
          form.resetFields();
        });
    }
    afterFinish && afterFinish();
  };

  return (
    <TcForm layout='vertical' name='changePassword' onFinish={onFinish} form={form}>
      <div className='mt-4 text-xs'>
        <p>
          <InfoCircleOutlined /> رمز عبور حداقل ۶ کاراکتر
        </p>
        <p>
          <InfoCircleOutlined /> رمز عبور حداقل شامل یک حرف و یک عدد
        </p>
      </div>
      <TcFormWrapper singleColumn className={`w-full ${!fullWidth && 'sm:w-1/2'}`}>
        <TcFormItem
          label='رمز عبور قدیمی'
          name='oldPassword'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'رمز عبور را وارد کنید',
            },
          ]}>
          <Input.Password />
        </TcFormItem>
        <TcFormItem
          label='رمز عبور جدید'
          name='newPassword'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'رمز عبور را وارد کنید',
            },
            {
              min: 8,
              message: 'رمز عبور باید بیشتر از 8 کاراکتر باشد',
            },
          ]}>
          <Input.Password />
        </TcFormItem>
        <TcFormItem
          label='تکرار رمز عبور'
          name='confirmPassword'
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'رمز عبور را وارد کنید',
            },
            {
              min: 6,
              message: 'رمز عبور باید بیشتر از ۶ کاراکتر باشد',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('رمز عبور یکسان نیستند'));
              },
            }),
          ]}>
          <Input.Password />
        </TcFormItem>
      </TcFormWrapper>
      <div className='flex justify-end mt-6'>
        <TcButton type='primary' htmlType='تغییر رمز عبور'>
          تغییر رمز عبور
        </TcButton>
      </div>
    </TcForm>
  );
};

export default ChangePassword;
