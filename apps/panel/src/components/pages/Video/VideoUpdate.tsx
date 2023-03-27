import { ApiDataResponse, IVideo, IVideoRead } from '@my/types';
import { Form } from 'antd';
import TcCard from 'components/UI/Card/TcCard';
import TcForm from 'components/UI/Form/TcForm';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import useQuery from 'global/helperFunctions/useQuery';
import videoModel from 'global/Models/videoModel';
import { FC, useCallback, useState, useEffect } from 'react';
import { handleApiThen, handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import { AppDispatch } from 'redux/store';
import { useDispatch } from 'react-redux';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { useHistory } from 'react-router';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import VideoItem from 'components/UI/Video/VideoItem';
import TcFormButtons from 'components/UI/FormButtons/TcFormButtons';

const VideoUpdate: FC = () => {
  //states
  const [loading, setLoading] = useState<boolean>(false);
  const [videoDetail, setVideoDetail] = useState<IVideoRead>();

  //hooks
  const { pathnameLastPart: id } = useQuery();
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const apiCatcher = useApiCatcher();
  const { push } = useHistory();

  //effect
  useEffect(() => {
    id && getVideoDetail(id);
  }, [id]);

  //functions
  const getVideoDetail = useCallback(async (id: string) => {
    setLoading(true);
    await ApiService.get(endpointUrls.videoDetail(id))
      .then((res: ApiDataResponse<IVideoRead>) =>
        handleApiThenGeneric<ApiDataResponse<IVideoRead>, IVideoRead>({
          res,
          dispatch,
          notifFail: true,
          notifSuccess: false,
          onSuccessData: (data) => {
            setVideoDetail(data);
            form.setFieldValue('title', data.title);
          },
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  }, []);
  const handleSubmit = useCallback(
    async ({ title }: { title: string }) => {
      if (!id) return;
      setLoading(true);
      await ApiService.put(endpointUrls.videoEdit(id), { title }).then((res: any) =>
        handleApiThen({ res, dispatch, notifFail: true, notifSuccess: true, onSuccess: () => push(routes.video.path) })
      );
      setLoading(false);
    },
    [id]
  );

  return (
    <TcCard back={{ to: routes.video.path }}>
      <TcPageTitle title={'ویرایش ' + videoModel.title} />
      <div className='flex justify-center'>{videoDetail && <VideoItem video={videoDetail} />}</div>
      <TcForm form={form} onFinish={handleSubmit}>
        <TcFormItem name='title' label='عنوان'>
          <TcInput placeholder='عنوان' />
        </TcFormItem>
        <TcFormButtons noCancel submitButtonText='ویرایش' />
      </TcForm>
      {loading && <TcCoverLoading />}
    </TcCard>
  );
};

export default VideoUpdate;
