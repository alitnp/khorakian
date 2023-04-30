import { ApiDataResponse, IImage, ISocialMedia } from '@my/types';
import TcCard from 'components/UI/Card/TcCard';
import TcDevider from 'components/UI/Devider/TcDevider';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { useState, useEffect } from 'react';
import AddImage from 'components/UI/Image/AddImage';
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
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import { useHistory } from 'react-router';
import routes from 'global/Constants/routes';
import socialMediaModel from 'global/Models/socialMediaModel';

const SocialMediaCreate = () => {
  //states
  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const apiCatcher = useApiCatcher();
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const { push } = useHistory();

  //effect
  useEffect(() => {}, []);

  //function
  const handleSubmit = async (values: any) => {
    if (images.length === 0) return dispatch(setNotificationData({ type: 'warning', message: 'هیچ عکس انتخاب نشده' }));
    setLoading(true);
    await ApiService.post(endpointUrls.socialMediaCreate, { ...values, image: images.map((img) => img._id) })
      .then((res: ApiDataResponse<ISocialMedia>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.socialMedia.path), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.socialMedia.path }}>
      <TcPageTitle title='ایجاد رسانه' />
      <TcForm form={form} onFinish={handleSubmit}>
        <TcFormWrapper>{socialMediaModel.inputs}</TcFormWrapper>
      </TcForm>

      <TcDevider>عکس</TcDevider>
      <AddImage images={images} setImages={setImages} />

      <TcFormButtons noCancel submitButtonText='ثبت' onSubmit={() => form.submit()} />
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default SocialMediaCreate;
