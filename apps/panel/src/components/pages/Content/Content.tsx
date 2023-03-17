import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import TcListPage from 'components/UI/TcListPage/TcListPage';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import useQuery from 'global/helperFunctions/useQuery';
import { content, contentColumns } from 'global/Models/ContentModels';
import { backendReponse } from 'global/Models/globalModels';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

const Content: FC = () => {
  //states
  const [list, setList] = useState<backendReponse<content> | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  //hooks
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();
  const { query } = useQuery();

  //functions
  const getList = async (query: Record<string, any>) => {
    setLoading(true);
    await ApiService.post(endpointUrls.contentGetList, query)
      .then((res: backendReponse<content>) => handleApiThen({ res, onSuccess: setList, onFailed: () => setList(undefined) }))
      .catch(() => setList(undefined));
    setLoading(false);
  };
  const handleDelete = async (id: number) => {
    setLoading(true);
    await ApiService.delete(endpointUrls.contentDelete + '?id=' + id)
      .then((res: backendReponse<null>) => handleApiThen({ res, dispatch, onSuccess: () => getList(query), notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard>
      <TcPageTitle title='محتوا' buttonText='ثبت' to={routes.contentCreate.path} />
      <TcListPage list={list} getList={getList} columns={contentColumns(handleDelete)} filterItems={<></>} loading={loading} />
    </TcCard>
  );
};

export default Content;
