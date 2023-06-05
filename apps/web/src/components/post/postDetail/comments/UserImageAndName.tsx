import webConfig from "@/global/constants/webConfig";
import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import { IUserRead } from "@my/types";
import Image from "next/image";
import { FC } from "react";

interface ICommentUser {
	user: IUserRead;
	creationDate?: number;
	size?: "small" | "normal";
}

const UserImageAndName: FC<ICommentUser> = ({
	user,
	creationDate,
	size = "normal",
}) => {
	return (
		<div
			className={`flex items-center gap-2 ${
				size === "small"
					? "h-fit py-1 px-2 bg-k-grey-bg-1-color rounded-lg"
					: ""
			}`}
		>
			{user?.image?.pathname ? (
				<Image
					src={webConfig.domain + user.image.pathname}
					alt={""}
					width={size === "small" ? 24 : 48}
					height={size === "small" ? 24 : 48}
					className={`object-cover  rounded-full ${
						size === "small" ? "w-6 h-6" : "w-12 h-12"
					}`}
				/>
			) : (
				<div
					className={`relative flex items-center justify-center   text-center bg-teal-500 rounded-full ${
						size === "small"
							? "text-xs w-6 h-6"
							: "w-10 h-10 mx-1"
					}`}
				>
					{user?.fullName?.charAt(0)}
				</div>
			)}

			<div className="">
				<span
					className={`block ${
						size === "small" ? "text-sm" : "sm:text-base"
					}`}
				>
					{user?.fullName}
				</span>
				{creationDate && (
					<span className="block text-xs text-k-grey-text-color">
						{dateObjectFormatter(creationDate, "DD MMMM YYYY")}
					</span>
				)}
			</div>
		</div>
	);
};

export default UserImageAndName;
