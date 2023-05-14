import webConfig from '@/global/constants/webConfig';
import { dateObjectFormatter } from '@/global/utils/helperFunctions';
import { ICommentReplyRead } from '@my/types';
import Image from 'next/image';
import React, { FC } from 'react';

interface IProps {
  reply: ICommentReplyRead;
}

const CommentReplyes: FC<IProps> = ({ reply }) => (
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
        <span className="font-bold text-base "> {reply?.user?.fullName}</span>
        <span className="text-xs text-t-secondary-color mr-2">
          {dateObjectFormatter(reply?.creationDate, 'DD MMMM YYYY')}
        </span>
      </div>
      <span className="text-sm my-2 ">{reply.text}</span>
    </div>
  </>
);

export default CommentReplyes;
