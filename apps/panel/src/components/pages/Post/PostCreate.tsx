import { ApiDataResponse, IImage, IPost, IVideoRead } from '@my/types';
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
import postModel from 'global/Models/postModel';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import { AppDispatch } from 'redux/store';
import { useDispatch } from 'react-redux';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import { useHistory } from 'react-router';
import routes from 'global/Constants/routes';

const PostCreate = () => {
  //states
  const [videos, setVideos] = useState<IVideoRead[]>([]);
  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const apiCatcher = useApiCatcher();
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const { push } = useHistory();

  //function
  const handleSubmit = async (values: any) => {
    if (videos.length + images.length === 0) return dispatch(setNotificationData({ type: 'warning', message: 'هیچ عکس یا ویدیویی انتخاب نشده' }));
    if (!!values.eventDate) values.eventDate = values.eventDate.unix * 1000;
    setLoading(true);
    await ApiService.post(endpointUrls.postCreate, { ...values, videos: videos.map((vid) => vid._id), images: images.map((img) => img._id) })
      .then((res: ApiDataResponse<IPost>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.post.path), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.post.path }}>
      <TcPageTitle title='ایجاد پست' />
      <TcForm form={form} onFinish={handleSubmit}>
        <TcFormWrapper>{postModel.inputs}</TcFormWrapper>
      </TcForm>
      <TcDevider>ویدیو</TcDevider>
      <AddVideo videos={videos} setVideos={setVideos} />

      <TcDevider>عکس</TcDevider>
      <AddImage images={images} setImages={setImages} />

      <TcFormButtons noCancel submitButtonText='ثبت' onSubmit={() => form.submit()} />
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default PostCreate;
