import { IVideoRead } from '@my/types';
import { moveItemInArray } from '@my/helpers';
import { FC, memo, useState, useCallback } from 'react';
import PlusBox from 'components/UI/PlusBox/PlusBox';
import VideoPickerModal from 'components/UI/Video/VideoPickerModal';
import VideoItem from 'components/UI/Video/VideoItem';
import TcCount from 'components/UI/Count/TcCount';
import { HomeOutlined } from '@ant-design/icons';

interface IAddVideo {
  videos: IVideoRead[];
  setVideos: React.Dispatch<React.SetStateAction<IVideoRead[]>>;
}

const AddVideo: FC<IAddVideo> = ({ videos, setVideos }) => {
  //states
  const [showVideoPicker, setShowVideoPicker] = useState<boolean>(false);

  //functions
  const toggleShowVideoPicker = useCallback(() => setShowVideoPicker((prevState) => !prevState), []);
  const addVideo = useCallback(
    (video: IVideoRead) =>
      setVideos((videos: IVideoRead[]) => {
        if (videos.some((vid) => vid._id === video._id)) return videos;
        return [...videos, video];
      }),
    [videos]
  );
  const removeVideo = useCallback(
    (_id: string) => {
      const tempVideos = videos.filter((vid) => vid._id !== _id);
      setVideos([...tempVideos]);
    },
    [videos]
  );
  const handleReArrange = useCallback((oldIndex: number, newIndex: number) => setVideos((videos: IVideoRead[]) => [...moveItemInArray(videos, oldIndex, newIndex)]), [videos]);

  return (
    <>
      <div className='flex flex-wrap items-center gap-4 my-4'>
        {videos.map((vid, index) => (
          <div key={vid._id} className='flex flex-col items-center gap-1'>
            <div className={`${index === 0 && 'border border-t-secondary-color rounded-xl p-1'}`}>
              <TcCount count={index} setCount={(newIndex: number) => handleReArrange(index, newIndex)} />
              <VideoItem video={vid} removeItem={removeVideo} size='small' hideTitle />
            </div>

            <span className={`text-t-secondary-color color-inherit ${index !== 0 ? 'opacity-0' : ''}`}>
              <HomeOutlined />
            </span>
          </div>
        ))}
        <PlusBox onClick={toggleShowVideoPicker} />
      </div>
      <VideoPickerModal visible={showVideoPicker} close={toggleShowVideoPicker} handlePick={addVideo} />
    </>
  );
};

export default memo(AddVideo);
