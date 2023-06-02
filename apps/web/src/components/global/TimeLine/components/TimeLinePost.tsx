import webConfig from "@/global/constants/webConfig";
import {
	dateObjectFormatter,
	getThumbnailFromContent,
} from "@/global/utils/helperFunctions";
import { IPostRead } from "@my/types";
import { FC, useState } from "react";
import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import { BsPlayCircle } from "react-icons/bs";
import Link from "next/link";
import webRoutes from "@/global/constants/webRoutes";
import WebApiService, {
	errorResponse,
} from "@/global/utils/WebApiService";
import webEndpointUrls from "@/global/constants/webEndpointUrls";
import { webApiCatch } from "@/global/utils/webApiThen";

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
	const [, setFakeNumber] = useState(1);
	const image = getThumbnailFromContent(post);

	const handleLike = async () => {
		await WebApiService.post(
			webEndpointUrls.postLike + "/" + post._id
		)
			.then((res: any) => {
				post.liked = res.data.liked;
				post.likeCount = res.data.likeCount;
				setFakeNumber((prevState) => ++prevState);
			})
			.catch(() => webApiCatch(errorResponse));
	};

	return (
		<div
			className={`relative flex items-center h-full`}
			style={{ marginRight: down ? "50px" : "" }}
		>
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
					{dateObjectFormatter(post.eventDate, "DD MMMM YYYY")}
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
					{dateObjectFormatter(post.eventDate, "DD MMMM YYYY")}
				</span>
			)}
			<div
				key={index}
				className={`relative overflow-hidden rounded-xl  shadow-lg 
									border
										`}
			>
				<Link href={webRoutes.postDetail.path + "/" + post._id}>
					<div className="absolute bottom-0 left-0 z-20 w-full h-4/5 "></div>
				</Link>
				{webConfig.domain && image && (
					<img
						src={webConfig.domain + image.imagePathname}
						className="object-contain max-w-[250px] max-h-[200px] transition-transform duration-500 ease-out hover:scale-110"
					/>
				)}
				<div className="absolute top-0 left-0 flex items-end w-full h-full p-2 text-k-bg-color bg-slate-800/30">
					<span className="line-clamp-1">{post.title}</span>
				</div>
				{post.videos.length > 0 && (
					<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-k-bg-color">
						<BsPlayCircle className="text-4xl" />
					</div>
				)}
				<div className="absolute top-1 left-2">
					<CardLikeCommentCount
						viewCount={post.viewCount || 0}
						likeCount={post.likeCount || 0}
						commentCount={post.commentCount || 0}
						isLiked={post.liked}
						isCommented={false}
						lightColor
						handleLike={handleLike}
					/>
				</div>
			</div>
		</div>
	);
};

export default TimeLinePost;
