import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import { IPostCommentRead } from "@my/types";
import React, { FC } from "react";
import Image from "next/image";
import webConfig from "@/global/constants/webConfig";

interface IProps {
	item: IPostCommentRead;
}
const Comment: FC<IProps> = ({ item }) => (
	<div className="grid ">
		<div className="flex items-center" key={item._id}>
			{item?.user?.image?.pathname ? (
				<Image
					src={webConfig.domain + item?.user.image.pathname}
					alt={""}
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
			<span className="text-base font-bold ">
				{" "}
				{item?.user?.fullName}
			</span>
			<span className="mr-2 text-xs text-t-secondary-color">
				{dateObjectFormatter(
					item.user?.creationDate,
					"DD MMMM YYYY"
				)}
			</span>
		</div>
		<span className="my-2 text-sm ">{item.text}</span>
	</div>
);

export default Comment;
