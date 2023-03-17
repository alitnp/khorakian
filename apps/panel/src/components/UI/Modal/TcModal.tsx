import { Modal, ModalProps } from 'antd';
import { FC } from 'react';

interface ITcModal extends ModalProps {
  title: string;
}

const TcModal: FC<ITcModal> = ({ children, title, visible, ...props }) => {
  return (
    <Modal centered destroyOnClose {...props} open={visible} title={<p className='mb-0'>{title}</p>}>
      <div className='border-t border-t-border-color-base'>{children}</div>
    </Modal>
  );
};

export default TcModal;
