import { IDefaultImageRead } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import ImageItem from 'components/UI/Image/ImageItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import routes from 'global/Constants/routes';

const title = 'عکس پیشفرض';
const englishTitle = 'defaultImage';

const filterInputs = (
  <>
    <TcFormItem name='key' label='کلید'>
      <TcInput placeholder='کلید' />
    </TcFormItem>
  </>
);

const columns = () => {
  const columns: any[] = [
    {
      title: 'عکس',
      key: 'image',
      dataIndex: 'image',
      width: 170,
      render: (_text: string, record: IDefaultImageRead) => <ImageItem image={record.image} />,
    },
    { title: 'کلید', key: 'key', dataIndex: 'key' },
    {
      title: 'عملیات',
      render: (_text: any, record: Record<string, any>) => (
        <div className='flex'>
          <TcEditIcon to={`${routes.defaultImageEdit.path}/${record._id}`} />
        </div>
      ),
    },
  ];

  return columns;
};

const defaultImageModel = {
  title,
  englishTitle,
  filterInputs,
  columns,
};

export default defaultImageModel;
