import { ApiDataResponse, IVideo } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcForm from 'components/UI/Form/TcForm';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcModal from 'components/UI/Modal/TcModal';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { ChangeEvent, FC, memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';
import { AppDispatch } from 'redux/store';
import { handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';

interface IAddVideo {
  visible: boolean;
  addVideo: (_video: IVideo) => void;
  close(): void;
}

const AddVideo: FC<IAddVideo> = ({ visible, addVideo, close }) => {
  //states
  const [title, setTitle] = useState<string>('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const dispatch: AppDispatch = useDispatch();
  const apiCatcher = useApiCatcher();

  //functions
  const handleFinish = async () => {
    if (!files || files.length === 0) return dispatch(setNotificationData({ type: 'error', message: 'فایل انتخاب نشده' }));
    if (!title) return dispatch(setNotificationData({ type: 'error', message: 'عنوان تعیین نشده' }));

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('title', title);
    setLoading(true);
    await ApiService.post(endpointUrls.videoUpload, formData)
      .then((res: ApiDataResponse<IVideo>) => handleApiThenGeneric<ApiDataResponse<IVideo>, IVideo>({ res, onSuccessData: addVideo, notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
    close();
  };

  return (
    <TcModal visible={visible} title='انتخاب ویدیو' footer={false} onCancel={close}>
      <TcForm onFinish={handleFinish}>
        <TcFormItem label='عنوان'>
          <TcInput placeholder='عنوان' value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
        </TcFormItem>
        <TcFormItem label='فایل ویدیو' name='file'>
          <TcInput type='file' accept='video/*' onChange={(e: ChangeEvent<HTMLInputElement>) => setFiles(e.target.files)} />
        </TcFormItem>
        <TcFormButtons onCancel={close} submitButtonText='ثبت' cancelButtonText='بازگشت' />
      </TcForm>
      {loading && <TcCoverLoading />}
    </TcModal>
  );
};

export default memo(AddVideo);
