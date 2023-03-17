import TcButton from 'components/UI/Button/TcButton';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { backendReponse } from 'global/Models/globalModels';
import { FC, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';

interface ISignalImageManage {
  thumbnail: string | undefined;
  setThumbnail: (_contentImage: string) => void;
}

const ContentImageManage: FC<ISignalImageManage> = ({ thumbnail, setThumbnail }) => {
  //states
  const [loading, setLoading] = useState<boolean>(false);
  //hooks
  const dispatch = useDispatch();
  const apiCathcer = useApiCatcher();

  //ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  //constants
  const attachSizeLimit = 5;

  //functions
  const openFileInputWindow = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]?.size > attachSizeLimit * 1000000)
      return dispatch(setNotificationData({ message: `حداکثر حجم فایل قابل پیوست ${attachSizeLimit} مگابایت می باشد.`, type: 'warning' }));

    if (e.target.files && e.target?.files?.length > 0) handleFileUpload(e.target.files[0]);
  };

  const handleFileUpload = async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    setLoading(true);
    await ApiService.post(endpointUrls.contentUploadImage, form, {
      'Content-Type': 'multipart/form-data',
    })
      .then((res: backendReponse<string>) => {
        if (res.isSuccess) setThumbnail(res.data);
      })
      .catch(() => {
        apiCathcer(errorResponse);
      });
    setLoading(false);
  };

  return (
    <>
      <div className='flex items-center mb-4 gap-x-2'>
        <h2 className='whitespace-nowrap text-t-primary-color'>تعیین عکس ها</h2>
        <hr className='w-full' />
        <TcButton onClick={openFileInputWindow}>افزودن عکس</TcButton>
      </div>
      <input type='file' className='hidden' ref={fileInputRef} onChange={handleFileSelect} accept='image/*' />
      {thumbnail && (
        <div className='grid w-full grid-cols-5 gap-4'>
          <div className='overflow-hidden rounded-md shadow-md'>
            <div className='w-full aspect-square'>
              <img src={endpointUrls.imageBaseUrl + thumbnail} className='object-cover w-full h-full' />
            </div>
            {/* <div className='flex items-center justify-center py-1'>
            <TcDeleteIcon onConfirm={() => handleDeleteImage(thumbnail)} />
          </div> */}
          </div>
        </div>
      )}

      {loading && <TcCoverLoading />}
    </>
  );
};

export default ContentImageManage;
