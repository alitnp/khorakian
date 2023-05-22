import { dateObjectFormatter } from '@/global/utils/helperFunctions';
import { IPostCommentRead } from '@my/types';
import React, { FC } from 'react';
import Image from 'next/image';
import webConfig from '@/global/constants/webConfig';

interface IProps {
  item: IPostCommentRead;
}
const Comment: FC<IProps> = ({ item }) => (
  <div className="grid ">
    <div className="flex items-center" key={item._id}>
      {item?.user.image.pathname ? (
        <Image
          src={webConfig.domain + item?.user.image.pathname}
          alt={''}
          width={item?.user.image.width}
          height={item?.user.image.height}
          className="object-cover w-full aspect-video md:aspect-auto md:w-[355.55px] md:h-[200px] transition-transform duration-500 ease-out group-hover:scale-110"
        />
      ) : (
        <div className="bg-teal-500 relative w-10 h-10 mx-1 rounded-full d-flex justify-center text-center items-center">
          <span className="mx-auto m-2 absolute font-bold text-lg bottom-0 top-0 left-0 right-0 ">
            {item?.user?.fullName.charAt(0)}
          </span>
        </div>
      )}
      <span className="font-bold text-base "> {item?.user?.fullName}</span>
      <span className="text-xs text-t-secondary-color mr-2">
        {dateObjectFormatter(item.user?.creationDate, 'DD MMMM YYYY')}
      </span>
    </div>
    <span className="text-sm my-2 ">{item.text}</span>
  </div>
);

export default Comment;
