import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import Link from "next/link";
import { FC, memo } from "react";

interface ITextOnlyCard {
	category: string;
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

const TextOnlyCard: FC<ITextOnlyCard> = ({
	category,
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
		<article className="items-stretch w-full overflow-hidden border shadow-md bg-k-bg-color rounded-xl md:max-w-lg shrink-0 ">
			<div className="w-full px-4 py-2">
				<span className="text-sm font-light text-k-grey-text-color">
					{category}
				</span>
				<Link href={detailPath}>
					<h2 className="mb-2 text-base font-medium line-clamp-1 hover:text-k-primary-color">
						{title}
					</h2>
				</Link>
				<p className="mb-2 text-sm line-clamp-4">{desc}</p>
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
					/>
				</div>
			</div>
		</article>
	);
};

export default memo(TextOnlyCard);
