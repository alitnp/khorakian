import TcModal from 'components/UI/Modal/TcModal';
import ArticleViewer from 'components/UI/ArticleViewer/ArticleViewer';
import { FC } from 'react';

interface IArticlePreview {
  content: [{ articleElementTypeId: number; content: string }];
  visible: boolean;
  close: () => void;
}

const ArticlePreview: FC<IArticlePreview> = ({ content, visible, close }) => {
  return (
    <TcModal footer={false} visible={visible} onCancel={close} title='پیش نمایش' width={1000}>
      <ArticleViewer content={content} />
    </TcModal>
  );
};

export default ArticlePreview;
