import { IDefaultImageRead } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';
import TcFormItem from 'components/UI/Form/TcFormItem';
import ImageItem from 'components/UI/Image/ImageItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import routes from 'global/Constants/routes';

const title = 'اسلایدر';
const englishTitle = 'slider';

const filterInputs = (
  <>
    <TcFormItem name='title' label='عنوان اصلی'>
      <TcInput placeholder='عنوان اصلی' />
    </TcFormItem>
    <TcFormItem name='subTitle' label='عنوان فرعی'>
      <TcInput placeholder='عنوان فرعی' />
    </TcFormItem>
    <TcFormItem name='shortDesc' label='شرح کوتاه'>
      <TcInput placeholder='شرح کوتاه' />
    </TcFormItem>
    <TcFormItem name='desc' label='شرح'>
      <TcInput placeholder='شرح' />
    </TcFormItem>
    <TcFormItem name='direction' label='نوع نوشته'>
      <TcSelect
        options={[
          { label: 'راست به چپ', value: 'right' },
          { label: 'چپ به راست', value: 'left' },
          { label: 'وسط', value: 'center' },
          { label: 'بدون نوشته', value: 'hidden' },
        ]}
      />
    </TcFormItem>
  </>
);

const columns = (handelDelete: (_id: string) => void) => {
  const columns: any[] = [
    {
      title: 'عکس',
      key: 'image',
      dataIndex: 'image',
      width: 170,
      render: (_text: string, record: IDefaultImageRead) => record.image && <ImageItem image={record.image} />,
    },
    { key: 'title', title: 'عنوان اصلی', dataIndex: 'عنوان اصلی' },
    { key: 'subTitle', title: 'عنوان فرعی', dataIndex: 'عنوان فرعی' },
    { key: 'shortDesc', title: 'شرح کوتاه', dataIndex: 'شرح کوتاه' },
    { key: 'desc', title: 'شرح', dataIndex: 'شرح' },
    { key: 'direction', title: 'نوع نوشته', dataIndex: 'نوع نوشته' },
    {
      title: 'عملیات',
      render: (_text: any, record: Record<string, any>) => (
        <div className='flex'>
          <TcEditIcon to={`${routes.sliderEdit.path}/${record._id}`} />
          {handelDelete && <TcDeleteIcon onConfirm={() => handelDelete(record._id)} />}
        </div>
      ),
    },
  ];

  return columns;
};

const sliderModel = {
  title,
  englishTitle,
  filterInputs,
  columns,
};

export default sliderModel;
