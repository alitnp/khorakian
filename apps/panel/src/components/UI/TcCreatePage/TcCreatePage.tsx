import { Form } from 'antd';
import TcCard from 'components/UI/Card/TcCard';
import TcForm from 'components/UI/Form/TcForm';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import ApiService, { errorResponse } from 'config/API/ApiService';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { FC, ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

interface ITcCreatePage {
  children: ReactNode;
  title: string;
  subTitle?: string;
  backRoute: string;
  onValuesChange?: (_value: any, _values: any) => void;
  submitEndpoint: string;
}

const TcCreatePage: FC<ITcCreatePage> = ({ children, title, subTitle, backRoute, onValuesChange, submitEndpoint }) => {
  //states
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const apiCatcher = useApiCatcher();

  //functions
  const handleSubmit = async (values: any) => {
    setLoading(true);
    await ApiService.post(submitEndpoint, values)
      .then((res: any) => handleApiThen({ res, dispatch, onSuccess: () => push(backRoute), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard>
      <TcPageTitle title={'ثبت ' + title} subTitle={subTitle} />
      <TcForm form={form} onFinish={handleSubmit} onValuesChange={onValuesChange}>
        <TcFormWrapper>{children}</TcFormWrapper>
        <div className='mt-6'>
          <TcFormButtons cancelButtonText='بازگشت' onCancel={() => push(backRoute)} submitButtonText='ثبت' />
        </div>
      </TcForm>
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default TcCreatePage;
