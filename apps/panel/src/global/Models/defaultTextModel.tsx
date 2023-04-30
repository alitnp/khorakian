import { IDefaultText } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import routes from 'global/Constants/routes';

const title = 'متن پیشفرض';
const englishTitle = 'defaultText';

const filterInputs = (
  <>
    <TcFormItem name='key' label='کلید'>
      <TcInput placeholder='کلید' />
    </TcFormItem>
    <TcFormItem name='text' label='متن'>
      <TcInput placeholder='متن' />
    </TcFormItem>
  </>
);

const columns = (handleDelete?: (_id: string) => void) => {
  const columns: any[] = [
    { title: 'کلید', key: 'key', dataIndex: 'key' },

    {
      title: 'متن',
      key: 'text',
      dataIndex: 'text',
    },
  ];
  handleDelete &&
    columns.push({
      title: 'عملیات',
      render: (_text: any, record: Record<string, any>) => (
        <div className='flex'>
          {<TcEditIcon to={`${routes.defaultTextEdit.path}/${record._id}`} />}
          {<TcDeleteIcon onConfirm={() => handleDelete(record._id)} />}
        </div>
      ),
    });
  return columns;
};

const defaultTextModel = {
  title,
  englishTitle,
  filterInputs,
  columns,
};

export default defaultTextModel;
