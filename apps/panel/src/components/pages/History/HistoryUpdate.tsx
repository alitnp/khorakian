import { ApiDataResponse, IHistory } from '@my/types';
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
import historyModel from 'global/Models/historyModel';
import { convertFormValuesToEnglishNumber } from 'global/default';

const DefaultTextUpdate = () => {
  //states
  const [loading, setLoading] = useState<boolean>(false);

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

  //functions
  const getDetail = async (id: string) => {
    setLoading(true);
    await ApiService.get(endpointUrls.historyDetail(id))
      .then((res: ApiDataResponse<IHistory>) =>
        handleApiThenGeneric({
          res,
          onSuccessData: (data) => {
            form.setFieldsValue(data);
          },
          dispatch,
          notifSuccess: false,
          notifFail: true,
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);
    await ApiService.put(endpointUrls.historyEdit(id as string), values)
      .then((res: ApiDataResponse<IHistory>) => handleApiThen({ res, dispatch, onSuccess: () => push(routes.history.path), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  const changeHandler = (value: any, values: any) => {
    convertFormValuesToEnglishNumber(value, values, ['from', 'to'], form, false);
  };

  return (
    <TcCard back={{ to: routes.defaultText.path }}>
      <TcPageTitle title={' ویرایش ' + historyModel.title} />
      <TcForm form={form} onFinish={handleSubmit} onValuesChange={changeHandler}>
        <TcFormWrapper>{historyModel.inputs}</TcFormWrapper>
        <TcFormButtons noCancel submitButtonText='ثبت' />
      </TcForm>

      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default DefaultTextUpdate;
