import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import webConfig from "@/global/constants/webConfig";
import { IImage } from "@my/types";
import Image from "next/image";
import Link from "next/link";
import { FC, memo } from "react";

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
	// viewCount: number;
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
	detailPath,
}) => {
	return (
		<article className="items-stretch overflow-hidden border shadow-md bg-k-bg-color rounded-xl w-fit shrink-0 snap-start">
			<div className="relative overflow-hidden w-full aspect-video md:aspect-auto  md:w-[355.55px] md:h-[200px]">
				{imagePathname && (
					<Image
						src={webConfig.domain + imagePathname}
						alt={imageAlt}
						width={width}
						height={height}
						className="object-cover w-full aspect-video md:aspect-auto md:w-[355.55px] md:h-[200px] transition-transform duration-500 ease-out hover:scale-110"
					/>
				)}
			</div>
			<div className="px-4 py-2 md:w-[355.55px]">
				<span className="text-sm font-light text-k-grey-text-color">
					{category}
				</span>
				<h2 className="h-12 text-base font-medium leading-6 line-clamp-2">
					{title}
				</h2>
				<div className="flex items-center justify-between pt-2 mt-4 border-t">
					<span className="text-sm text-k-grey-text-color">
						{creationDate}
					</span>
					<CardLikeCommentCount
						likeCount={likeCount}
						commentCount={commentCount}
						isLiked={false}
						isCommented={false}
					/>
				</div>
			</div>
		</article>
	);
};

export default memo(Card);
