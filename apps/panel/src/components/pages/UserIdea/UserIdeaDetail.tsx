import { ApiDataResponse, IIdeaRead } from '@my/types';
import TcCard from 'components/UI/Card/TcCard';
import TcDevider from 'components/UI/Devider/TcDevider';
import ImageItem from 'components/UI/Image/ImageItem';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import VideoItem from 'components/UI/Video/VideoItem';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import useQuery from 'global/helperFunctions/useQuery';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const UserIdeaDetail: FC = () => {
  //states
  const [detail, setDetail] = useState<IIdeaRead>();
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const { pathnameLastPart: id } = useQuery();
  const dispatch = useDispatch();
  const apiCathcer = useApiCatcher();

  //effect
  useEffect(() => {
    id && getDetail(id);
  }, [id]);

  //functions
  const getDetail = async (id: string) => {
    setLoading(true);
    await ApiService.get(endpointUrls.ideaDetail(id))
      .then((res: ApiDataResponse<IIdeaRead>) =>
        handleApiThenGeneric<ApiDataResponse<IIdeaRead>, IIdeaRead>({ res, dispatch, notifFail: true, notifSuccess: false, onSuccessData: setDetail })
      )
      .catch(() => apiCathcer(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard back={{ to: routes.userIdea.path }}>
      <TcPageTitle title='جزئیات ایده کاربر' />
      <TcDevider>عکس ها</TcDevider>
      {detail && detail.images.length === 0 && <span>عکسی بارگزاری نشده</span>}
      {detail && detail.images.length > 0 && (
        <div className='flex gap-4 overflow-x-auto'>
          {detail.images.map((i) => (
            <ImageItem image={i} key={i._id} />
          ))}
        </div>
      )}
      <TcDevider>ویدیو ها</TcDevider>
      {detail && detail.videos.length === 0 && <span>عکسی بارگزاری نشده</span>}
      {detail && detail.videos.length > 0 && (
        <div className='flex gap-4 overflow-x-auto'>
          {detail.videos.map((v) => (
            <VideoItem video={v} key={v._id} />
          ))}
        </div>
      )}
      <h1 className='mt-10 mb-4 text-2xl font-bold'>{detail?.title}</h1>
      <p>{detail?.text}</p>
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default UserIdeaDetail;
