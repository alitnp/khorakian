import { IUserRead } from '@my/types';
import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcDetailIcon from 'components/UI/TableIcons/TcDetailIcon';
import routes from 'global/Constants/routes';

const title = 'پیام های من';
const englishTitle = 'directMessage';

const inputs = (
  <>
    <TcFormItem name='text' label='متن'>
      <TcTextarea placeholder='متن' />
    </TcFormItem>
  </>
);

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
      title: 'ثبت کننده',
      key: 'user',
      dataIndex: 'user',
      render: (text: IUserRead) => text.fullName,
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
  inputs,
};

export default directMessageModel;
