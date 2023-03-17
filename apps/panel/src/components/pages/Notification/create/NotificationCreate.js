import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import TcForm from 'components/UI/Form/TcForm';
import { Checkbox, Form } from 'antd';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import { useEffect, useState } from 'react';
import ApiService from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { useDispatch, useSelector } from 'react-redux';
import TcDatePicker from 'components/UI/DatePicker/TcDatePicker';
import TcButton from 'components/UI/Button/TcButton';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import { createNotification } from 'redux/reducer/Notification/createNotification';
import { useHistory } from 'react-router';
import routes from 'global/Constants/routes';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';

const NotificationCreate = () => {
  //states
  const [userList, setUserList] = useState([]);
  const { loading } = useSelector((state) => state.notification);

  //hooks
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  //effects
  useEffect(() => {
    form.setFieldsValue({ SendDate: Date.now(), sendInApp: false, sendSMS: false });
  }, []);

  //functions
  const handleUserSearch = async (fullName) => {
    if (!fullName) return;
    await ApiService.post(endpointUrls.getBriefNoETLPeople, { fullName })
      .then((res) => {
        if (res.isSuccess) setUserList(res.data?.map((item) => ({ label: item.fullName, value: item.id })));
      })
      .catch(() => {});
  };

  const handelSubmit = async (values) => {
    dispatch(createNotification(values, () => history.push(routes.notification.path)));
  };

  return (
    <>
      <TcCard back={{}}>
        <TcPageTitle title='ایجاد اعلان' />
        <TcForm form={form} onFinish={handelSubmit}>
          <TcFormWrapper>
            <TcFormItem label='عنوان' name='title' rules={[{ required: true, message: 'عنوان وارد نشده' }]}>
              <TcInput />
            </TcFormItem>
            <TcFormItem label='فرد گیرنده' name='personId' rules={[{ required: true, message: 'فرد گیرنده وارد نشده' }]}>
              <TcSelect showSearch allowClear filterOption={false} placeholder='نام فرد را وارد کنید' onSearch={handleUserSearch} options={userList} className='w-full' />
            </TcFormItem>
            <TcFormItem label='زمان ارسال' name='SendDate'>
              <TcDatePicker format='dddd DD MMMM YYYY' />
            </TcFormItem>
          </TcFormWrapper>
          <TcFormWrapper>
            <TcFormItem label='در اپ موبایل هم ارسال شود' name='sendInApp' valuePropName='checked'>
              <Checkbox />
            </TcFormItem>
            <TcFormItem label='پیامک هم ارسال شود' name='sendSMS' valuePropName='checked'>
              <Checkbox />
            </TcFormItem>
          </TcFormWrapper>
          <TcFormWrapper singleColumn>
            <TcFormItem label='لینک' name='url'>
              <TcInput type='url' />
            </TcFormItem>
            <TcFormItem label='متن' name='description' rules={[{ required: true, message: 'متن اعلان وارد نشده نشده' }]}>
              <TcTextarea />
            </TcFormItem>
          </TcFormWrapper>
          <div className='flex flex-row-reverse mt-6'>
            <TcButton type='primary' htmlType='submit'>
              ثبت
            </TcButton>
          </div>
        </TcForm>
        {loading && <TcCoverLoading />}
      </TcCard>
    </>
  );
};

export default NotificationCreate;
