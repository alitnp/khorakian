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
import useQuery from 'global/helperFunctions/useQuery';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

interface ITcEditPage {
  children: ReactNode;
  title: string;
  subTitle?: string;
  backRoute: string;
  onValuesChange?: (_value: any, _values: any) => void;
  submitEndpoint: (_id: number | string) => string;
  getEndpoint: (_id: number | string) => string;
}

const TcEditPage: FC<ITcEditPage> = ({ children, title, subTitle, backRoute, onValuesChange, submitEndpoint, getEndpoint }) => {
  //states
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<any>();

  //hooks
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const apiCatcher = useApiCatcher();
  const { pathnameLastPart: id } = useQuery();

  //effect
  useEffect(() => {
    id && handleGet(id);
  }, [id]);

  //functions
  const handleGet = async (id: number | string) => {
    setLoading(true);
    await ApiService.get(getEndpoint(id), { id })
      .then((res: any) =>
        handleApiThen({
          res,
          dispatch,
          onSuccess: (data) => {
            setFetchedData(data);
            form.setFieldsValue(data);
          },
          dataOnly: true,
          notifFail: true,
          notifSuccess: false,
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);

    await ApiService.put(submitEndpoint(fetchedData._id), { ...fetchedData, ...values })
      .then((res: any) => handleApiThen({ res, dispatch, onSuccess: () => push(backRoute), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard>
      <TcPageTitle title={'ویرایش ' + title} subTitle={subTitle} />
      <TcForm form={form} onFinish={handleSubmit} onValuesChange={onValuesChange}>
        <TcFormWrapper>{children}</TcFormWrapper>
        <div className='mt-6'>
          <TcFormButtons cancelButtonText='بازگشت' onCancel={() => push(backRoute)} submitButtonText='ویرایش' submitButtonProps={{ disabled: !fetchedData }} />
        </div>
      </TcForm>
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default TcEditPage;
