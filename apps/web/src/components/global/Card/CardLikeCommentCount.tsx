import { FC, memo } from "react";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { AiFillHeart } from "react-icons/ai";
import { HiEye } from "react-icons/hi";
import { replaceNumbersWithPersian } from "@my/helpers";

interface ICardLikeCommentCount {
	likeCount: number;
	commentCount: number;
	viewCount: number;
	isLiked?: boolean;
	isCommented?: boolean;
	lightColor?: boolean;
	withText?: boolean;
}

const CardLikeCommentCount: FC<ICardLikeCommentCount> = ({
	likeCount,
	commentCount,
	viewCount,
	isLiked = false,
	isCommented = false,
	lightColor = false,
	withText = false,
}) => {
	return (
		<div
			className={`flex items-center gap-x-2 select-none  ${
				lightColor
					? "text-k-opposite-text-color"
					: "text-k-grey-text-color"
			}`}
		>
			<div
				className={`flex items-center gap-1  ${
					withText && "border-l border-k-grey-text-color pl-2"
				}`}
			>
				<span>
					<HiEye />
				</span>
				{withText && (
					<span className="font-medium">بازدید</span>
				)}
				<span className="text-sm">
					{replaceNumbersWithPersian(viewCount)}
				</span>
			</div>
			<div
				className={`flex items-center gap-1 ${
					withText && "border-l border-k-grey-text-color pl-2"
				}`}
			>
				<div className="flex items-center gap-1 k-like-icon group">
					<span
						className={isLiked ? "text-k-primary-color" : ""}
					>
						<AiFillHeart />
					</span>
					{withText && (
						<span className="!drop-shadow-none !filter-none group-hover:text-k-primary-color">
							پسند
						</span>
					)}
				</div>
				<span className="text-sm">
					{replaceNumbersWithPersian(likeCount)}
				</span>
			</div>
			<div className={`flex items-center gap-1`}>
				<div className="flex items-center gap-1 group k-comment-icon">
					<span
						className={
							isCommented ? "text-k-secondary-color" : ""
						}
					>
						<TbMessageCircle2Filled className="" />
					</span>
					{withText && (
						<span className="!drop-shadow-none !filter-none group-hover:text-k-secondary-color">
							نظر
						</span>
					)}
				</div>
				<span className="text-sm">
					{replaceNumbersWithPersian(commentCount)}
				</span>
			</div>
		</div>
	);
};

export default memo(CardLikeCommentCount);
