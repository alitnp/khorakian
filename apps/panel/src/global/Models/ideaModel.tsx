import { IIdeaRead } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import routes from 'global/Constants/routes';

const title = 'ایده';
const englishTitle = 'idea';

// const inputs = (
//   <>
//     <TcFormItem name='title' label='عنوان' rules={[{ required: true, message: 'عنوان پست تعیین نشده' }]}>
//       <TcInput />
//     </TcFormItem>
//     <TcFormItem label='دسته بندی' name='postCategory' rules={[{ required: true, message: 'دسته بندی پست تعیین نشده' }]}>
//       <TcSelectReduxSearch reducerListProperty='list' getlist={getAllPostCategories} reducerName='postCategory' />
//     </TcFormItem>
//     <TcFormItem label='برجسته (Featured)' name='featured' initialValue={false}>
//       <TcSelect
//         options={[
//           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//           //@ts-ignore
//           { label: 'بله', value: true },
//           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//           //@ts-ignore
//           { label: 'خیر', value: false },
//         ]}
//       />
//     </TcFormItem>
//     <TcFormItem label='متن' name='text' full>
//       <TcTextarea placeholder='متن' />
//     </TcFormItem>
//   </>
// );

const filterInputs = (
  <>
    <TcFormItem name='title' label='عنوان'>
      <TcInput placeholder='عنوان' />
    </TcFormItem>
  </>
);

const columns = (handleDelete?: (_id: string) => void) => {
  const columns: any[] = [
    { title: 'عنوان', key: 'title', dataIndex: 'title' },
    {
      title: 'دسته بندی',
      key: 'postCategory',
      dataIndex: 'postCategory',
      render: (_text: string, record: IIdeaRead) => record.ideaCategory.title,
    },
    {
      title: 'تعداد بازدید',
      key: 'viewCount',
      dataIndex: 'viewCount',
    },
    {
      title: 'برجسته',
      render: (_text: string, record: IIdeaRead) => (record.featured ? 'هست' : 'نیست'),
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
    { title: 'توضیحات', key: 'text', dataIndex: 'text' },
    { title: 'وضعیت', render: (_text: any, record: Record<string, any>) => (record.isApprove ? 'تایید شده' : 'تایید نشده') },
  ];
  handleDelete &&
    columns.push({
      title: 'عملیات',
      render: (_text: any, record: Record<string, any>) => (
        <div className='flex'>
          {<TcEditIcon to={`${routes.ideaEdit.path}/${record._id}`} />}
          {<TcDeleteIcon onConfirm={() => handleDelete(record._id)} />}
        </div>
      ),
    });
  return columns;
};

const ideaModel = {
  title,
  englishTitle,
  filterInputs,
  columns,
  //inputs,
};

export default ideaModel;
