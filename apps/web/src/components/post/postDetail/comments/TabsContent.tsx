import EachComment from '@/components/post/postDetail/comments/EachComment';
import EachCommentReplyes from '@/components/post/postDetail/comments/EachCommentReplyes';
import { IPostCommentRead } from '@my/types';
import React, { FC } from 'react';

interface IProps {
  comments?: IPostCommentRead[];
  adminComments?: IPostCommentRead[];
}

const TabsContent: FC<IProps> = ({ comments, adminComments }) => (
  <>
    <div className="p-5">
      <EachComment comments={comments} />
      {/* //reply */}
      <div className="mr-10 my-5">
        <EachCommentReplyes comments={comments} />
      </div>
      <hr />
    </div>
  </>
);

export default TabsContent;
