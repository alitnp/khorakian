import { IUser } from '@my/types';
import TcCard from 'components/UI/Card/TcCard';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import TcListPage from 'components/UI/TcListPage/TcListPage';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { handleApiThen } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import TcToggleIsActive from 'components/UI/TcToggleIsActive/TcToggleIsActive';
import useQuery from 'global/helperFunctions/useQuery';

const User: FC = () => {
  //state
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<IUser>();

  // hooks
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();
  const { query } = useQuery();

  // function
  const getUsers = async (query: Record<string, any>) => {
    setLoading(true);
    await ApiService.get(endpointUrls.userGetList, { ...query })
      .then((res: any) =>
        handleApiThen({
          res,
          dispatch,
          onSuccess: setUserList,
          notifFail: false,
          notifSuccess: false,
          onFailed: () => setUserList(undefined),
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  //toggle User isAdmin status
  const setUserIsAdmin = async (userId: any) => {
    setLoading(true);
    await ApiService.post(endpointUrls.setUserIsAdmin(userId), {})
      .then((res: IUser) => handleApiThen({ res, onSuccess: () => getUsers(query), dispatch, notifFail: true, notifSuccess: true }))
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  //constant
  const filterItems = (
    <>
      <TcFormItem name='firstName' label='نام'>
        <TcInput placeholder='نام' />
      </TcFormItem>
      <TcFormItem name='mobileNumber' label='شماره همراه'>
        <TcInput placeholder='شماره همراه' />
      </TcFormItem>
    </>
  );

  const columns = [
    { title: 'نام', key: 'firstName', dataIndex: 'firstName' },
    { title: 'نام ونام خانوادگی', key: 'fullName', dataIndex: 'fullName' },
    { title: 'شماره همراه', key: 'mobileNumber', dataIndex: 'mobileNumber' },
    {
      title: ' ادمین',
      render: (_text: string, record: Record<string, any>) => {
        return <TcToggleIsActive isActive={record.isAdmin} onConfirm={() => setUserIsAdmin(record._id)} />;
      },
    },
  ];

  return (
    <TcCard>
      <TcPageTitle title='لیست افراد' />
      <TcListPage columns={columns} getList={getUsers} loading={loading} list={userList} filterItems={filterItems} />
    </TcCard>
  );
};

export default User;
