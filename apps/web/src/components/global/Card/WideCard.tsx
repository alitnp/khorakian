import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import webConfig from "@/global/constants/webConfig";
import Image from "next/image";
import Link from "next/link";
import { FC, memo } from "react";
import { BsPlayCircle } from "react-icons/bs";

interface IWideCard {
	category: string;
	imagePathname: string;
	width: number;
	height: number;
	imageAlt: string;
	isVideo: boolean;
	title: string;
	desc: string;
	creationDate: string;
	likeCount: number;
	commentCount: number;
	detailPath: string;
	viewCount: number;
	isLiked: boolean;
	isCommented: boolean;
}

const WideCard: FC<IWideCard> = ({
	category,
	imagePathname,
	width,
	height,
	imageAlt,
	isVideo,
	title,
	desc,
	creationDate,
	likeCount,
	commentCount,
	viewCount,
	detailPath,
	isLiked,
	isCommented,
}) => {
	return (
		<article className="flex flex-col w-full overflow-hidden border rounded-md shadow-lg md:flex-row h-fit bg-k-bg-color">
			<Link href={detailPath}>
				<div className="relative w-full aspect-video md:aspect-auto  md:w-[355.55px] md:h-[200px] shrink-0 group overflow-hidden">
					{imagePathname && (
						<Image
							src={webConfig.domain + imagePathname}
							width={width}
							height={height}
							alt={imageAlt}
							className="shrink-0 w-full aspect-video md:aspect-auto md:w-[355.55px] md:h-[200px] object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
						/>
					)}
					{isVideo && (
						<div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-k-bg-color bg-slate-800/40">
							<BsPlayCircle className="text-5xl" />
						</div>
					)}
				</div>
			</Link>
			<div className="px-4 py-2 h-[200px] flex flex-col w-full">
				<span className="text-sm font-light text-k-grey-text-color">
					{category}
				</span>
				<Link href={detailPath}>
					<h2 className="mb-2 text-base font-medium line-clamp-1">
						{title}
					</h2>
				</Link>
				<p className="mb-2 text-sm line-clamp-3">{desc}</p>
				<div className="flex justify-end ">
					<Link
						href={detailPath}
						className="text-sm cursor-pointer text-k-primary-color"
					>
						ادامه مطلب
					</Link>
				</div>
				<div className="flex justify-between pt-2 mt-auto border-t">
					<span className="text-sm text-k-grey-text-color">
						{creationDate}
					</span>
					<CardLikeCommentCount
						viewCount={viewCount || 0}
						likeCount={likeCount || 0}
						commentCount={commentCount || 0}
						isLiked={isLiked}
						isCommented={isCommented}
					/>
				</div>
			</div>
		</article>
	);
};

export default memo(WideCard);
