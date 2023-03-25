import { ApiDataResponse, IImage } from '@my/types';
import TcCard from 'components/UI/Card/TcCard';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcForm from 'components/UI/Form/TcForm';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import imageModel from 'global/Models/ImageModel';
import { FC, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';
import { AppDispatch } from 'redux/store';

const ImageCreate: FC = () => {
  //states
  const [title, setTitle] = useState<string>('');
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const dispatch: AppDispatch = useDispatch();
  const apiCatcher = useApiCatcher();
  const { push } = useHistory();

  //functions
  const handleFinish = async () => {
    if (!imageFiles || imageFiles.length === 0) return dispatch(setNotificationData({ type: 'error', message: 'فایل انتخاب نشده' }));

    const formData = new FormData();
    formData.append('file', imageFiles[0]);
    formData.append('title', title);
    setLoading(true);
    await ApiService.post(endpointUrls.imageUpload, formData)
      .then((res: ApiDataResponse<IImage>) =>
        handleApiThenGeneric<ApiDataResponse<IImage>, IImage>({ res, onSuccessData: () => push(routes.image.path), notifFail: true, notifSuccess: true })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };
  return (
    <TcCard back={{ to: routes.image.path }}>
      <TcPageTitle title={'ایجاد ' + imageModel.title} />
      <TcForm onFinish={handleFinish}>
        <TcFormItem label='عنوان SEO'>
          <TcInput placeholder='عنوان عکس برای بهبود SEO استفاده می شود' value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
        </TcFormItem>
        <TcFormItem label='فایل عکس'>
          <TcInput type='file' accept='image/*' onChange={(e: ChangeEvent<HTMLInputElement>) => setImageFiles(e.target.files)} />
        </TcFormItem>
        <TcFormButtons noCancel submitButtonText='ثبت' />
      </TcForm>
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default ImageCreate;
