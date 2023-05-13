import TcCard from 'components/UI/Card/TcCard';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import TcListPage from 'components/UI/TcListPage/TcListPage';
import ApiService, { errorResponse } from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import { handleApiThen, handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import useApiCatcher from 'global/helperFunctions/useApiCatcher';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApiDataListResponse, IUserExperienceRead } from '@my/types';
import TcPopconfirm from 'components/UI/Popconfirm/TcPopconfirm';
import queryString from 'query-string';
import useQuery from 'global/helperFunctions/useQuery';
import TcSelectReduxSearch from 'components/UI/Form/Inputs/TcSelectReduxSearch';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';
import { getAllUserExperienceCategories } from 'redux/reducer/UserExperienceCategory/getAllUserExperienceCategories';

const UserExperience: FC = () => {
  //state
  const [loading, setLoading] = useState<boolean>(false);
  const [userExperienceList, setUserExperienceList] = useState<ApiDataListResponse<IUserExperienceRead>>();

  // hooks
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();
  const { query } = useQuery();

  // function
  const getUserExperience = async (query: Record<string, any>) => {
    const payload = queryString.stringify({ ...query });
    setLoading(true);
    await ApiService.get(endpointUrls.userExperienceGetList + '?' + payload)
      .then((res: ApiDataListResponse<IUserExperienceRead>) =>
        handleApiThenGeneric<ApiDataListResponse<IUserExperienceRead>, IUserExperienceRead[]>({
          res,
          dispatch,
          onSuccess: setUserExperienceList,
          notifFail: false,
          notifSuccess: false,
          onFailed: () => setUserExperienceList(undefined),
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  const ApproveUserExperience = async (id: number | string) => {
    setLoading(true);
    await ApiService.post(endpointUrls.setUserExperienceApprove + '/' + id, {})
      .then((res: any) =>
        handleApiThen({
          res,
          dispatch,
          onSuccess: () => getUserExperience(query),
          notifFail: true,
          notifSuccess: true,
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  const DisApproveUserExperience = async (id: number | string) => {
    setLoading(true);
    await ApiService.post(endpointUrls.setUserExperienceDisApprove + '/' + id, {})
      .then((res: any) =>
        handleApiThen({
          res,
          dispatch,
          onSuccess: () => getUserExperience(query),
          notifFail: true,
          notifSuccess: true,
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  //constant
  const filterInputs = (
    <>
      <TcFormItem name='title' label='عنوان'>
        <TcInput placeholder='عنوان' />
      </TcFormItem>
      <TcFormItem label='دسته بندی' name='userExperienceCategory'>
        <TcSelectReduxSearch reducerListProperty='list' getlist={getAllUserExperienceCategories} reducerName='userExperienceCategory' />
      </TcFormItem>
      <TcFormItem label='برجسته (Featured)' name='featured'>
        <TcSelect
          options={[
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            { label: 'بله', value: true },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            { label: 'خیر', value: false },
          ]}
        />
      </TcFormItem>
    </>
  );
  const columns = [
    {
      title: 'عنوان',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'متن',
      key: 'text',
      dataIndex: 'text',
    },
    {
      title: 'دسته بندی',
      key: 'userExperienceCategory',
      dataIndex: 'userExperienceCategory',
      render: (text: IUserExperienceRead) => text?.title,
    },
    {
      title: 'برجسته',
      key: 'featured',
      dataIndex: 'featured',
      render: (_text: string, record: IUserExperienceRead) => (record.featured ? 'بله' : 'خیر'),
    },
    {
      title: 'تعداد بازدید',
      key: 'viewCount',
      dataIndex: 'viewCount',
    },
    {
      title: 'تعداد پسند',
      key: 'likeCount',
      dataIndex: 'likeCount',
    },
    {
      title: 'تعداد نظر',
      key: 'commentCount',
      dataIndex: 'commentCount',
    },
    { title: 'وضعیت', render: (_text: any, record: Record<string, any>) => (record.isApprove ? 'تایید شده' : 'تایید نشده') },
    {
      title: 'تایید تجربه کاربر',
      render: (_text: any, record: Record<string, any>) =>
        record?.isApprove === true ? (
          <div>
            <p>توسط ادمین تایید شده</p>
            <TcPopconfirm onConfirm={() => DisApproveUserExperience(record?._id)} title='تجربه ی کاربر رد تایید شود؟'>
              <span className='cursor-pointer text-t-secondary-color'>رد تجربه</span>
            </TcPopconfirm>
          </div>
        ) : (
          <div>
            <p>در انتظار تایید ادمین</p>
            <TcPopconfirm onConfirm={() => ApproveUserExperience(record?._id)} title='تجربه ی کاربر تایید شود؟'>
              <span className='cursor-pointer text-t-secondary-color'>تایید تجربه کاربر</span>
            </TcPopconfirm>
          </div>
        ),
    },
  ];

  return (
    <>
      <TcCard>
        <TcPageTitle title='تجربیات کاربران' />
        {
          <>
            <TcListPage columns={columns} getList={getUserExperience} loading={loading} list={userExperienceList} filterItems={filterInputs} />
          </>
        }
      </TcCard>
    </>
  );
};

export default UserExperience;
