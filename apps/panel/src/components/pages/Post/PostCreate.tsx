import { IVideo } from '@my/types';
import AddVideo from 'components/UI/Video/AddVideo';
import TcButton from 'components/UI/Button/TcButton';
import TcCard from 'components/UI/Card/TcCard';
import TcDevider from 'components/UI/Devider/TcDevider';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { useState, useEffect, useCallback } from 'react';
import VideoItem from 'components/UI/Video/VideoItem';

const PostCreate = () => {
  //states
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [showAddVideoModal, setShowAddVideoModal] = useState<boolean>(false);
  console.log(videos);
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
  const handleRemoveVideo = useCallback((_id: string) => {
    const tempVideos = videos.filter((vid) => vid._id !== _id);
    setVideos([...tempVideos]);
  }, []);

  return (
    <TcCard>
      <TcPageTitle title='ایجاد پست' />

      <TcDevider>ویدیو</TcDevider>
      <div className='flex justify-end'>
        <TcButton className='cursor-pointer text-t-secondary-color hover:underline' onClick={toggleShowAddVideo}>
          افزودن ویدیو
        </TcButton>
      </div>
      <div className='flex flex-wrap gap-4 my-6'>
        {videos.map((vid) => (
          <VideoItem video={vid} key={vid._id} removeItem={handleRemoveVideo} />
        ))}
      </div>
      <AddVideo visible={showAddVideoModal} close={toggleShowAddVideo} addVideo={addVideo} />
    </TcCard>
  );
};

export default PostCreate;
