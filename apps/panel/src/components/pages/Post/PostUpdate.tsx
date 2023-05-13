import { ApiDataResponse, IImage, IPost, IPostRead, IVideoRead } from '@my/types';
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
import { handleApiThen, handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import { useHistory } from 'react-router';
import routes from 'global/Constants/routes';
import useQuery from 'global/helperFunctions/useQuery';

const PostUpdate = () => {
  //states
  const [videos, setVideos] = useState<IVideoRead[]>([]);
  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [postDetail, setPostDetail] = useState<IPostRead>();

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
    await ApiService.get(endpointUrls.postDetail(id))
      .then((res: ApiDataResponse<IPostRead>) =>
        handleApiThenGeneric({
          res,
          onSuccessData: (data) => {
            setPostDetail(data);
            form.setFieldsValue(data);
            form.setFieldValue('postCategory', data.postCategory._id);
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

    if (!!values.eventDate) values.eventDate = values.eventDate.unix * 1000;
    // Set the loading state to true
    setLoading(true);
    // Make a post request to the server
    await ApiService.put(endpointUrls.postEdit(postDetail?._id || ''), { ...values, videos: videos.map((vid) => vid._id), images: images.map((img) => img._id) })
      // If the request is successful, redirect to the post page
      .then((res: ApiDataResponse<IPost>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.post.path), notifFail: true, notifSuccess: true }))
      // If the request fails, show an error message
      .catch(() => apiCatcher(errorResponse));
    // Set the loading state to false
    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.post.path }}>
      <TcPageTitle title='ویرایش پست' />
      <TcForm form={form} onFinish={handleSubmit}>
        <TcFormWrapper>{postModel.inputs}</TcFormWrapper>
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

export default PostUpdate;
