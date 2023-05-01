import { IImage, IPostCategory, IAboutMe } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';
import TcSelectReduxSearch from 'components/UI/Form/Inputs/TcSelectReduxSearch';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcDetailIcon from 'components/UI/TableIcons/TcDetailIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import routes from 'global/Constants/routes';
import { getAllPostCategories } from 'redux/reducer/PostCategory/getAllPostCategories';

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
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'متن',
      key: 'text',
      dataIndex: 'text',
    },
    {
      title: 'عکس',
      key: 'images',
      dataIndex: 'images',
      render: (_text: string, record: IAboutMe) => (record.images?.length && record.images?.length > 0 ? record.images.length : 'ندارد'),
    },
    {
      title: 'پست',
      key: 'posts',
      dataIndex: 'posts',
      render: (_text: string, record: IAboutMe) => (record.posts?.length ? record.posts.length : 'ندارد'),
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
