import { IVideo } from '@my/types';
import AddVideo from 'components/UI/Video/AddVideo';
import TcButton from 'components/UI/Button/TcButton';
import TcCard from 'components/UI/Card/TcCard';
import TcDevider from 'components/UI/Devider/TcDevider';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from 'config/API/ApiService';
import VideoItem from 'components/UI/Video/VideoItem';

const PostCreate = () => {
  //states
  const [videos, setVideos] = useState<IVideo[]>([
    {
      title: 'تست2',
      temp: true,
      thumbnailPathname: '',
      qualityVariations: [
        {
          fileName: 'VID-641c998e92d15627b43ef321-240.mp4',
          size: '240',
          pathname: '/video/VID-641c998e92d15627b43ef321-240.mp4',
          format: 'mp4',
        },
        {
          fileName: 'VID-641c998e92d15627b43ef321-480.mp4',
          size: '480',
          pathname: '/video/VID-641c998e92d15627b43ef321-480.mp4',
          format: 'mp4',
        },
        {
          fileName: 'VID-641c998e92d15627b43ef321-720.mp4',
          size: '720',
          pathname: '/video/VID-641c998e92d15627b43ef321-720.mp4',
          format: 'mp4',
        },
      ],
      isPublished: true,
      _id: '641c998e92d15627b43ef321',
      creationDate: 1679595918063,
    },
  ]);
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

  return (
    <TcCard>
      <TcPageTitle title='ایجاد پست' />

      <TcDevider>ویدیو</TcDevider>
      <div className='flex justify-end'>
        <TcButton className='cursor-pointer text-t-secondary-color hover:underline' onClick={toggleShowAddVideo}>
          افزودن ویدیو
        </TcButton>
      </div>
      {videos.map((vid) => (
        <VideoItem video={vid} key={vid._id} />
      ))}
      <AddVideo visible={showAddVideoModal} close={toggleShowAddVideo} addVideo={addVideo} />
    </TcCard>
  );
};

export default PostCreate;
