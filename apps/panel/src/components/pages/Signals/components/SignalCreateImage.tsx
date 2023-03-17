import TcButton from 'components/UI/Button/TcButton';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { FC, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotificationData } from 'redux/reducer/Toast/toastReducer';
import { AppDispatch } from 'redux/store';

interface ISignalCreateImage {
  image: File[];
  setImage: (_image: File[]) => void;
}

const SignalCreateImage: FC<ISignalCreateImage> = ({ image, setImage }) => {
  //state
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const dispatch: AppDispatch = useDispatch();
  const apiCatcher = useApiCatcher();

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
    await ApiService.post(endpointUrls.signalUploadImage, form, {
      'Content-Type': 'multipart/form-data',
    })
      .then((res: any) => {
        if (res.isSuccess) {
          console.log(res);
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        apiCatcher(errorResponse);
      });
  };

  return (
    <>
      <div className='py-4 my-4 border-y'>
        <div className='flex justify-between'>
          <input type='file' className='hidden' ref={fileInputRef} onChange={handleFileSelect} accept='image/*' />
          <span>عکس سیگنال</span>
          <TcButton onClick={openFileInputWindow}>انتخاب فایل</TcButton>
        </div>
        <div className='flex justify-end'>{/* <small>{image?.name || 'عکس انتخاب نشده'}</small> */}</div>
      </div>
    </>
  );
};

export default SignalCreateImage;
