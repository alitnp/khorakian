import TcModal from 'components/UI/Modal/TcModal';
import { FC, useCallback } from 'react';
import { IPostRead } from '@my/types';
import PostPicker from 'components/UI/Post/PostPicker';

interface IPostPicker {
  visible: boolean;
  close(): void;
  handlePick: (_post: IPostRead) => void;
}

const PostPickerModal: FC<IPostPicker> = ({ visible, close, handlePick }) => {
  const onPick = useCallback((post: IPostRead) => {
    handlePick(post);
    close();
  }, []);

  return (
    <TcModal visible={visible} onCancel={close} width={768} title='انتخاب پست' footer={null}>
      <PostPicker handlePick={onPick} />
    </TcModal>
  );
};

export default PostPickerModal;
