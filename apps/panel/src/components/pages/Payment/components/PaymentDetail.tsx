import TcModal from 'components/UI/Modal/TcModal';
import { FC } from 'react';
import paymentImage from 'assets/images/payment.jpg';
import TcButton from 'components/UI/Button/TcButton';

interface IPaymentDetail {
  visible: boolean;
  close(): void;
}

const PaymentDetail: FC<IPaymentDetail> = ({ visible, close }) => {
  //functions
  const handleConfirm = () => {};

  return (
    <TcModal onCancel={close} footer={null} visible={visible} title='جزئیات پرداخت'>
      <img src={paymentImage} alt='' className='w-full' />
      <div className='mt-6'>
        <TcButton className='w-full' type='primary' onClick={handleConfirm}>
          تایید پرداخت
        </TcButton>
      </div>
    </TcModal>
  );
};

export default PaymentDetail;
