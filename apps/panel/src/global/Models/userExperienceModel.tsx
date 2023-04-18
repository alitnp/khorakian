import { IImage, IUserExperienceCategory, IUserExperienceRead } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';
import TcSelectReduxSearch from 'components/UI/Form/Inputs/TcSelectReduxSearch';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import routes from 'global/Constants/routes';
import { getAllUserExperienceCategories } from 'redux/reducer/UserExperienceCategory/getAllUserExperienceCategories';

const title = 'تجربیات کاربران';
const englishTitle = 'userExperience';

const inputs = (
  <>
    <TcFormItem name='title' label='عنوان' rules={[{ required: true, message: 'عنوان تجربه تعیین نشده' }]}>
      <TcInput />
    </TcFormItem>
    <TcFormItem label='دسته بندی' name='userExperienceCategory' rules={[{ required: true, message: 'دسته بندی تجربه تعیین نشده' }]}>
      <TcSelectReduxSearch reducerListProperty='list' getlist={getAllUserExperienceCategories} reducerName='userExperienceCategory' />
    </TcFormItem>
    <TcFormItem label='برجسته (Featured)' name='featured' initialValue={false}>
      <TcSelect
        options={[
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          { label: 'بله', value: true },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          { label: 'خیر', value: false },
        ]}
      />
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
    <TcFormItem label='دسته بندی' name='userExperienceCategory'>
      <TcSelectReduxSearch reducerListProperty='list' getlist={getAllUserExperienceCategories} reducerName='userExperienceCategory' />
    </TcFormItem>
    <TcFormItem label='برجسته (Featured)' name='featured'>
      <TcSelect
        options={[
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          { label: 'بله', value: true },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          { label: 'خیر', value: false },
        ]}
      />
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
      title: 'دسته بندی',
      key: 'userExperienceCategory',
      dataIndex: 'userExperienceCategory',
      render: (text: IUserExperienceCategory) => text?.title,
    },
    {
      title: 'برجسته',
      key: 'featured',
      dataIndex: 'featured',
      render: (_text: string, record: IUserExperienceRead) => (record.featured ? 'بله' : 'خیر'),
    },
    {
      title: 'تعداد بازدید',
      key: 'viewCount',
      dataIndex: 'viewCount',
    },
    {
      title: 'تعداد پسند',
      key: 'likeCount',
      dataIndex: 'likeCount',
    },
    {
      title: 'تعداد نظر',
      key: 'commentCount',
      dataIndex: 'commentCount',
    },
  ];

  handleDelete &&
    columns.push({
      title: 'عملیات',
      key: 'operation',
      render: (_text: any, record: IImage) => (
        <div className='flex'>
          {/* <TcDetailIcon to={routes.effectivePointTypesDetail.path + '/' + record.id} /> */}
          <TcEditIcon to={routes.userExperienceEdit.path + '/' + record._id} />
          <TcDeleteIcon onConfirm={() => handleDelete(record._id)} />
        </div>
      ),
    });
  return columns;
};

const experienceModel = {
  title,
  englishTitle,
  filterInputs,
  columns,
  inputs,
};

export default experienceModel;
