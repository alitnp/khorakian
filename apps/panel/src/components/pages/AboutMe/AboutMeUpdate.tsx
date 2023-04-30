import { ApiDataResponse, IImage, IAboutMe, IAboutMeRead, IVideoRead, IPostRead, IPost } from '@my/types';
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
import aboutMeModel from 'global/Models/aboutMeModel';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import { AppDispatch } from 'redux/store';
import { useDispatch } from 'react-redux';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';
import { handleApiThen, handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import { useHistory } from 'react-router';
import routes from 'global/Constants/routes';
import useQuery from 'global/helperFunctions/useQuery';
import AddPost from 'components/UI/Post/AddPost';

const AboutMeUpdate = () => {
  //states
  const [posts, setPosts] = useState<IPost[]>([]);
  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [aboutMeDetail, setAboutMeDetail] = useState<IAboutMeRead>();

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
    await ApiService.get(endpointUrls.aboutMeDetail(id))
      .then((res: ApiDataResponse<IAboutMeRead>) =>
        handleApiThenGeneric({
          res,
          onSuccessData: (data) => {
            setAboutMeDetail(data);
            form.setFieldsValue(data);
            console.log(data);

            setImages(data.images);
            setPosts(data.posts);
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
    if (posts.length + images.length === 0) return dispatch(setNotificationData({ type: 'warning', message: 'هیچ عکس یا ویدیویی انتخاب نشده' }));
    // Set the loading state to true
    setLoading(true);
    // Make a aboutMe request to the server
    await ApiService.put(endpointUrls.aboutMeEdit(aboutMeDetail?._id || ''), { ...values, videos: posts.map((vid) => vid._id), images: images.map((img) => img._id) })
      // If the request is successful, redirect to the aboutMe page
      .then((res: ApiDataResponse<IAboutMe>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.aboutMe.path), notifFail: true, notifSuccess: true }))
      // If the request fails, show an error message
      .catch(() => apiCatcher(errorResponse));
    // Set the loading state to false
    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.aboutMe.path }}>
      <TcPageTitle title='ویرایش' />
      <TcForm form={form} onFinish={handleSubmit}>
        <TcFormWrapper>{aboutMeModel.inputs}</TcFormWrapper>
      </TcForm>
      <TcDevider>عکس</TcDevider>
      <AddImage images={images} setImages={setImages} />

      <TcDevider>پست</TcDevider>
      <AddPost posts={posts} setPosts={setPosts} />

      <TcFormButtons noCancel submitButtonText='ویرایش' onSubmit={() => form.submit()} />
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default AboutMeUpdate;
