import { Form } from 'antd';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcSelectReduxSearch from 'components/UI/Form/Inputs/TcSelectReduxSearch';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import TcForm from 'components/UI/Form/TcForm';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcModal from 'components/UI/Modal/TcModal';
import TcShowInfo from 'components/UI/ShowInfo/TcShowInfo';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { convertFormValuesToEnglishDouble, convertFormValuesToEnglishNumber } from 'global/default';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { signal } from 'global/Models/SignalModels';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllSignalResultTypes } from 'redux/reducer/signalResultTypes/getAllSignalResultTypes';

interface ISetSignalResultModal {
  signal: signal | undefined;
  close(): void;
}

const SetSignalResultModal: FC<ISetSignalResultModal> = ({ signal, close }) => {
  //states
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();

  //functions
  const handleChange = (value: any, values: any) => {
    convertFormValuesToEnglishDouble(value, values, ['finalPips'], form, true);
  };
  const handleClose = () => {
    form.resetFields();
    close();
  };
  const handleSubmit = async (values: any) => {
    values.finalPips = parseFloat(values.finalPips);
    setLoading(true);
    await ApiService.post(endpointUrls.signalSetResult, {
      ...values,
      signalId: signal?.id,
    })
      .then((res: any) => handleApiThen({ res, dispatch, onSuccess: () => handleClose(), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcModal onCancel={handleClose} visible={!!signal} title='تعیین نتیجه' footer={null}>
      <div className='py-4'>
        <TcFormWrapper>
          <TcShowInfo right='نماد' left={signal?.symbolName} />
          <TcShowInfo right='وضعیت' left={signal?.status} />
          <TcShowInfo right='پیپ مورد انتظار' left={signal?.expectedPips} />
          <TcShowInfo right='نوع' left={signal?.signalType} />
        </TcFormWrapper>
      </div>
      <TcForm form={form} onValuesChange={handleChange} onFinish={handleSubmit}>
        <TcFormItem label='نوع نتیجه سیگنال' name='signalResultTypeId' rules={[{ required: true, message: 'فیلد اجباری' }]}>
          <TcSelectReduxSearch reducerName='signalResultTypes' reducerListProperty='list' getlist={getAllSignalResultTypes} />
        </TcFormItem>
        <TcFormItem name='finalPips' label='پیپ نهایی'>
          <TcInput />
        </TcFormItem>
        <TcFormItem name='description' label='شرح' full>
          <TcTextarea />
        </TcFormItem>
        <TcFormButtons noCancel submitButtonText='ثبت' />
      </TcForm>
      {loading && <TcCoverLoading />}
    </TcModal>
  );
};

export default SetSignalResultModal;
