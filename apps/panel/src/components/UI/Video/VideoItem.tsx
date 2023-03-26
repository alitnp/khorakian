import { IVideo, ApiDataResponse, IVideoRead } from '@my/types';
import ApiService, { BASE_URL, DOMAIN } from 'config/API/ApiService';
import { FC, memo, useState, useEffect, useRef, useCallback } from 'react';
import { PlayCircleTwoTone } from '@ant-design/icons';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcLoading from 'components/UI/Loading/TcLoading';
import { handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import { AppDispatch } from 'redux/store';
import { useDispatch } from 'react-redux';
import endpointUrls from 'global/Constants/endpointUrls';

interface IVideoItem {
  video: IVideoRead;
  removeItem?: (_id: string) => void;
  size?: 'small' | 'normal';
}

type videoSrc = { pathname: string; label: number };

const VideoItem: FC<IVideoItem> = ({ video, removeItem, size = 'normal' }) => {
  //state
  const [srcs, setSrcs] = useState<videoSrc[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const videoPlayer = useRef<HTMLVideoElement>(null);
  const dispatch: AppDispatch = useDispatch();

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
  const handleSizeChange = useCallback((e: number) => {
    const currentTime = videoPlayer.current?.currentTime || 0;
    setActiveIndex(e);
    setTimeout(() => {
      if (videoPlayer.current !== null) videoPlayer.current.currentTime = currentTime;
      videoPlayer.current?.play();
    }, 1000);
  }, []);
  const handleDelete = useCallback(async () => {
    setLoading(true);
    await ApiService.delete(endpointUrls.videoDelete(video._id)).then((res: ApiDataResponse<IVideo>) =>
      handleApiThenGeneric<ApiDataResponse<IVideo>, IVideo>({ res, dispatch, onSuccessData: (data) => removeItem && removeItem(data._id) })
    );
    setLoading(false);
  }, []);

  return (
    <div className={`w-full ${size === 'normal' && 'sm:w-80'} ${size === 'small' && 'sm:w-40'}`}>
      <div
        className={`relative flex items-center w-full overflow-hidden bg-black rounded-xl aspect-video group ${size === 'normal' && 'sm:w-80'} ${size === 'small' && 'sm:w-40'}`}>
        {srcs.length > 0 && (
          <video
            poster={video.thumbnail && DOMAIN + video.thumbnail.thumbnailPathname}
            controlsList='nodownload'
            disablePictureInPicture
            controls={isPlaying}
            className='w-full '
            ref={videoPlayer}
            key={srcs[activeIndex].pathname}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}>
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
            <PlayCircleTwoTone className={`cursor-pointer ${size === 'small' ? 'text-3xl' : 'text-5xl'}`} />
          </div>
        )}
        {!isPlaying && <div className='absolute bottom-0 left-0 flex gap-4'>{removeItem && <TcDeleteIcon onConfirm={handleDelete} />}</div>}
        {srcs.length > 0 && isPlaying && (
          <div className='absolute transition-opacity duration-300 opacity-0 top-4 right-4 group-hover:opacity-100 hover:opacity-100'>
            <TcSelect options={srcs.map((src, index) => ({ label: src.label, value: index }))} value={activeIndex} onChange={handleSizeChange} size='small' />
          </div>
        )}
        {loading && <TcLoading className='absolute top-2 left-2' />}
      </div>
      <p className='text-center'>{video.title}</p>
    </div>
  );
};

export default memo(VideoItem);
