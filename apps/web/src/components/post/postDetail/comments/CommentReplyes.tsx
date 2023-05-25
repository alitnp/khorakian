import webConfig from '@/global/constants/webConfig';
import { dateObjectFormatter } from '@/global/utils/helperFunctions';
import { ICommentReplyRead } from '@my/types';
import Image from 'next/image';
import React, { FC } from 'react';

interface IProps {
  reply: ICommentReplyRead;
  isLiked?: boolean;
}

const CommentReplyes: FC<IProps> = ({ reply, isLiked }) => (
  <>
    <div className="grid rounded-md  ">
      <div className="flex items-center">
        {reply?.user?.image?.pathname ? (
          <Image
            src={webConfig.domain + reply?.user.image.pathname}
            alt={''}
            width={reply?.user.image.width}
            height={reply?.user.image.height}
            className="object-cover w-full aspect-video md:aspect-auto md:w-[355.55px] md:h-[200px] transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="bg-red-400  relative w-10 h-10 mx-1 rounded-full d-flex justify-center text-center items-center">
            <span className="mx-auto m-2 absolute font-bold text-lg bottom-0 top-0 left-0 right-0 ">
              {reply?.user?.fullName?.charAt(0)}
            </span>
          </div>
        )}

        <div className="grid">
          <div className="flex">
            <span className="font-bold text-base ">
              {reply?.user?.fullName}
            </span>
            {/* <div className="flex justify-center  text-k-grey-text-color items-center gap-1 mr-3 k-like-icon group">
              <span className={isLiked ? 'text-k-primary-color' : ''}>
                <AiFillHeart className="text-base" />
              </span>
             <span className="!drop-shadow-none  text-xs !filter-none group-hover:text-k-primary-color">
                پسند
              </span> 
            </div> */}
            {/* <div className="flex items-center text-k-grey-text-color gap-1 mr-2 group k-comment-icon">
              <span className={isLiked ? 'text-k-secondary-color' : ''}>
                <BsReply className="text-lg" />
              </span>
              <span className=" text-xs  group-hover:text-k-secondary-color">
                پاسخ
              </span>
            </div> */}
          </div>
          <span className="text-xs text-t-secondary-color mr-2">
            {dateObjectFormatter(reply?.creationDate, 'DD MMMM YYYY')}
          </span>
        </div>
      </div>
      <span className="text-sm my-2 mr-3">{reply.text}</span>
    </div>
  </>
);

export default CommentReplyes;
