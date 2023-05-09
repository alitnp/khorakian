import { IPostCommentRead } from '@my/types';
import React, { FC } from 'react';

interface IProps {
  comments: any;
}

const TabsLabel: FC<IProps> = ({ comments }) => (
  <div className="flex items-center p-3">
    <img
      className="rounded-full w-12 h-12 mx-2"
      src="https://avatars.githubusercontent.com/u/993399?v=4"
    />
    {comments.map((item: IPostCommentRead) => {
      <div className="grid" key={item._id}>
        <span className="font-bold text-base my-1">{item?.user?.fullName}</span>
        <span className="!text-xs text-neutral-700">
          {item?.user?.creationDate}
        </span>
      </div>;
    })}
  </div>
);

export default TabsLabel;
