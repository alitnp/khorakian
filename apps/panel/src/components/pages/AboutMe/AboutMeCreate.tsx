import { ApiDataResponse, IAboutMe, IPost } from '@my/types';
import TcCard from 'components/UI/Card/TcCard';
import TcDevider from 'components/UI/Devider/TcDevider';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { useState, useEffect } from 'react';
import IAddPost from 'components/UI/Post/AddPost';
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
import aboutMeModel from 'global/Models/aboutMeModel';

const AboutMeCreate = () => {
  //states
  const [post, setPost] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const apiCatcher = useApiCatcher();
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const { push } = useHistory();

  //effect
  useEffect(() => {}, []);

  //function
  const handleSubmit = async () => {
    if (post.length === 0) return dispatch(setNotificationData({ type: 'warning', message: 'هیچ پستی انتخاب نشده' }));
    setLoading(true);
    await ApiService.post(endpointUrls.aboutMeCreate, { postId: post[0]._id })
      .then((res: ApiDataResponse<IAboutMe>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.aboutMe.path), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.aboutMe.path }}>
      <TcPageTitle title='ایجاد' />

      <TcDevider>پست</TcDevider>
      <IAddPost posts={post} setPosts={setPost} singlePost />

      <TcFormButtons noCancel submitButtonText='ثبت' onSubmit={handleSubmit} />
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default AboutMeCreate;
