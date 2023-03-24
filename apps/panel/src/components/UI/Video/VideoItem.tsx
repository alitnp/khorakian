import { IVideo } from '@my/types';
import { BASE_URL } from 'config/API/ApiService';
import { FC, memo, useState, useEffect, useRef } from 'react';
import { PlayCircleTwoTone } from '@ant-design/icons';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';

interface IVideoItem {
  video: IVideo;
}

type videoSrc = { pathname: string; label: number };

const VideoItem: FC<IVideoItem> = ({ video }) => {
  //state
  const [srcs, setSrcs] = useState<videoSrc[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  //hooks
  const videoPlayer = useRef<HTMLVideoElement>(null);

  //effect
  useEffect(() => {
    if (video) {
      const videoSrcs: videoSrc[] = video.qualityVariations
        .map((q) => ({ pathname: BASE_URL + q.pathname, label: +q.size }))
        .sort((a, b) => {
          if (a.label > b.label) return -1;
          if (a.label < b.label) return 1;
          return 0;
        });
      setSrcs(videoSrcs);
    }
  }, [video]);

  //functions
  const handleSizeChange = (e: number) => {
    const currentTime = videoPlayer.current?.currentTime || 0;
    setActiveIndex(e);
    setTimeout(() => {
      if (videoPlayer.current !== null) videoPlayer.current.currentTime = currentTime;
      videoPlayer.current?.play();
    }, 1000);
  };

  return (
    <div className='w-full sm:w-80'>
      <div className='relative flex items-center w-full overflow-hidden bg-black sm:w-80 rounded-xl aspect-video'>
        {srcs.length > 0 && (
          <video controls={isPlaying} className='w-full ' ref={videoPlayer} key={srcs[activeIndex].pathname} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}>
            <source src={srcs[activeIndex].pathname} type='video/mp4' />{' '}
          </video>
        )}
        {!isPlaying && (
          <div
            className='absolute -translate-x-1/2 -translate-y-1/2 inherit-color top-1/2 left-1/2'
            onClick={() => {
              setIsPlaying(true);
              if (videoPlayer.current !== null) videoPlayer.current.play();
            }}>
            <PlayCircleTwoTone className='text-5xl cursor-pointer' />
          </div>
        )}
        {srcs.length > 0 && isPlaying && (
          <div className='absolute top-4 right-4'>
            <TcSelect options={srcs.map((src, index) => ({ label: src.label, value: index }))} value={activeIndex} onChange={handleSizeChange} size='small' />
          </div>
        )}
      </div>
      <p className='text-center'>{video.title}</p>
    </div>
  );
};

export default memo(VideoItem);