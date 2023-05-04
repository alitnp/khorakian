import { IImage, ISocialMediaRead } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import ImageItem from 'components/UI/Image/ImageItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import routes from 'global/Constants/routes';

const title = 'شبکه اجتماعی';
const englishTitle = 'socialMedia';

const inputs = (
  <>
    <TcFormItem name='title' label='عنوان' rules={[{ required: true, message: 'عنوان تعیین نشده' }]}>
      <TcInput />
    </TcFormItem>
    <TcFormItem name='englishTitle' label='عنولن لاتین'>
      <TcInput />
    </TcFormItem>
    <TcFormItem label='لینک' name='url' rules={[{ required: true, message: 'لینک تعیین نشده' }]}>
      <TcInput placeholder='لینک' />
    </TcFormItem>
  </>
);

const filterInputs = (
  <>
    <TcFormItem name='title' label='عنوان'>
      <TcInput />
    </TcFormItem>
    <TcFormItem name='englishTitle' label='عنولن لاتین'>
      <TcInput />
    </TcFormItem>
  </>
);

const columns = (handleDelete?: (_id: string) => void) => {
  const columns: any[] = [
    {
      title: 'عکس',
      key: 'image',
      dataIndex: 'image',
      width: 170,
      render: (_text: string, record: ISocialMediaRead) => record.image && <ImageItem image={record.image} />,
    },
    {
      title: 'عنوان',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'عنوان لاتین',
      key: 'englishTitle',
      dataIndex: 'englishTitle',
    },
    {
      title: 'لینک',
      key: 'url',
      dataIndex: 'url',
    },
    {
      title: 'عکس',
      key: 'images',
      dataIndex: 'images',
      render: (_text: string, record: ISocialMediaRead) => (record.image ? 'دارد' : 'ندارد'),
    },
  ];
  handleDelete &&
    columns.push({
      title: 'عملیات',
      key: 'operation',
      render: (_text: any, record: IImage) => (
        <div className='flex'>
          {/* <TcDetailIcon to={routes.effectivePointTypesDetail.path + '/' + record.id} /> */}
          <TcEditIcon to={routes.socialMediaEdit.path + '/' + record._id} />
          <TcDeleteIcon onConfirm={() => handleDelete(record._id)} />
        </div>
      ),
    });
  return columns;
};

const socialMediaModel = {
  title,
  englishTitle,
  filterInputs,
  columns,
  inputs,
};

export default socialMediaModel;
