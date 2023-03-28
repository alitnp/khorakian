import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcFormItem from 'components/UI/Form/TcFormItem';

const title = 'لیست افراد';
const englishTitle = 'user';

const filterInputs = (
  <>
    <TcFormItem name='fullName' label='نام ونام خانوادگی'>
      <TcInput placeholder='نام ونام خانوادگی' />
    </TcFormItem>
    <TcFormItem name='mobileNumber' label='شماره همراه'>
      <TcInput placeholder='شماره همراه' />
    </TcFormItem>
  </>
);

const columns = () =>
  // handleDelete?: (_id: string) => void
  {
    const columns: any[] = [
      { title: 'نام', key: 'firstName', dataIndex: 'firstName' },
      { title: 'نام ونام خانوادگی', key: 'fullName', dataIndex: 'fullName' },
      { title: 'شماره همراه', key: 'mobileNumber', dataIndex: 'mobileNumber' },
    ];
    // handleDelete &&
    //   columns.push({
    //     title: 'عملیات',
    //     key: 'operation',
    //     render: (_text: any, record: IImage) => (
    //       <div className='flex'>
    //         {/* <TcDetailIcon to={routes.effectivePointTypesDetail.path + '/' + record.id} /> */}
    //         <TcEditIcon to={routes.imageUpdate.path + '/' + record._id} />
    //         <TcDeleteIcon onConfirm={() => handleDelete(record._id)} />
    //       </div>
    //     ),
    //   });
    return columns;
  };

const userModel = {
  title,
  englishTitle,
  filterInputs,
  columns,
};

export default userModel;
