import { FC, useState, useEffect, useCallback } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { ApiDataListResponse, IPost } from '@my/types';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import ApiService from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import queryString from 'query-string';
import { handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import TcTable from 'components/UI/Table/TcTable';
import TcPagination from 'components/UI/Pagination/TcPagination';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import postModel from 'global/Models/postModel';

interface IPostPicker {
  handlePick: (_post: IPost) => void;
}

const PostPicker: FC<IPostPicker> = ({ handlePick }) => {
  //states
  const [list, setList] = useState<ApiDataListResponse<IPost>>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  //effect
  useEffect(() => {
    getList(pageNumber, title);
  }, [pageNumber, title]);

  //functions
  const getList = async (pageNumber: number, title: string) => {
    setLoading(true);
    await ApiService.get(endpointUrls.postGetList + '?' + queryString.stringify({ pageNumber, pageSize: 50, title }))
      .then((res: ApiDataListResponse<IPost>) => handleApiThenGeneric<ApiDataListResponse<IPost>, IPost[]>({ res, onSuccess: setList }))
      .catch(() => {});
    setLoading(false);
  };

  const handlePagination = useCallback((pageNumber: number | undefined) => setPageNumber(pageNumber || 1), []);

  return (
    <>
      <TcInput
        placeholder='عنوان'
        suffix={<SearchOutlined />}
        value={title}
        className='my-4'
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <TcTable
        dataSource={list?.data || []}
        columns={[
          ...postModel.columns(),
          {
            title: 'انتخاب',
            key: 'choose',
            dataIndex: '_id',
            render: (_text: string, record: IPost) => (
              <p className='cursor-pointer text-t-secondary-color hover:underline' onClick={() => handlePick(record)}>
                انتخاب
              </p>
            ),
          },
        ]}
      />

      <TcPagination current={pageNumber} pageSize={50} total={list?.totalItems} onPaginationHandler={handlePagination} />
      {loading && <TcCoverLoading />}
    </>
  );
};

export default PostPicker;
