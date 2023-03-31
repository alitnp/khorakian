import { ApiDataResponse, IImage, IPost, IVideoRead } from '@my/types';
import AddVideo from 'components/UI/Video/AddVideo';
import TcCard from 'components/UI/Card/TcCard';
import TcDevider from 'components/UI/Devider/TcDevider';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { useState, useEffect, useCallback } from 'react';
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

  //effect
  useEffect(() => {}, []);

  //function
  const addVideo = useCallback(
    (video: IVideoRead) =>
      setVideos((videos) => {
        if (videos.some((vid) => vid._id === video._id)) return videos;
        return [...videos, video];
      }),
    [videos]
  );
  const addImage = useCallback(
    (image: IImage) =>
      setImages((images) => {
        if (images.some((vid) => vid._id === image._id)) return images;
        return [...images, image];
      }),
    [images]
  );
  // This is a function that is called when a form is submitted
  const handleSubmit = async (values: any) => {
    // If there are no videos or images, show a warning
    if (videos.length + images.length === 0) return dispatch(setNotificationData({ type: 'warning', message: 'هیچ عکس یا ویدیویی انتخاب نشده' }));
    // Set the loading state to true
    setLoading(true);
    // Make a post request to the server
    await ApiService.post(endpointUrls.postCreate, { ...values, videos: videos.map((vid) => vid._id), images: images.map((img) => img._id) })
      // If the request is successful, redirect to the post page
      .then((res: ApiDataResponse<IPost>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.post.path), notifFail: true, notifSuccess: true }))
      // If the request fails, show an error message
      .catch(() => apiCatcher(errorResponse));
    // Set the loading state to false
    setLoading(false);
  };

  const handleRemoveVideo = useCallback((_id: string) => {
    const tempVideos = videos.filter((vid) => vid._id !== _id);
    setVideos([...tempVideos]);
  }, []);
  const handleRemoveImage = useCallback(
    (_id: string) => {
      const tempImages = images.filter((img) => img._id !== _id);
      setImages([...tempImages]);
    },
    [images]
  );

  return (
    <TcCard>
      <TcPageTitle title='ایجاد پست' />
      <TcForm form={form} onFinish={handleSubmit}>
        <TcFormWrapper>{postModel.inputs}</TcFormWrapper>
      </TcForm>
      <TcDevider>ویدیو</TcDevider>
      <AddVideo videos={videos} addVideo={addVideo} removeVideo={handleRemoveVideo} />

      <TcDevider>عکس</TcDevider>
      <AddImage images={images} addImage={addImage} removeImage={handleRemoveImage} />

      <TcFormButtons noCancel submitButtonText='ثبت' onSubmit={() => form.submit()} />
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default PostCreate;
