import TcModal from 'components/UI/Modal/TcModal';
import { FC, useCallback } from 'react';
import { IPost } from '@my/types';
import PostPicker from 'components/UI/Post/PostPicker';

interface IPostPicker {
  visible: boolean;
  close(): void;
  handlePick: (_post: IPost) => void;
}

const PostPickerModal: FC<IPostPicker> = ({ visible, close, handlePick }) => {
  const onPick = useCallback((post: IPost) => {
    handlePick(post);
    close();
  }, []);

  return (
    <TcModal visible={visible} onCancel={close} title='انتخاب پست' footer={null}>
      <PostPicker handlePick={onPick} />
    </TcModal>
  );
};

export default PostPickerModal;
