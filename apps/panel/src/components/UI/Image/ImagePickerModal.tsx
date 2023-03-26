import TcModal from 'components/UI/Modal/TcModal';
import { FC, useCallback } from 'react';
import { IImage } from '@my/types';
import ImagePicker from 'components/UI/Image/ImagePicker';

interface IImagePicker {
  visible: boolean;
  close(): void;
  handlePick: (_image: IImage) => void;
}

const ImagePickerModal: FC<IImagePicker> = ({ visible, close, handlePick }) => {
  const onPick = useCallback((image: IImage) => {
    handlePick(image);
    close();
  }, []);

  return (
    <TcModal visible={visible} onCancel={close} title='انتخاب عکس' footer={null}>
      <ImagePicker handlePick={onPick} />
    </TcModal>
  );
};

export default ImagePickerModal;
