import { IPostCommentRead } from '@my/types';
import React, { FC } from 'react';

interface IProps {
  comments: any;
}
const EachComment: FC<IProps> = ({ comments }) => (
  <div className="grid m-3">
    {comments?.map((item: IPostCommentRead) => {
      <>
        <div className="flex items-center" key={item._id}>
          <img
            className="rounded-full w-10 h-10 ml-2"
            src="https://th.bing.com/th/id/OIP.qCX28C2yauUFbPwdysXYgAAAAA?pid=ImgDet&w=474&h=474&rs=1"
          />
          <span className="font-bold text-base "> {item.user.fullName}</span>
          <span className="text-xs text-t-secondary-color mr-2">
            {item.user.creationDate}
          </span>
        </div>
        <span className="text-sm my-2 ">{item.text}</span>
      </>;
    })}
  </div>
);

export default EachComment;
