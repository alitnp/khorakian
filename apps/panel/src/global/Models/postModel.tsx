import { IImage, IPostRead } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import ImageItem from 'components/UI/Image/ImageItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import routes from 'global/Constants/routes';

const title = 'پست';
const englishTitle = 'post';

const filterInputs = (
  <>
    <TcFormItem name='title' label='عنوان'>
      <TcInput />
    </TcFormItem>
    <TcFormItem name='text' label='عنوان'>
      <TcInput />
    </TcFormItem>
  </>
);

const columns = (handleDelete?: (_id: string) => void) => {
  const columns: any[] = [
    {
      title: 'عنوان',
      key: 'title',
      dataIndex: 'title',
    },
    { title: 'عکس', key: 'images', dataIndex: 'images', render: (_text: string, record: IPostRead) => (record.images.length > 0 ? record.images.length : 'ندارد') },
    { title: 'ویدیو', key: 'videos', dataIndex: 'videos', render: (_text: string, record: IPostRead) => (record.videos.length > 0 ? record.videos.length : 'ندارد') },
  ];
  handleDelete &&
    columns.push({
      title: 'عملیات',
      key: 'operation',
      render: (_text: any, record: IImage) => (
        <div className='flex'>
          {/* <TcDetailIcon to={routes.effectivePointTypesDetail.path + '/' + record.id} /> */}
          <TcEditIcon to={routes.postEdit.path + '/' + record._id} />
          <TcDeleteIcon onConfirm={() => handleDelete(record._id)} />
        </div>
      ),
    });
  return columns;
};

const imageModel = {
  title,
  englishTitle,
  filterInputs,
  columns,
};

export default imageModel;
