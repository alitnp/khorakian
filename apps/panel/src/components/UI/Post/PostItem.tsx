import { IImage, IPost } from '@my/types';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';

import { FC, memo } from 'react';

interface IPostThumbnail {
  post: IPost;
  onSelect?: (_post: IImage) => void;
  onRemove?: (_id: string) => void;
}

const PostItem: FC<IPostThumbnail> = ({ post, onRemove }) => {
  return (
    <div>
      {onRemove && (
        <div className='relative'>
          {post.title}
          <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full transition-opacity duration-300 opacity-0 bg-slate-800/30 hover:opacity-100'>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-t-bg-color'>
              <TcDeleteIcon onConfirm={() => onRemove(post._id)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(PostItem);
