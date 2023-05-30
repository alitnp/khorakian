import Comment from '@/components/post/postDetail/comments/Comment';
import CommentReplyes from '@/components/post/postDetail/comments/CommentReplyes';
import { ICommentReplyRead, IGlobalCommentRead } from '@my/types';
import React, { FC, useState } from 'react';
import MyButton from '@/components/basicUi/MyButton';
import AddCommentModal from '@/components/post/postDetail/comments/AddCommentModal';
import webEndpointUrls from '@/global/constants/webEndpointUrls';

interface IProps {
  comments?: IGlobalCommentRead[];
  parentId: number | string;
  refetch: () => void;
  commentCreateUrl: string;
}

const AllComments: FC<IProps> = ({
  comments,
  parentId,
  refetch,
  commentCreateUrl,
}) => {
  //state
  const [showCommentModel, setShowCommentModel] = useState<boolean>(false);
  //func
  const toggleShowDateFromTo = () => setShowCommentModel(false);
  return (
    <>
      <div className="flex justify-end">
        <MyButton
          onClick={() => setShowCommentModel(true)}
          type="primary"
          className="sm:mt-4 sm:ml-4 m-3"
        >
          ثبت نظر جدید
        </MyButton>
      </div>
      <div className="px-2">
        {comments ? (
          comments?.map((item: IGlobalCommentRead) => {
            return (
              <>
                <div key={item._id} className=" sm:p-3 m-3">
                  <Comment item={item} refetch={refetch} />
                  <div className="my-2 mr-6">
                    {item.replies?.map((reply: ICommentReplyRead) => {
                      return <CommentReplyes reply={reply} />;
                    })}
                  </div>
                  <hr style={{ borderWidth: '1px' }} />
                </div>
              </>
            );
          })
        ) : (
          <div className="pb-5 mx-auto mb-4 px-7 flex justify-center items-center  text-base text-k-grey-text-color ">
            نظری یافت نشد...!
          </div>
        )}
      </div>
      {showCommentModel && (
        <AddCommentModal
          title="پاسخ به نظر"
          visible={showCommentModel}
          close={toggleShowDateFromTo}
          endPointUrl={commentCreateUrl + '/' + parentId}
          footer={false}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default AllComments;
