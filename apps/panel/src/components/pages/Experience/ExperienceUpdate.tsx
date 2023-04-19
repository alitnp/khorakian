import { ApiDataResponse, IImage, IExperienceRead, IVideoRead, IExperience } from '@my/types';
import AddVideo from 'components/UI/Video/AddVideo';
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
import experienceModel from 'global/Models/experienceModel';

const ExperienceUpdate = () => {
  //states
  const [videos, setVideos] = useState<IVideoRead[]>([]);
  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [experienceDetail, setExperienceDetail] = useState<IExperienceRead>();

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
    await ApiService.get(endpointUrls.experienceDetail(id))
      .then((res: ApiDataResponse<IExperienceRead>) =>
        handleApiThenGeneric({
          res,
          onSuccessData: (data) => {
            console.log(data);

            setExperienceDetail(data);
            form.setFieldsValue(data);
            form.setFieldValue('experienceCategory', data.experienceCategory._id);
            setImages(data.images);
            setVideos(data.videos);
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
    if (videos.length + images.length === 0) return dispatch(setNotificationData({ type: 'warning', message: 'هیچ عکس یا ویدیویی انتخاب نشده' }));
    // Set the loading state to true
    setLoading(true);
    // Make a post request to the server
    await ApiService.put(endpointUrls.experienceEdit(experienceDetail?._id || ''), { ...values, videos: videos.map((vid) => vid._id), images: images.map((img) => img._id) })
      // If the request is successful, redirect to the experience page
      .then((res: ApiDataResponse<IExperience>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.experience.path), notifFail: true, notifSuccess: true }))
      // If the request fails, show an error message
      .catch(() => apiCatcher(errorResponse));
    // Set the loading state to false
    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.experience.path }}>
      <TcPageTitle title='ایجاد تجربه' />
      <TcForm form={form} onFinish={handleSubmit}>
        <TcFormWrapper>{experienceModel.inputs}</TcFormWrapper>
      </TcForm>
      <TcDevider>ویدیو</TcDevider>
      <AddVideo videos={videos} setVideos={setVideos} />

      <TcDevider>عکس</TcDevider>
      <AddImage images={images} setImages={setImages} />

      <TcFormButtons noCancel submitButtonText='ویرایش' onSubmit={() => form.submit()} />
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default ExperienceUpdate;
