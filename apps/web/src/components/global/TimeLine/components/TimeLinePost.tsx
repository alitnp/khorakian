import webConfig from "@/global/constants/webConfig";
import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import { IPostRead } from "@my/types";
import { FC } from "react";

interface ITimeListPost {
	index: number;
	post: IPostRead;
	down?: boolean;
}

const TimeLinePost: FC<ITimeListPost> = ({
	index,
	post,
	down = false,
}) => {
	return (
		<div className={`relative flex items-center h-full`}>
			<div
				className={`absolute ${
					down ? "top-0" : "bottom-0"
				} w-full h-1/2`}
			>
				<div className="relative w-1/2 h-full border-l border-dashed border-k-text-color">
					<div
						className={`absolute w-2 h-2 rounded-full ${
							down ? "-top-1" : "-bottom-1"
						} -left-1 bg-k-text-color`}
					/>
				</div>
			</div>
			{down && index % 3 === 0 && (
				<span
					className={`absolute ${
						down
							? "pb-1 -top-0 -translate-y-full"
							: "pt-1 -bottom-0 translate-y-full"
					} text-xs translate-x-1/2   right-1/2 text-k-grey-text-color whitespace-nowrap`}
				>
					{dateObjectFormatter(post.eventDate)}
				</span>
			)}
			{!down && index % 4 === 0 && index % 3 !== 0 && (
				<span
					className={`absolute ${
						down
							? "pb-1 -top-0 -translate-y-full"
							: "pt-1 -bottom-0 translate-y-full"
					} text-xs translate-x-1/2   right-1/2 text-k-grey-text-color whitespace-nowrap`}
				>
					{dateObjectFormatter(post.eventDate)}
				</span>
			)}
			<div
				key={index}
				className={`relative overflow-hidden rounded-xl  shadow-lg 
									border
										`}
			>
				{webConfig.domain && post.images[0]?.pathname && (
					<img
						src={webConfig.domain + post.images[0].pathname}
						className="object-contain max-w-[256px] max-h-[200px] transition-transform duration-500 ease-out hover:scale-110"
					/>
				)}
			</div>
		</div>
	);
};

export default TimeLinePost;
