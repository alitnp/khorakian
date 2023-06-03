import webConfig from "@/global/constants/webConfig";
import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import { IUserRead } from "@my/types";
import Image from "next/image";
import { FC } from "react";

interface ICommentUser {
	user: IUserRead;
	creationDate: number;
}

const CommentUser: FC<ICommentUser> = ({
	user,
	creationDate,
}) => {
	return (
		<div className="flex items-center gap-2">
			{user?.image?.pathname ? (
				<Image
					src={webConfig.domain + user.image.pathname}
					alt={""}
					width={48}
					height={48}
					className="object-cover w-12 h-12 rounded-full"
				/>
			) : (
				<div className="relative flex items-center justify-center w-10 h-10 mx-1 text-center bg-teal-500 rounded-full">
					{user?.fullName?.charAt(0)}
				</div>
			)}

			<div className="">
				<span className="block sm:text-base">
					{user?.fullName}
				</span>
				<span className="block text-xs text-stone-400">
					{dateObjectFormatter(creationDate, "DD MMMM YYYY")}
				</span>
			</div>
		</div>
	);
};

export default CommentUser;
