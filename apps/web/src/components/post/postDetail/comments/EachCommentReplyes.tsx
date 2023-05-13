import { ICommentReply, IPostCommentRead } from '@my/types';
import React, { FC } from 'react';
import Image from 'next/image';
import webConfig from '@/global/constants/webConfig';
import { dateObjectFormatter } from '@/global/utils/helperFunctions';

interface IProps {
  comments?: IPostCommentRead[];
}

const EachCommentReplyes: FC<IProps> = ({ comments }) => (
  <div className="grid m-3">
    {comments?.map((item: IPostCommentRead) =>
      item?.replies?.map((reply: ICommentReply, index: number) => {
        return (
          <React.Fragment key={index}>
            <div className="flex items-center">
              {reply.user?.image?.pathname ? (
                <Image
                  src={
                    (webConfig.domain as string) +
                    '/' +
                    reply.user?.image?.pathname
                  }
                  width={item.user?.image?.width || 100}
                  height={item.user?.image?.height || 100}
                  alt={''}
                  className="shrink-0 w-full aspect-video md:aspect-auto md:w-[355.55px] md:h-[200px] object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              ) : (
                <img
                  className="rounded-full w-10 h-10 ml-2"
                  src="https://th.bing.com/th/id/OIP.qCX28C2yauUFbPwdysXYgAAAAA?pid=ImgDet&w=474&h=474&rs=1"
                />
              )}
              <span className="font-bold text-base ">
                {' '}
                {reply.user?.fullName}
              </span>
              <span className="text-xs text-t-secondary-color mr-2">
                {dateObjectFormatter(reply.user?.creationDate)}
              </span>
            </div>
            <span className="text-sm my-2 ">{item.text}</span>
          </React.Fragment>
        );
      })
    )}
  </div>
);

export default EachCommentReplyes;
