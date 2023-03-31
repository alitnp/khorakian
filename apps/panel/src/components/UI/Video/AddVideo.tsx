import { IVideoRead } from '@my/types';
import { FC, memo, useState, useCallback } from 'react';
import PlusBox from 'components/UI/PlusBox/PlusBox';
import VideoPickerModal from 'components/UI/Video/VideoPickerModal';
import VideoItem from 'components/UI/Video/VideoItem';

interface IAddVideo {
  addVideo: (_video: IVideoRead) => void;
  videos: IVideoRead[];
  removeVideo: (_id: string) => void;
}

const AddVideo: FC<IAddVideo> = ({ addVideo, videos, removeVideo }) => {
  //states
  const [showVideoPicker, setShowVideoPicker] = useState<boolean>(false);

  //functions
  const toggleShowVideoPicker = useCallback(() => setShowVideoPicker((prevState) => !prevState), []);

  return (
    <>
      <div className='flex flex-wrap items-center gap-4 my-4'>
        {videos.map((vid) => (
          <VideoItem video={vid} key={vid._id} removeItem={removeVideo} />
        ))}
        <PlusBox onClick={toggleShowVideoPicker} />
      </div>
      <VideoPickerModal visible={showVideoPicker} close={toggleShowVideoPicker} handlePick={addVideo} />
    </>
  );
};

export default memo(AddVideo);
