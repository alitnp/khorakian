import AddCommentModal from '@/components/post/postDetail/comments/AddCommentModal';

import React, { FC, useState } from 'react';

interface IProps {
  refetch: () => void;
  commentCreateUrl: string;
  parentId: string | number;
}

const FirstCommentBox: FC<IProps> = ({
  refetch,
  commentCreateUrl,
  parentId,
}) => {
  //state
  const [showCommentModel, setShowCommentModel] = useState<boolean>(false);
  //func
  const toggleShow = () => setShowCommentModel((prev) => !prev);

  return (
    <>
      <div className="flex justify-center text-k-grey-text-color transition items-center hover:text-k-text-color">
        <div
          onClick={() => setShowCommentModel(true)}
          className="border flex justify-center   items-center cursor-pointer border-dashed w-[30%] h-24 p-3 m-3"
        >
          برای نوشتن نظر خود کلیک کنید...!
        </div>
      </div>

      {showCommentModel && (
        <AddCommentModal
          title="ثبت نظر "
          visible={showCommentModel}
          close={toggleShow}
          endPointUrl={commentCreateUrl + '/' + parentId}
          footer={false}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default FirstCommentBox;
