import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import useQuery from 'global/helperFunctions/useQuery';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { handleApiThen, handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import { ApiDataListResponse, IVideo } from '@my/types';
import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import videoModel from 'global/Models/videoModel';
import routes from 'global/Constants/routes';
import TcListPage from 'components/UI/TcListPage/TcListPage';

const Video: FC = () => {
  //states
  const [list, setList] = useState<ApiDataListResponse<IVideo>>();
  const [loading, setLoading] = useState<boolean>(false);

  //dispatch
  const dispatch = useDispatch();
  const { query } = useQuery();
  const apiCatcher = useApiCatcher();

  //functions
  const getList = async (query: any) => {
    const payload = queryString.stringify(query);
    setLoading(true);
    await ApiService.get(endpointUrls.videoGetList + '?' + payload).then((res: ApiDataListResponse<IVideo>) =>
      handleApiThenGeneric<ApiDataListResponse<IVideo>, IVideo[]>({ res, dispatch, onSuccess: setList, onFailed: () => setList(undefined), notifFail: false, notifSuccess: false })
    );
    setLoading(false);
  };
  const handleDelete = async (id: string) => {
    setLoading(true);
    await ApiService.delete(endpointUrls.videoDelete(id))
      .then((res: any) => handleApiThen({ res, onSuccess: () => getList(query), dispatch, notifFail: true, notifSuccess: true }))
      .then(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard>
      <TcPageTitle title={videoModel.title} to={routes.videoCreate.path} />
      <TcListPage list={list} getList={getList} columns={videoModel.columns(handleDelete)} filterItems={videoModel.filterInputs} loading={loading} />
    </TcCard>
  );
};

export default Video;
