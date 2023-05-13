import { ApiDataResponse, IDefaultText, IHistory } from '@my/types';
import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { useState } from 'react';
import TcForm from 'components/UI/Form/TcForm';
import { Form } from 'antd';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import { AppDispatch } from 'redux/store';
import { useDispatch } from 'react-redux';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import { useHistory } from 'react-router';
import routes from 'global/Constants/routes';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';
import historyModel from 'global/Models/historyModel';
import { convertAllPropertyToEnNumber, convertFormValuesToEnglishNumber } from 'global/default';

const DefaultTextCreate = () => {
  //states
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const apiCatcher = useApiCatcher();
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const { push } = useHistory();

  //function

  const handleSubmit = async (values: any) => {
    setLoading(true);
    await ApiService.post(endpointUrls.historyCreate, values)
      .then((res: ApiDataResponse<IHistory>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.history.path), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  const changeHandler = (value: any, values: any) => {
    convertFormValuesToEnglishNumber(value, values, ['from', 'to'], form, false);
  };

  return (
    <TcCard back={{ to: routes.history.path }}>
      <TcPageTitle title={'ایجاد ' + historyModel.title} />
      <TcForm form={form} onFinish={handleSubmit} onValuesChange={changeHandler}>
        <TcFormWrapper>{historyModel.inputs}</TcFormWrapper>
        <TcFormButtons noCancel submitButtonText='ثبت' />
      </TcForm>

      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default DefaultTextCreate;
