import TcModal from 'components/UI/Modal/TcModal';
import endpointUrls from 'global/Constants/endpointUrls';
import { Link } from 'react-router-dom';

const SidebarModalApplication = ({ isShowModal, setIsShowModal }) => {
  const cancelModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <TcModal visible={isShowModal} onCancel={cancelModal} footer={null} title='نسخه‌های وب اپلیکشن IGT'>
        <div className='mt-4'>
          <a href={endpointUrls.mobileApp} target='_blank' rel='noreferrer' className='text-base text-t-secondary-color'>
            دانلود نرم افزار موبایل
          </a>
        </div>
      </TcModal>
    </>
  );
};

export default SidebarModalApplication;
