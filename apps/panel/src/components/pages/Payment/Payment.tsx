import PaymentDetail from 'components/pages/Payment/components/PaymentDetail';
import TcCard from 'components/UI/Card/TcCard';
import TcPageTitle from 'components/UI/PageTitle/TcPageTitle';
import TcTable from 'components/UI/Table/TcTable';
import { FC, useState } from 'react';

const Payment: FC = () => {
  //states
  const [showPayment, setShowPayment] = useState<boolean>(false);

  //constants
  const data = [
    {
      id: 1,
      creationDate: '1401/11/10',
      creationTime: '14:31',
      user: '09124345343',
      package: 'بسته ۵۰۰ پیپی',
    },
  ];
  const columns = [
    {
      title: 'کاربر',
      key: 'user',
      dataIndex: 'user',
    },
    {
      title: 'نام بسته',
      key: 'package',
      dataIndex: 'packeage',
    },
    {
      title: 'جزئیات',
      render: () => (
        <span className='text-sm cursor-pointer text-t-secondary-color hover:underline' onClick={() => setShowPayment(true)}>
          جزئیات پرداخت
        </span>
      ),
    },
  ];

  return (
    <TcCard>
      <TcPageTitle title='پرداخت ها' />
      <TcTable dataSource={data} columns={columns} />
      <PaymentDetail close={() => setShowPayment(false)} visible={showPayment} />
    </TcCard>
  );
};

export default Payment;
