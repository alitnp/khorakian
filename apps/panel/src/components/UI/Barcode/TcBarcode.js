import classes from './style.module.css';
import { BarcodeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import TcModal from 'components/UI/Modal/TcModal';
import Barcode from 'react-barcode';
import TcButton from 'components/UI/Button/TcButton';

const TcBarcode = ({ value, children, className }) => {
  //states
  const [showBarcode, setShowBarcode] = useState(false);

  //functions
  const toggleShowBarcode = () => setShowBarcode((prevState) => !prevState);

  return (
    <>
      <div className={`${classes['link']} ${className}`}>
        <p>{children}</p>
        <span className={`${classes['content']} cursor-pointer`} onClick={toggleShowBarcode}>
          {children}
        </span>
        <div className={`${classes['icon']}`}>
          <BarcodeOutlined />
        </div>
      </div>
      <TcModal visible={showBarcode} onCancel={toggleShowBarcode} title='تصویر بارکد' footer={false}>
        <div className='flex justify-center'>
          <Barcode value={value} />
        </div>
        <div className='flex justify-end mt-6'>
          <TcButton onClick={toggleShowBarcode}>بازگشت</TcButton>
        </div>
      </TcModal>
    </>
  );
};

export default TcBarcode;
