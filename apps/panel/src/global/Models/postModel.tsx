import { IImage, IPostCategory, IPostRead } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';
import TcSelectReduxSearch from 'components/UI/Form/Inputs/TcSelectReduxSearch';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import TcFormItem from 'components/UI/Form/TcFormItem';
import ImageItem from 'components/UI/Image/ImageItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import routes from 'global/Constants/routes';
import { getAllPostCategories } from 'redux/reducer/PostCategory/getAllPostCategories';
import TcDatePicker from 'components/UI/DatePicker/TcDatePicker copy';
import { dateObjectFormatter } from 'global/helperFunctions/dateFormatter';

const title = 'پست';
const englishTitle = 'post';

const inputs = (
  <>
    <TcFormItem name='title' label='عنوان' rules={[{ required: true, message: 'عنوان پست تعیین نشده' }]}>
      <TcInput />
    </TcFormItem>
    <TcFormItem label='دسته بندی' name='postCategory' rules={[{ required: true, message: 'دسته بندی پست تعیین نشده' }]}>
      <TcSelectReduxSearch reducerListProperty='list' getlist={getAllPostCategories} reducerName='postCategory' />
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
    <TcFormItem label='زمان وقوع' name='eventDate'>
      <TcDatePicker />
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
    <TcFormItem label='دسته بندی' name='postCategory'>
      <TcSelectReduxSearch reducerListProperty='list' getlist={getAllPostCategories} reducerName='postCategory' />
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
    <TcFormItem label='متن' name='text'>
      <TcInput placeholder='متن' />
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
      render: (_text: string, record: IPostRead) => <ImageItem image={record?.videos[0]?.thumbnail ? record?.videos[0]?.thumbnail : record.images[0]} />,
    },
    {
      title: 'عنوان',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'دسته بندی',
      key: 'postCategory',
      dataIndex: 'postCategory',
      render: (text: IPostCategory) => text?.title,
    },
    { title: 'زمان وقوع', key: 'eventDate', dataIndex: 'eventDate', render: (text: number) => dateObjectFormatter(text) },
    {
      title: 'برجسته',
      key: 'featured',
      dataIndex: 'featured',
      render: (_text: string, record: IPostRead) => (record?.featured ? 'بله' : 'خیر'),
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
    {
      title: 'عکس',
      key: 'images',
      dataIndex: 'images',
      render: (_text: string, record: IPostRead) => (record.images?.length && record.images?.length > 0 ? record.images.length : 'ندارد'),
    },
    {
      title: 'ویدیو',
      key: 'videos',
      dataIndex: 'videos',
      render: (_text: string, record: IPostRead) => (record.videos.length && record.videos.length > 0 ? record.videos.length : 'ندارد'),
    },
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

const postModel = {
  title,
  englishTitle,
  filterInputs,
  columns,
  inputs,
};

export default postModel;
