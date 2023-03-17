import TcModal from '../Modal/TcModal';
import { useState } from 'react';

const TcImageModal = ({ url, ...props }) => {
  //state
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <>
      <img src={url} className='hover:cursor-pointer' style={{ width: '50px', height: '50px' }} onClick={() => setIsShowModal(true)} />
      {isShowModal && (
        <TcModal title='تصویر ثبت شده' footer={false} visible={isShowModal} onCancel={() => setIsShowModal(false)}>
          <img src={url} style={{ width: '100%', height: '100%' }} />
        </TcModal>
      )}
    </>
  );
};

export default TcImageModal;
