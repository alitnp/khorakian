import { ApiDataResponse, IDefaultText } from '@my/types';
import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { useState } from 'react';
import TcForm from 'components/UI/Form/TcForm';
import { Form } from 'antd';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import { AppDispatch } from 'redux/store';
import { useDispatch } from 'react-redux';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import { useHistory } from 'react-router';
import routes from 'global/Constants/routes';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import defaultTextModel from 'global/Models/defaultTextModel';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';

const DefaultTextCreate = () => {
  //states
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const apiCatcher = useApiCatcher();
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const { push } = useHistory();

  //function

  const handleSubmit = async (values: any) => {
    if (!text) return dispatch(setNotificationData({ type: 'warning', message: 'هیچ متنی انتخاب نشده' }));
    setLoading(true);
    await ApiService.post(endpointUrls.defaultTextCreate, {
      ...values,
      text: text,
    })
      .then((res: ApiDataResponse<IDefaultText>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.defaultText.path), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  console.log(text);

  const changeHandler = (value: any) => {
    if (value.text) {
      setText(value.text);
    }
  };

  return (
    <TcCard back={{ to: routes.defaultText.path }}>
      <TcPageTitle title={'ایجاد ' + defaultTextModel.title} />
      <TcForm form={form} onFinish={handleSubmit} onValuesChange={changeHandler}>
        <TcFormWrapper>
          {' '}
          <TcFormItem name='text' label='متن' rules={[{ required: true, message: 'متن تعیین نشده' }]}>
            <TcTextarea size='small' placeholder='متن' />
          </TcFormItem>
          <TcFormItem name='key' label='کلید' rules={[{ required: true, message: 'کلید تعیین نشده' }]}>
            <TcInput placeholder='کلید' />
          </TcFormItem>
        </TcFormWrapper>
      </TcForm>

      <TcFormButtons noCancel submitButtonText='ثبت' onSubmit={() => form.submit()} />
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default DefaultTextCreate;
