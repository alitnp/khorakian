import { IVideo } from '@my/types';
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

const columns = (handleDelete: (_id: number) => void) => [
  {
    title: 'ویدیو',
    key: 'video',
    dataIndex: 'video',
    render: (_text: string, record: IVideo) => <VideoItem video={record} />,
  },
  {
    title: 'عنوان',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'کیفیت ها',
    key: 'qualities',
    dataIndex: 'qualities',
    render: (_text: string, record: IVideo) => (
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
        <TcEditIcon to={routes.postCategoryEdit.path + '/' + record._id} />
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
