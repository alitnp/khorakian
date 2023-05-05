import { ApiDataResponse, IDefaultText } from '@my/types';
import TcCard from 'components/UI/Card/TcCard';
import TcDevider from 'components/UI/Devider/TcDevider';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { useState, useEffect } from 'react';
import TcForm from 'components/UI/Form/TcForm';
import { Form } from 'antd';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import { AppDispatch } from 'redux/store';
import { useDispatch } from 'react-redux';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';
import { handleApiThen, handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import { useHistory } from 'react-router';
import routes from 'global/Constants/routes';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import defaultTextModel from 'global/Models/defaultTextModel';
import useQuery from 'global/helperFunctions/useQuery';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';

const DefaultTextUpdate = () => {
  //states
  const [texts, setTexts] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const apiCatcher = useApiCatcher();
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const { push } = useHistory();
  const { pathnameLastPart: id } = useQuery();

  //effect
  useEffect(() => {
    id && getDetail(id);
  }, [id]);

  //functions
  const getDetail = async (id: string) => {
    setLoading(true);
    await ApiService.get(endpointUrls.defaultTextDetail(id))
      .then((res: ApiDataResponse<IDefaultText>) =>
        handleApiThenGeneric({
          res,
          onSuccessData: (data) => {
            form.setFieldsValue(data);
            setTexts(data.text);
          },
          dispatch,
          notifSuccess: false,
          notifFail: true,
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };
  const handleSubmit = async (values: any) => {
    if (!texts) return dispatch(setNotificationData({ type: 'warning', message: 'هیچ متنی انتخاب نشده' }));
    setLoading(true);
    await ApiService.put(endpointUrls.defaultTextEdit(id as string), {
      ...values,
      text: texts,
    })
      .then((res: ApiDataResponse<IDefaultText>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.defaultText.path), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  const changeHandler = (value: any) => {
    if (value.text) {
      setTexts(value.text);
    }
  };

  return (
    <TcCard back={{ to: routes.defaultText.path }}>
      <TcPageTitle title={' ویرایش ' + defaultTextModel.title} />
      <TcForm form={form} onFinish={handleSubmit} onValuesChange={changeHandler}>
        <TcFormWrapper>
          <TcFormItem name='key' label='کلید' rules={[{ required: true, message: 'کلید تعیین نشده' }]}>
            <TcInput placeholder='کلید' />
          </TcFormItem>
          <TcFormItem name='persianKey' label='کلید فارسی' rules={[{ required: true, message: 'کلید تعیین نشده' }]}>
            <TcInput placeholder='کلید فارسی' />
          </TcFormItem>
          <TcFormItem name='text' label='متن' rules={[{ required: true, message: 'متن تعیین نشده' }]}>
            <TcTextarea placeholder='متن' />
          </TcFormItem>
        </TcFormWrapper>
      </TcForm>

      <TcFormButtons noCancel submitButtonText='ثبت' onSubmit={() => form.submit()} />
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default DefaultTextUpdate;
