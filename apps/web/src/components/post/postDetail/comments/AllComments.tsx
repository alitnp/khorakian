import Comment from '@/components/post/postDetail/comments/Comment';
import CommentReplyes from '@/components/post/postDetail/comments/CommentReplyes';
import { ICommentReplyRead, IPostCommentRead, IPostRead } from '@my/types';
import React, { FC, useState } from 'react';
import MyButton from '@/components/basicUi/MyButton';
import AddCommentModal from '@/components/post/postDetail/comments/AddCommentModal';
import webEndpointUrls from '@/global/constants/webEndpointUrls';

interface IProps {
  comments?: IPostCommentRead[];
  post: IPostRead;
}

const AllComments: FC<IProps> = ({ comments, post }) => {
  //state
  const [showCommentModel, setShowCommentModel] = useState<boolean>(false);

  console.log(post);

  return (
    <>
      <div className="flex justify-end">
        <MyButton
          onClick={() => setShowCommentModel(true)}
          type="primary"
          className="mt-4 ml-4"
        >
          ثبت نظر جدید
        </MyButton>
      </div>
      <div className="px-2">
        {comments?.map((item: IPostCommentRead) => {
          return (
            <>
              <div key={item._id} className=" p-3 m-3">
                <Comment item={item} />
                <div className="my-2 mr-6">
                  {item.replies?.map((reply: ICommentReplyRead) => {
                    return <CommentReplyes reply={reply} />;
                  })}
                </div>
                <hr />
              </div>
            </>
          );
        })}
      </div>
      {showCommentModel && (
        <AddCommentModal
          title="پاسخ به نظر"
          visible={showCommentModel}
          close={() => setShowCommentModel(false)}
          endPointUrl={
            webEndpointUrls.createCommentPost + '/' + '6460cb1e55767018eb81dbda'
          }
          footer={false}
        />
      )}
    </>
  );
};

export default AllComments;
