import { ApiDataResponse, IUserExperienceRead, IUserExperience } from '@my/types';
import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { useState, useEffect } from 'react';
import TcForm from 'components/UI/Form/TcForm';
import { Form } from 'antd';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import { AppDispatch } from 'redux/store';
import { useDispatch } from 'react-redux';
import { handleApiThen, handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import { useHistory } from 'react-router';
import routes from 'global/Constants/routes';
import useQuery from 'global/helperFunctions/useQuery';
import userExperienceModel from 'global/Models/userExperienceModel';

const UserExperienceUpdate = () => {
  //states
  const [loading, setLoading] = useState<boolean>(false);
  const [userExperienceDetail, setUserExperienceDetail] = useState<IUserExperienceRead>();

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
    await ApiService.get(endpointUrls.userExperienceDetail(id))
      .then((res: ApiDataResponse<IUserExperienceRead>) =>
        handleApiThenGeneric({
          res,
          onSuccessData: (data) => {
            console.log(data);
            setUserExperienceDetail(data);
            form.setFieldsValue(data);
            form.setFieldValue('userExperienceCategory', data.userExperienceCategory._id);
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
    // Set the loading state to true
    setLoading(true);
    // Make a post request to the server
    await ApiService.put(endpointUrls.userExperienceEdit(userExperienceDetail?._id || ''), { ...values })
      // If the request is successful, redirect to the userExperience page
      .then((res: ApiDataResponse<IUserExperience>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.userExperience.path), notifFail: true, notifSuccess: true }))
      // If the request fails, show an error message
      .catch(() => apiCatcher(errorResponse));
    // Set the loading state to false
    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.userExperience.path }}>
      <TcPageTitle title='ایجاد تجربه کاربران' />
      <TcForm form={form} onFinish={handleSubmit}>
        <TcFormWrapper>{userExperienceModel.inputs}</TcFormWrapper>
      </TcForm>

      <TcFormButtons noCancel submitButtonText='ویرایش' onSubmit={() => form.submit()} />
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default UserExperienceUpdate;
