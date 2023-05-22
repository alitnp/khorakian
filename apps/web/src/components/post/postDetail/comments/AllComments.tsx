import Comment from '@/components/post/postDetail/comments/Comment';
import CommentReplyes from '@/components/post/postDetail/comments/CommentReplyes';
import { ICommentReplyRead, IPostCommentRead } from '@my/types';
import React, { FC } from 'react';

interface IProps {
  comments?: IPostCommentRead[];
}

const AllComments: FC<IProps> = ({ comments }) => (
  <>
    <div className=" p-5">
      {comments?.map((item: IPostCommentRead) => {
        return (
          <div key={item._id} className=" p-3 m-3">
            <Comment item={item} />
            <div className="my-2 mr-6">
              {item.replies?.map((reply: ICommentReplyRead) => {
                return <CommentReplyes reply={reply} />;
              })}
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  </>
);

export default AllComments;
