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
import { ApiDataListResponse, IIdeaRead } from '@my/types';
import TcPopconfirm from 'components/UI/Popconfirm/TcPopconfirm';
import queryString from 'query-string';
import useQuery from 'global/helperFunctions/useQuery';

const UserIdea: FC = () => {
  //state
  const [loading, setLoading] = useState<boolean>(false);
  const [userIdeaList, setUserIdeaList] = useState<ApiDataListResponse<IIdeaRead>>();

  // hooks
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();
  const { query } = useQuery();

  // function
  const getUserIdea = async (query: Record<string, any>) => {
    const payload = queryString.stringify({ ...query, isAdminSubmitted: false });
    setLoading(true);
    await ApiService.get(endpointUrls.ideaGetList + '?' + payload)
      .then((res: ApiDataListResponse<IIdeaRead>) =>
        handleApiThenGeneric<ApiDataListResponse<IIdeaRead>, IIdeaRead[]>({
          res,
          dispatch,
          onSuccess: setUserIdeaList,
          notifFail: false,
          notifSuccess: false,
          onFailed: () => setUserIdeaList(undefined),
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  const ApproveUserIdea = async (id: number | string) => {
    setLoading(true);
    await ApiService.post(endpointUrls.setUserIdeaApprove + '/' + id, {})
      .then((res: any) =>
        handleApiThen({
          res,
          dispatch,
          onSuccess: () => getUserIdea(query),
          notifFail: true,
          notifSuccess: true,
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  const DisApproveUserIdea = async (id: number | string) => {
    setLoading(true);
    await ApiService.post(endpointUrls.setUserIdeaDisApprove + '/' + id, {})
      .then((res: any) =>
        handleApiThen({
          res,
          dispatch,
          onSuccess: () => getUserIdea(query),
          notifFail: true,
          notifSuccess: true,
        })
      )
      .catch(() => apiCatcher(errorResponse));
    setLoading(false);
  };

  //constant
  const filterItems = (
    <>
      <TcFormItem name='title' label='عنوان'>
        <TcInput placeholder='عنوان' />
      </TcFormItem>
    </>
  );

  const columns = [
    { title: 'عنوان', key: 'title', dataIndex: 'title' },
    { title: 'توضیحات', key: 'text', dataIndex: 'text' },
    {
      title: 'وضعیت تایید',
      render: (_text: any, record: Record<string, any>) => (record?.isApprove === true ? <span className='text-t-success-color'>تایید شده</span> : 'در انتظار تایید'),
    },
    {
      title: 'دسته بندی',
      key: 'ideaCategory',
      dataIndex: 'ideaCategory',
      render: (_text: string, record: IIdeaRead) => record.ideaCategory.title,
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
    {
      title: 'وضعیت انتشار',
      render: (_text: any, record: Record<string, any>) => (record?.isPublished === true ? <span className='text-t-success-color'>منتشر شده</span> : 'منتشر نشده'),
    },
    {
      title: 'تایید ایده',
      render: (_text: any, record: Record<string, any>) =>
        record?.isApprove === true ? (
          <div>
            <p>توسط ادمین تایید شده</p>
            <TcPopconfirm onConfirm={() => DisApproveUserIdea(record?._id)} title='ایده ی کاربر رد تایید شود؟'>
              <span className='cursor-pointer text-t-secondary-color'>رد ایده</span>
            </TcPopconfirm>
          </div>
        ) : (
          <div>
            <p>در انتظار تایید ادمین</p>
            <TcPopconfirm onConfirm={() => ApproveUserIdea(record?._id)} title='ایده ی کاربر تایید شود؟'>
              <span className='cursor-pointer text-t-secondary-color'>تایید ایده</span>
            </TcPopconfirm>
          </div>
        ),
    },
  ];

  return (
    <>
      <TcCard>
        <TcPageTitle title='ایده کاربران' />
        {
          <>
            <TcListPage columns={columns} getList={getUserIdea} loading={loading} list={userIdeaList} filterItems={filterItems} />
          </>
        }
      </TcCard>
    </>
  );
};

export default UserIdea;
