import { IImage, IAboutMeRead } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';

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
    <TcFormItem name='title' label='عنوان'>
      <TcInput placeholder='عنوان' />
    </TcFormItem>

    <TcFormItem label='متن' name='text'>
      <TcInput placeholder='متن' />
    </TcFormItem>
  </>
);

const columns = (handleDelete?: (_id: string) => void) => {
  const columns: any[] = [
    {
      title: 'عنوان',
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
