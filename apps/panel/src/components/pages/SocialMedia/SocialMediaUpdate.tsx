import { ApiDataResponse, IImage, IPost, ISocialMediaRead } from '@my/types';
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
import { handleApiThen, handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import { useHistory } from 'react-router';
import routes from 'global/Constants/routes';
import useQuery from 'global/helperFunctions/useQuery';
import socialMediaModel from 'global/Models/socialMediaModel';

const SocialMediaUpdate = () => {
  //states
  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [socialMediaDetail, setSocialMediaDetail] = useState<ISocialMediaRead>();

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

  //function
  const getDetail = async (id: string) => {
    setLoading(true);
    await ApiService.get(endpointUrls.socialMediaDetail(id))
      .then((res: ApiDataResponse<ISocialMediaRead>) =>
        handleApiThenGeneric({
          res,
          onSuccessData: (data) => {
            console.log(data);
            setSocialMediaDetail(data);
            form.setFieldsValue(data);
            setImages([data.image]);
          },
          dispatch,
          notifSuccess: false,
          notifFail: true,
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  // This is a function that is called when a form is submitted
  const handleSubmit = async (values: any) => {
    // If there are no videos or images, show a warning
    if (!images) return dispatch(setNotificationData({ type: 'warning', message: 'هیچ عکس انتخاب نشده' }));
    // Set the loading state to true
    setLoading(true);
    // Make a post request to the server
    await ApiService.put(endpointUrls.socialMediaEdit(socialMediaDetail?._id || ''), { ...values, image: images.map((img) => img._id) })
      // If the request is successful, redirect to the social page
      .then((res: ApiDataResponse<IPost>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.socialMedia.path), notifFail: true, notifSuccess: true }))
      // If the request fails, show an error message
      .catch(() => apiCatcher(errorResponse));
    // Set the loading state to false
    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.socialMedia.path }}>
      <TcPageTitle title='ویرایش رسانه' />
      <TcForm form={form} onFinish={handleSubmit}>
        <TcFormWrapper>{socialMediaModel.inputs}</TcFormWrapper>
      </TcForm>

      <TcDevider>عکس</TcDevider>
      <AddImage images={images} setImages={setImages} />

      <TcFormButtons noCancel submitButtonText='ویرایش' onSubmit={() => form.submit()} />
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default SocialMediaUpdate;
