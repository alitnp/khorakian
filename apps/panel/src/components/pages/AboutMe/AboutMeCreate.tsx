import { ApiDataResponse, IAboutMe, IPostRead } from '@my/types';
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
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcInput from 'components/UI/Form/Inputs/TcInput';

const AboutMeCreate = () => {
  //states
  const [post, setPost] = useState<IPostRead[]>([]);
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
    if (post.length === 0) return dispatch(setNotificationData({ type: 'warning', message: 'هیچ پستی انتخاب نشده' }));
    setLoading(true);
    await ApiService.post(endpointUrls.aboutMeCreate, { ...values, postId: post[0]._id })
      .then((res: ApiDataResponse<IAboutMe>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.aboutMe.path), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.aboutMe.path }}>
      <TcPageTitle title='ایجاد' />
      <TcForm onFinish={handleSubmit} form={form}>
        <TcFormWrapper>
          <TcFormItem label='نام فرد' name='name' rules={[{ required: true, message: 'نام فرد تعیین نشده' }]}>
            <TcInput placeholder='نام فرد' />
          </TcFormItem>
          <TcFormItem label='سمت' name='position' rules={[{ required: true, message: 'سمت تعیین نشده' }]}>
            <TcInput placeholder='سمت' />
          </TcFormItem>
          <TcFormItem label='متن' name='text' rules={[{ required: true, message: 'متن تعیین نشده' }]}>
            <TcInput placeholder='متن' />
          </TcFormItem>
        </TcFormWrapper>
      </TcForm>

      <TcDevider>پست</TcDevider>
      <IAddPost posts={post} setPosts={setPost} singlePost />

      <TcFormButtons noCancel submitButtonText='ثبت' onSubmit={() => form.submit()} />
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default AboutMeCreate;
