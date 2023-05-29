import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import webConfig from "@/global/constants/webConfig";
import Image from "next/image";
import Link from "next/link";
import { FC, memo } from "react";
import { BsPlayCircle } from "react-icons/bs";

interface IImageOnlyCard {
	imagePathname: string;
	width: number;
	height: number;
	imageAlt: string;
	isVideo: boolean;
	title: string;
	likeCount: number;
	commentCount: number;
	detailPath: string;
	viewCount: number;
	isLiked: boolean;
	isCommented: boolean;
	handleLike?: () => void;
}

const ImageOnlyCard: FC<IImageOnlyCard> = ({
	imagePathname,
	width,
	height,
	imageAlt,
	isVideo,
	title,
	likeCount,
	commentCount,
	viewCount,
	detailPath,
	isLiked,
	isCommented,
	handleLike,
}) => {
	return (
		<Link href={detailPath}>
			<article className="items-stretch overflow-hidden shadow-md bg-k-bg-color rounded-xl  w-fit shrink-0 h-[200px]  max-w-[300px] sm:max-w-sm">
				<div className="relative w-full h-[200px] max-w-[300px] sm:max-w-sm overflow-hidden bg-slate-700 group">
					{imagePathname && (
						<Image
							src={webConfig.domain + imagePathname}
							width={width}
							height={height}
							alt={imageAlt}
							className="object-cover  w-fit transition-transform h-[200px] duration-500 max-w-[300px] sm:max-w-sm ease-out group-hover:scale-110"
						/>
					)}
					<div className="absolute top-0 left-0 w-full h-full bg-k-faded-dark-bg-color">
						<div className="relative flex items-center justify-center w-full h-full text-k-bg-color">
							{isVideo && <BsPlayCircle className="text-5xl" />}
							<div className="absolute top-2 left-4">
								<CardLikeCommentCount
									viewCount={viewCount || 0}
									likeCount={likeCount || 0}
									commentCount={commentCount || 0}
									isLiked={isLiked}
									isCommented={isCommented}
									lightColor
									handleLike={handleLike}
								/>
							</div>
							<div className="absolute right-0 bottom-2">
								<h2 className="mx-4 text-base font-medium line-clamp-1 text-k-opposite-text-color">
									{title}
								</h2>
							</div>
						</div>
					</div>
				</div>
			</article>
		</Link>
	);
};

export default memo(ImageOnlyCard);
