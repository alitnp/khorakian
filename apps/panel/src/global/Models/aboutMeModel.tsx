import { IImage, IAboutMeRead } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import routes from 'global/Constants/routes';

const title = 'درباره من';
const englishTitle = 'aboutMe';

const inputs = (
  <>
    <TcFormItem name='title' label='عنوان' rules={[{ required: true, message: 'عنوان پست تعیین نشده' }]}>
      <TcInput />
    </TcFormItem>
    <TcFormItem label='متن' name='text' full>
      <TcTextarea placeholder='متن' />
    </TcFormItem>
  </>
);

const filterInputs = (
  <>
    <TcFormItem name='name' label='فرد'>
      <TcInput placeholder='فرد' />
    </TcFormItem>
    <TcFormItem name='position' label='سمت'>
      <TcInput placeholder='سمت' />
    </TcFormItem>
    <TcFormItem label='متن' name='text'>
      <TcInput placeholder='متن' />
    </TcFormItem>
  </>
);

const columns = (handleDelete?: (_id: string) => void) => {
  const columns: any[] = [
    {
      title: 'فرد',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'سمت',
      key: 'position',
      dataIndex: 'position',
    },
    {
      title: 'متن',
      key: 'text',
      dataIndex: 'text',
    },
    {
      title: 'پست',
      key: 'post',
      dataIndex: 'post',
      render: (_text: string, record: IAboutMeRead) => record?.post?.title,
    },
  ];

  handleDelete &&
    columns.push({
      title: 'عملیات',
      key: 'operation',
      render: (_text: any, record: IImage) => (
        <div className='flex'>
          {/* <TcDetailIcon to={routes.aboutMeDetail.path + '/' + record._id} /> */}
          <TcEditIcon to={routes.aboutMeEdit.path + '/' + record._id} />
          <TcDeleteIcon onConfirm={() => handleDelete(record._id)} />
        </div>
      ),
    });
  return columns;
};

const aboutMeModel = {
  title,
  englishTitle,
  filterInputs,
  columns,
  inputs,
};

export default aboutMeModel;
