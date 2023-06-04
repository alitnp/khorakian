import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import webConfig from "@/global/constants/webConfig";
import Image from "next/image";
import Link from "next/link";
import { FC, memo } from "react";
import { BsPlayCircle } from "react-icons/bs";

interface ICard {
	category: string;
	imagePathname: string;
	width: number;
	height: number;
	imageAlt: string;
	isVideo: boolean;
	title: string;
	creationDate: string;
	likeCount: number;
	commentCount: number;
	detailPath: string;
	viewCount: number;
	isLiked: boolean;
	isCommented: boolean;
	handleLike?: () => void;
}

const Card: FC<ICard> = ({
	category,
	imagePathname,
	width,
	height,
	imageAlt,
	isVideo,
	title,
	creationDate,
	likeCount,
	commentCount,
	viewCount,
	detailPath,
	isLiked,
	isCommented,
	handleLike,
}) => {
	return (
		<article className="items-stretch overflow-hidden border shadow-md bg-k-bg-color rounded-xl w-fit shrink-0 ">
			<Link href={detailPath}>
				<div className="relative overflow-hidden w-full aspect-video md:aspect-auto group md:w-[355.55px] md:h-[200px]">
					{imagePathname && (
						<Image
							src={webConfig.domain + imagePathname}
							alt={imageAlt}
							width={width}
							height={height}
							className="object-cover w-full aspect-video md:aspect-auto md:w-[355.55px] md:h-[200px] transition-transform duration-500 ease-out group-hover:scale-110"
						/>
					)}
					{isVideo && (
						<div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-k-bg-color bg-slate-800/40">
							<BsPlayCircle className="text-5xl" />
						</div>
					)}
				</div>
			</Link>
			<div className="px-4 py-2 md:w-[355.55px]">
				<span className="text-sm font-light text-k-grey-text-color">
					{category}
				</span>
				<Link href={detailPath}>
					<h2 className="text-base font-medium leading-6 h-7 line-clamp-1">
						{title}
					</h2>
				</Link>
				<div className="flex items-center justify-between pt-2 mt-4 border-t">
					<span className="text-sm text-k-grey-text-color">
						{creationDate}
					</span>
					<CardLikeCommentCount
						viewCount={viewCount || 0}
						likeCount={likeCount || 0}
						commentCount={commentCount || 0}
						isLiked={isLiked}
						isCommented={isCommented}
						handleLike={handleLike}
						detailPath={detailPath}
					/>
				</div>
			</div>
		</article>
	);
};

export default memo(Card);
