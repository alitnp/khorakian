import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import routes from 'global/Constants/routes';

const title = 'تاریخچه';
const englishTitle = 'history';

const filterInputs = (
  <>
    <TcFormItem name='title' label='عنوان' rules={[{ required: true, message: 'عنوان تعیین نشده' }]}>
      <TcInput placeholder='عنوان' />
    </TcFormItem>
    <TcFormItem name='from' label='از سال' rules={[{ required: true, message: 'سال شروع تعیین نشده' }]}>
      <TcInput placeholder='از سال' />
    </TcFormItem>
    <TcFormItem name='to' label='تا سال' rules={[{ required: true, message: 'سال پایان تعیین نشده' }]}>
      <TcInput placeholder='تا سال' />
    </TcFormItem>
  </>
);

const inputs = filterInputs;

const columns = (handleDelete?: (_id: string) => void) => {
  const columns: any[] = [
    { title: 'عنوان', key: 'title', dataIndex: 'title' },
    {
      title: 'از سال',
      key: 'from',
      dataIndex: 'from',
    },
    {
      title: 'تا سال',
      key: 'to',
      dataIndex: 'to',
    },
  ];
  handleDelete &&
    columns.push({
      title: 'عملیات',
      render: (_text: any, record: Record<string, any>) => (
        <div className='flex'>
          {<TcEditIcon to={`${routes.historyEdit.path}/${record._id}`} />}
          {<TcDeleteIcon onConfirm={() => handleDelete(record._id)} />}
        </div>
      ),
    });
  return columns;
};

const historyModel = {
  title,
  englishTitle,
  filterInputs,
  columns,
  inputs,
};

export default historyModel;
