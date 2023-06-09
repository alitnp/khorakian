import { IImage } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import ImageItem from 'components/UI/Image/ImageItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import routes from 'global/Constants/routes';

const title = 'عکس';
const englishTitle = 'image';

const filterInputs = (
  <>
    <TcFormItem name='title' label='عنوان'>
      <TcInput />
    </TcFormItem>
  </>
);

const columns = (handleDelete?: (_id: string) => void) => {
  const columns: any[] = [
    {
      title: 'عکس',
      key: 'video',
      dataIndex: 'video',
      width: 170,
      render: (_text: string, record: IImage) => <ImageItem image={record} />,
    },
    {
      title: 'عنوان SEO',
      key: 'title',
      dataIndex: 'title',
    },
    // {
    //   title: 'کیفیت ها',
    //   key: 'qualities',
    //   dataIndex: 'qualities',
    //   render: (_text: string, record: IImage) => (
    //     <p className='flex gap-2'>
    //       {record.qualityVariations.map((vid) => (
    //         <span key={vid.size}>{vid.size}</span>
    //       ))}
    //     </p>
    //   ),
    // },
  ];
  handleDelete &&
    columns.push({
      title: 'عملیات',
      key: 'operation',
      render: (_text: any, record: IImage) => (
        <div className='flex'>
          {/* <TcDetailIcon to={routes.effectivePointTypesDetail.path + '/' + record.id} /> */}
          <TcEditIcon to={routes.imageEdit.path + '/' + record._id} />
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
