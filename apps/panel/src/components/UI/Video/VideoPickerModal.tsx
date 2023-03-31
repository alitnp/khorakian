import TcModal from 'components/UI/Modal/TcModal';
import { FC, useCallback } from 'react';
import { IVideoRead } from '@my/types';
import VideoPicker from 'components/UI/Video/VideoPicker';

interface IVideoPickerModal {
  visible: boolean;
  close(): void;
  handlePick: (_video: IVideoRead) => void;
}

const VideoPickerModal: FC<IVideoPickerModal> = ({ visible, close, handlePick }) => {
  const onPick = useCallback((video: IVideoRead) => {
    handlePick(video);
    close();
  }, []);

  return (
    <TcModal visible={visible} onCancel={close} title='انتخاب ویدیو' footer={null} width={768}>
      <VideoPicker handlePick={onPick} />
    </TcModal>
  );
};

export default VideoPickerModal;
