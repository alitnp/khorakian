import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDetailIcon from 'components/UI/TableIcons/TcDetailIcon';
import routes from 'global/Constants/routes';

const title = 'پیام های من';
const englishTitle = 'directMessage';

const filterInputs = (
  <>
    <TcFormItem name='userId' label='افراد'>
      <TcInput placeholder='جستجو' />
    </TcFormItem>
  </>
);

const columns = (handleDelete?: (_id: string) => void) => {
  const columns: any[] = [
    {
      title: 'متن',
      key: 'text',
      dataIndex: 'text',
    },
    {
      title: 'ارجاع دهنده',
    },
  ];
  handleDelete &&
    columns.push({
      title: 'عملیات',
      render: (_text: any, record: Record<string, any>) => (
        <div className='flex'>
          {<TcDetailIcon to={`${routes.directMessageDetail.path}/${record._id}`} />}
          {/* {<TcDeleteIcon onConfirm={() => handleDelete(record._id)} />} */}
        </div>
      ),
    });
  return columns;
};

const directMessageModel = {
  title,
  englishTitle,
  filterInputs,
  columns,
};

export default directMessageModel;
