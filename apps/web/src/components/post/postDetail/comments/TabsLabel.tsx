import webConfig from '@/global/constants/webConfig';
import { dateObjectFormatter } from '@/global/utils/helperFunctions';
import { IPostCommentRead } from '@my/types';
import Image from 'next/image';
import React, { FC } from 'react';

interface IProps {
  comments?: IPostCommentRead[];
}

const TabsLabel: FC<IProps> = ({ comments }) => (
  <div className="flex items-center ">
    {comments?.map((item: IPostCommentRead) => {
      return (
        <>
          {item?.user.image.pathname ? (
            <Image
              src={webConfig.domain + item?.user.image.pathname}
              alt={''}
              width={item?.user.image.width}
              height={item?.user.image.height}
              className="object-cover w-full aspect-video md:aspect-auto md:w-[355.55px] md:h-[200px] transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="relative flex items-center justify-center w-10 h-10 mx-1 text-center bg-teal-500 rounded-full">
              <span className="absolute top-0 bottom-0 left-0 right-0 m-2 mx-auto text-lg font-bold ">
                {item?.user?.fullName.charAt(0)}
              </span>
            </div>
          )}
          <div className="grid" key={item._id}>
            <span className="my-1 text-base font-bold">
              {item?.user?.fullName}
            </span>
            <span className="!text-xs text-neutral-700">
              {dateObjectFormatter(item.user?.creationDate, 'DD MMMM YYYY')}
            </span>
          </div>
        </>
      );
    })}
  </div>
);

export default TabsLabel;
