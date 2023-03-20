import { ApiDataResponse } from '@my/types';
import TcButton from 'components/UI/Button/TcButton';
import TcCard from 'components/UI/Card/TcCard';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { ChangeEvent, useState } from 'react';

const PostCreate = () => {
  //states
  const [file, setFile] = useState<File | null>();

  //hooks
  const apiCatcher = useApiCatcher();

  //function
  const handleSubmit = async () => {
    console.log(file);
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    form.append('title', 'asdfasdf');
    await ApiService.post(endpointUrls.imageUpload, form, { 'content-type': 'multipart/form-data' })
      .then((res: ApiDataResponse<any>) => console.log(res))
      .catch(() => apiCatcher(errorResponse));
  };

  return (
    <TcCard>
      <TcPageTitle title='ایجاد پست' />
      <input type='file' onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files && e.target.files[0])} multiple={false} />
      <TcButton onClick={handleSubmit}>asdf</TcButton>
    </TcCard>
  );
};

export default PostCreate;
