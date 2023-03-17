import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import TcListPage from 'components/UI/TcListPage/TcListPage';
import ApiService, { errorResponse } from 'config/API/ApiService';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import useQuery from 'global/helperFunctions/useQuery';
import { FC, ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';

interface ITcPageListWrapper {
  getListEndpoint: string;
  deleteEndpoint: (_id: number | string) => string;
  columns: (_handleDelete: (_id: number | string) => void) => any;
  filterItems: ReactNode;
  title: string;
  createRoute: string;
}

const TcPageListWrapper: FC<ITcPageListWrapper> = ({ getListEndpoint, deleteEndpoint, columns, filterItems, title, createRoute }) => {
  //states
  const [list, setList] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  //dispatch
  const dispatch = useDispatch();
  const { query } = useQuery();
  const apiCatcher = useApiCatcher();

  //functions
  const getList = async (query: any) => {
    const payload = queryString.stringify(query);
    setLoading(true);
    await ApiService.get(getListEndpoint + '?' + payload).then((res: any) =>
      handleApiThen({ res, dispatch, onSuccess: setList, onFailed: () => setList(undefined), notifFail: false, notifSuccess: false })
    );
    setLoading(false);
  };
  const handleDelete = async (id: number | string) => {
    setLoading(true);
    await ApiService.delete(deleteEndpoint(id))
      .then((res: any) => handleApiThen({ res, onSuccess: () => getList(query), dispatch, notifFail: true, notifSuccess: true }))
      .then(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard>
      <TcPageTitle title={title} to={createRoute} />
      <TcListPage list={list} getList={getList} columns={columns(handleDelete)} filterItems={filterItems} loading={loading} />
    </TcCard>
  );
};

export default TcPageListWrapper;
