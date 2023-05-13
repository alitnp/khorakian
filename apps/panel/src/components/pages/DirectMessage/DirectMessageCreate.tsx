import { ApiDataResponse, IExperience } from '@my/types';

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
import experienceModel from 'global/Models/experienceModel';
import directMessageModel from 'global/Models/directMessageModel';

const DirectMessageCreate = () => {
  //states
  const [loading, setLoading] = useState(false);

  //hooks
  const apiCatcher = useApiCatcher();
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const { push } = useHistory();

  //effect
  useEffect(() => {}, []);

  //function
  const handleSubmit = async (values: any) => {
    setLoading(true);
    await ApiService.post(endpointUrls.directMessageCreate, { ...values })
      .then((res: any) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.directMessage.path), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.experience.path }}>
      <TcPageTitle title='ایجاد تجربه' />
      <TcForm form={form} onFinish={handleSubmit}>
        <TcFormWrapper>{directMessageModel.inputs}</TcFormWrapper>
        <TcFormButtons noCancel submitButtonText='ثبت' />
      </TcForm>

      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default DirectMessageCreate;
