import { Form } from 'antd';
import TcSelectReduxSearch from 'components/UI/Form/Inputs/TcSelectReduxSearch';
import TcForm from 'components/UI/Form/TcForm';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcModal from 'components/UI/Modal/TcModal';
import TcShowInfo from 'components/UI/ShowInfo/TcShowInfo';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { backendReponse } from 'global/Models/globalModels';
import { user } from 'global/Models/UserModels';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPackages } from 'redux/reducer/packages/getAllPackages';
import { AppDispatch } from 'redux/store';

interface IActivePackageModal {
  user: user | undefined;
  close(): void;
}

const ActivePackageModal: FC<IActivePackageModal> = ({ user, close }) => {
  //state
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const apiCatcher = useApiCatcher();

  //functions
  const handleSubmit = async ({ packageId }: { packageId: number }) => {
    setLoading(true);
    await ApiService.post(endpointUrls.packagesActiveForUser, { packageId, userId: user?.id })
      .then((res: backendReponse<null>) => handleApiThen({ res, dispatch, notifFail: true, notifSuccess: true, onSuccess: close }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcModal visible={!!user} title='فعال سازی بسته' onCancel={close} footer={null}>
      <div className='flex flex-col gap-4 pt-4'>
        <TcFormWrapper>
          <TcShowInfo right='نام' left={user?.fullName} />
          <TcShowInfo right='شماره همراه' left={user?.mobileNumber} />
        </TcFormWrapper>
        <TcForm form={form} onFinish={handleSubmit}>
          <TcFormItem label='انتخاب بسته' name='packageId' required>
            <TcSelectReduxSearch getlist={getAllPackages} reducerListProperty='list' reducerName='packages' />
          </TcFormItem>
          <TcFormButtons noCancel submitButtonText='ثبت' />
        </TcForm>
      </div>
      {loading && <TcCoverLoading />}
    </TcModal>
  );
};

export default ActivePackageModal;
