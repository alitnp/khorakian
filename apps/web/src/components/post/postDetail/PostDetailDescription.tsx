import { dateObjectFormatter } from '@/global/utils/helperFunctions';
import { IPostRead } from '@my/types';
import React, { FC } from 'react';

interface IProps {
  post: IPostRead;
}

const PostDetailDescription: FC<IProps> = ({ post }) => (
  <div className=" max-w-screen-lg mx-auto my-10">
    <h1 className="text-xl font-bold">{post?.title}</h1>
    <span className="text-xs text-t-secondary-color ">
      {dateObjectFormatter(post?.creationDate, 'DD MMMM YYYY')}
    </span>

    <p className="my-3 text-sm">{post?.text}</p>
  </div>
);

export default PostDetailDescription;
