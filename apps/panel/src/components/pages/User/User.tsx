import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import useQuery from 'global/helperFunctions/useQuery';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { handleApiThen, handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import { ApiDataListResponse, IImage, IUser } from '@my/types';
import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import routes from 'global/Constants/routes';
import TcListPage from 'components/UI/TcListPage/TcListPage';
import imageModel from 'global/Models/ImageModel';
import userModel from 'global/Models/userModel';
import { useCallback } from 'react';
import TcTable from 'components/UI/Table/TcTable';
import TcToggleIsActive from 'components/UI/TcToggleIsActive/TcToggleIsActive';

const User: FC = () => {
  //states
  const [list, setList] = useState<ApiDataListResponse<IUser>>();
  const [loading, setLoading] = useState<boolean>(false);

  //dispatch
  const dispatch = useDispatch();
  const { query } = useQuery();
  const apiCatcher = useApiCatcher();

  //functions
  const getList = async (query: any) => {
    const payload = queryString.stringify(query);
    setLoading(true);
    await ApiService.get(endpointUrls.userGetList + '?' + payload).then((res: ApiDataListResponse<IUser>) =>
      handleApiThenGeneric<ApiDataListResponse<IUser>, IUser[]>({ res, dispatch, onSuccess: setList, onFailed: () => setList(undefined), notifFail: false, notifSuccess: false })
    );
    setLoading(false);
  };

  //toggle User isAdmin status
  const setUserIsAdmin = async (userId: any) => {
    setLoading(true);
    await ApiService.post(endpointUrls.setUserIsAdmin(userId), {})
      .then((res: IUser) => handleApiThen({ res, onSuccess: () => getList(query), dispatch, notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  return (
    <TcCard>
      <TcPageTitle title={userModel.title} />
      <TcListPage
        list={list}
        getList={getList}
        columns={[
          ...userModel.columns(),
          {
            title: 'ادمین',
            render: (_text: string, record: Record<string, any>) => {
              return <TcToggleIsActive isActive={record.isAdmin} onConfirm={() => setUserIsAdmin(record._id)} />;
            },
          },
        ]}
        filterItems={userModel.filterInputs}
        loading={loading}
      />
    </TcCard>
  );
};

export default User;
