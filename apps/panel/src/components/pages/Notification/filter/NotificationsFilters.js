import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';
import TcForm from 'components/UI/Form/TcForm';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import ApiService from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { useState } from 'react';

import { useSelector } from 'react-redux';

const NotificationsFilters = ({ handleSubmit, form }) => {
  //states
  const { loading } = useSelector((state) => state.ticket);
  const [userList, setUserList] = useState([]);

  //functions
  const handleReset = () => form.resetFields();
  //functions
  const handleUserSearch = async (fullName) => {
    if (!fullName) return;
    await ApiService.post(endpointUrls.getBriefNoETLPeople, { fullName })
      .then((res) => {
        if (res.isSuccess) setUserList(res.data?.map((item) => ({ label: item.fullName, value: item.id })));
      })
      .catch(() => {});
  };

  return (
    <>
      <TcForm onFinish={handleSubmit} form={form}>
        <TcFormWrapper>
          <TcFormItem label='عنوان' name='title'>
            <TcInput placeholder='عنوان' disabled={loading} />
          </TcFormItem>
          <TcFormItem label='فرد گیرنده' name='personId'>
            <TcSelect showSearch allowClear filterOption={false} placeholder='نام فرد را وارد کنید' onSearch={handleUserSearch} options={userList} className='w-full' />
          </TcFormItem>
          <TcFormItem label='لینک' name='url'>
            <TcInput placeholder='لینک' disabled={loading} />
          </TcFormItem>
          <TcFormItem label='دیده شده' name='seen'>
            <TcSelect
              showSearch={false}
              placeholder='دیده شده'
              disabled={loading}
              options={[
                { label: 'بلی', value: true },
                { label: 'خیر', value: false },
              ]}
            />
          </TcFormItem>
          <TcFormItem label='پیامک ارسال شده' name='sendSMS'>
            <TcSelect
              showSearch={false}
              placeholder='پیامک ارسال شده'
              disabled={loading}
              options={[
                { label: 'بلی', value: true },
                { label: 'خیر', value: false },
              ]}
            />
          </TcFormItem>
          <TcFormItem label='به اپ موبایل ارسال شده' name='sendInApp'>
            <TcSelect
              showSearch={false}
              placeholder='به اپ موبایل ارسال شده'
              disabled={loading}
              options={[
                { label: 'بلی', value: true },
                { label: 'خیر', value: false },
              ]}
            />
          </TcFormItem>
          <TcFormButtons onCancel={handleReset} loading={loading} />
        </TcFormWrapper>
      </TcForm>
    </>
  );
};

export default NotificationsFilters;
