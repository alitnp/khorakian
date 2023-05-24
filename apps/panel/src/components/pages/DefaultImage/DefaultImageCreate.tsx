import { ApiDataResponse, IDefaultImageRead, IExperience, IImage, IVideoRead } from '@my/types';
import AddVideo from 'components/UI/Video/AddVideo';
import TcCard from 'components/UI/Card/TcCard';
import TcDevider from 'components/UI/Devider/TcDevider';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { useState } from 'react';
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
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import defaultImageModel from 'global/Models/defaultImageModel';

const DefaultImageCreate = () => {
  //states
  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const apiCatcher = useApiCatcher();
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const { push } = useHistory();

  //function

  const handleSubmit = async (values: any) => {
    if (images.length === 0) return dispatch(setNotificationData({ type: 'warning', message: 'هیچ عکسی انتخاب نشده' }));
    setLoading(true);
    await ApiService.post(endpointUrls.defaultImageCreate, { ...values, image: images[0]._id })
      .then((res: ApiDataResponse<IDefaultImageRead>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.defaultImage.path), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.defaultImage.path }}>
      <TcPageTitle title={'ایجاد ' + defaultImageModel.title} />
      <TcForm form={form} onFinish={handleSubmit}>
        <TcFormWrapper>{defaultImageModel.inputs}</TcFormWrapper>
      </TcForm>

      <TcDevider>عکس</TcDevider>
      <AddImage images={images} setImages={setImages} singleImage />

      <TcFormButtons noCancel submitButtonText='ثبت' onSubmit={() => form.submit()} />
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default DefaultImageCreate;
