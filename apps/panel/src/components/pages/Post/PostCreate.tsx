import { ApiDataResponse, IVideo } from '@my/types';
import AddVideo from 'components/UI/AddVideo/AddVideo';
import TcButton from 'components/UI/Button/TcButton';
import TcCard from 'components/UI/Card/TcCard';
import TcDevider from 'components/UI/Devider/TcDevider';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { ChangeEvent, useState, useEffect, useCallback } from 'react';

const PostCreate = () => {
  //states
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [showAddVideoModal, setShowAddVideoModal] = useState<boolean>(false);

  //hooks
  const apiCatcher = useApiCatcher();

  //effect
  useEffect(() => {}, []);

  //function
  const toggleShowAddVideo = useCallback(() => setShowAddVideoModal((prevState) => !prevState), []);
  const addVideo = useCallback((video: IVideo) => setVideos((videos) => [...videos, video]), []);
  const handleSubmit = async () => {
    // console.log(file);
    // if (!file) return;
    // const form = new FormData();
    // form.append('file', file);
    // form.append('title', 'asdfasdf');
    // await ApiService.post(endpointUrls.videoUpload, form, { 'content-type': 'multipart/form-data' })
    //   .then((res: ApiDataResponse<any>) => console.log(res))
    //   .catch(() => apiCatcher(errorResponse));
  };

  return (
    <TcCard>
      <TcPageTitle title='ایجاد پست' />

      <TcDevider>ویدیو</TcDevider>
      <div className='flex justify-end'>
        <TcButton className='text-t-secondary-color cursor-pointer hover:underline' onClick={toggleShowAddVideo}>
          افزودن ویدیو
        </TcButton>
      </div>
      <AddVideo visible={showAddVideoModal} close={toggleShowAddVideo} addVideo={addVideo} />
    </TcCard>
  );
};

export default PostCreate;
