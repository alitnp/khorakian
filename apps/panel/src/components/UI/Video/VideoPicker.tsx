import { Segmented } from 'antd';
import { FC, useState, useEffect, useCallback } from 'react';
import { AppstoreOutlined, BarsOutlined, SearchOutlined } from '@ant-design/icons';
import { SegmentedValue } from 'antd/es/segmented';
import { ApiDataListResponse, IVideoRead } from '@my/types';
import TcCoverLoading from 'components/UI/Loading/TcCoverLoading';
import ApiService from 'config/API/ApiService';
import endpointUrls from 'global/Constants/endpointUrls';
import queryString from 'query-string';
import { handleApiThenGeneric } from 'global/helperFunctions/handleApiThen';
import TcTable from 'components/UI/Table/TcTable';
import TcPagination from 'components/UI/Pagination/TcPagination';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import VideoItem from 'components/UI/Video/VideoItem';
import videoModel from 'global/Models/videoModel';

interface IVideoPicker {
  handlePick: (_video: IVideoRead) => void;
}

const VideoPicker: FC<IVideoPicker> = ({ handlePick }) => {
  //states
  const [listType, setListType] = useState<SegmentedValue>('grid');
  const [list, setList] = useState<ApiDataListResponse<IVideoRead>>();
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
    await ApiService.get(endpointUrls.videoGetList + '?' + queryString.stringify({ pageNumber, pageSize: 50, title }))
      .then((res: ApiDataListResponse<IVideoRead>) => handleApiThenGeneric<ApiDataListResponse<IVideoRead>, IVideoRead[]>({ res, onSuccess: setList }))
      .catch(() => {});
    setLoading(false);
  };
  const renderGrid = useCallback(
    () => (
      <div className='flex flex-wrap items-center gap-4 my-4'>
        {list?.data.map((video) => (
          <VideoItem video={video} key={video._id} onSelect={handlePick} size='small' />
        ))}
      </div>
    ),
    [list]
  );
  const renderTable = useCallback(
    () => (
      <TcTable
        dataSource={list?.data || []}
        columns={[
          ...videoModel.columns(),
          {
            title: 'انتخاب',
            key: 'choose',
            dataIndex: '_id',
            render: (_text: string, record: IVideoRead) => (
              <p className='cursor-pointer text-t-secondary-color hover:underline' onClick={() => handlePick(record)}>
                انتخاب
              </p>
            ),
          },
        ]}
      />
    ),
    [list]
  );
  const handlePagination = useCallback((pageNumber: number | undefined) => setPageNumber(pageNumber || 1), []);

  return (
    <>
      <Segmented
        value={listType}
        onChange={setListType}
        className='my-2'
        options={[
          {
            value: 'list',
            icon: <BarsOutlined />,
          },
          {
            value: 'grid',
            icon: <AppstoreOutlined />,
          },
        ]}
      />
      <TcInput
        placeholder='عنوان ویدیو'
        suffix={<SearchOutlined />}
        value={title}
        className='my-4'
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      {listType === 'grid' && renderGrid()}
      {listType === 'list' && renderTable()}
      <TcPagination current={pageNumber} pageSize={50} total={list?.totalItems} onPaginationHandler={handlePagination} />
      {loading && <TcCoverLoading />}
    </>
  );
};

export default VideoPicker;
