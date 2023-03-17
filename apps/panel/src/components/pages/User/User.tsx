import ActivePackageModal from 'components/pages/User/components/ActivePackageModal';
import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import TcListPage from 'components/UI/TcListPage/TcListPage';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { backendReponse } from 'global/Models/globalModels';
import { user, userColumns, userFilterItems } from 'global/Models/UserModels';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

const User: FC = () => {
  //states
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<backendReponse<user> | undefined>();
  const [showActivePackageModal, setShowActivePackageModal] = useState<undefined | user>(undefined);

  //hooks
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();

  //functions
  const getUsersList = async (query: Record<string, any>) => {
    setLoading(true);
    await ApiService.post(endpointUrls.userGetList, query)
      .then((res: backendReponse<user>) => handleApiThen({ res, dispatch, onSuccess: setList, notifFail: false, notifSuccess: false, onFailed: () => setList(undefined) }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  const culumns = [
    ...userColumns,
    {
      title: 'فعال سازی بسته',
      key: 'package',
      dataIndex: 'package',
      render: (_text: string, record: user) => (
        <p onClick={() => setShowActivePackageModal(record)} className='cursor-pointer text-t-secondary-color'>
          فعال سازی بسته
        </p>
      ),
    },
  ];

  return (
    <TcCard>
      <TcPageTitle title='کاربران' />
      <TcListPage columns={culumns} filterItems={userFilterItems} getList={getUsersList} list={list} loading={loading} />
      <ActivePackageModal user={showActivePackageModal} close={() => setShowActivePackageModal(undefined)} />
    </TcCard>
  );
};

export default User;
