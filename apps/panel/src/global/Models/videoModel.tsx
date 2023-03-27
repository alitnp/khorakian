import { IVideoRead } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import VideoItem from 'components/UI/Video/VideoItem';
import routes from 'global/Constants/routes';

const title = 'ویدیو';
const englishTitle = 'video';

const filterInputs = (
  <>
    <TcFormItem name='title' label='عنوان'>
      <TcInput />
    </TcFormItem>
  </>
);

const columns = (handleDelete: (_id: string) => void) => [
  {
    title: 'ویدیو',
    key: 'video',
    dataIndex: 'video',
    width: 170,
    render: (_text: string, record: IVideoRead) => <VideoItem video={record} size='small' />,
  },
  {
    title: 'عنوان SEO',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'کیفیت ها',
    key: 'qualities',
    dataIndex: 'qualities',
    render: (_text: string, record: IVideoRead) => (
      <p className='flex gap-2'>
        {record.qualityVariations.map((vid) => (
          <span key={vid.size}>{vid.size}</span>
        ))}
      </p>
    ),
  },
  {
    title: 'عملیات',
    key: 'operation',
    render: (_text: any, record: any) => (
      <div className='flex'>
        {/* <TcDetailIcon to={routes.effectivePointTypesDetail.path + '/' + record.id} /> */}
        <TcEditIcon to={routes.videoUpdate.path + '/' + record._id} />
        <TcDeleteIcon onConfirm={() => handleDelete(record._id)} />
      </div>
    ),
  },
];

const videoModel = {
  title,
  englishTitle,
  filterInputs,
  columns,
};

export default videoModel;
