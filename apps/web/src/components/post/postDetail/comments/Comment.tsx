import { dateObjectFormatter } from '@/global/utils/helperFunctions';
import { IPostCommentRead } from '@my/types';
import React, { FC, useState } from 'react';
import Image from 'next/image';
import webConfig from '@/global/constants/webConfig';
import { AiFillHeart } from 'react-icons/ai';
import { BsReply } from 'react-icons/bs';
import AddCommentModal from '@/components/post/postDetail/comments/AddCommentModal';
import webEndpointUrls from '@/global/constants/webEndpointUrls';

interface IProps {
  item: IPostCommentRead;
  isLiked?: boolean;
}
const Comment: FC<IProps> = ({ item, isLiked }) => {
  //state
  const [showCommentModel, setShowCommentModel] = useState<boolean>(false);

  return (
    <>
      <div className="grid ">
        <div className="flex items-center" key={item._id}>
          {item?.user?.image?.pathname ? (
            <Image
              src={webConfig.domain + item?.user.image.pathname}
              alt={''}
              width={item?.user.image.width}
              height={item?.user.image.height}
              className="object-cover w-full aspect-video md:aspect-auto md:w-[355.55px] md:h-[200px] transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="relative items-center justify-center w-10 h-10 mx-1 text-center bg-teal-500 rounded-full d-flex">
              <span className="absolute top-0 bottom-0 left-0 right-0 m-2 mx-auto text-lg font-bold ">
                {item?.user?.fullName.charAt(0)}
              </span>
            </div>
          )}

          <div className="grid">
            <div className="flex">
              <span className="text-base font-bold ">
                {' '}
                {item?.user?.fullName}
              </span>
              <div className="flex justify-center text-k-grey-text-color items-center gap-1 mr-3 k-like-icon group">
                <span className={isLiked ? 'text-k-primary-color' : ''}>
                  <AiFillHeart className="text-base" />
                </span>
                {/* <span className="!drop-shadow-none  text-xs !filter-none group-hover:text-k-primary-color">
              (0)
            </span> */}
              </div>
              <div
                onClick={() => setShowCommentModel(true)}
                className="flex  items-center text-k-grey-text-color gap-1 mr-2 group k-comment-icon"
              >
                <span className={isLiked ? 'text-k-secondary-color' : ''}>
                  <BsReply className="text-lg" />
                </span>
                <span className=" text-xs  group-hover:text-k-secondary-color">
                  پاسخ
                </span>
              </div>
            </div>
            <span className="mr-2 text-xs text-t-secondary-color">
              {dateObjectFormatter(item.user?.creationDate, 'DD MMMM YYYY')}
            </span>
          </div>
        </div>
        <span className="my-2 text-sm mr-3">{item.text}</span>
      </div>
      {showCommentModel && (
        <AddCommentModal
          title="پاسخ به نظر"
          visible={showCommentModel}
          close={() => setShowCommentModel(false)}
          endPointUrl={webEndpointUrls.createCommentPostReply + '/' + item._id}
          footer={false}
        />
      )}
    </>
  );
};

export default Comment;
