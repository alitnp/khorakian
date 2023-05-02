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
}

const CardLikeCommentCount: FC<ICardLikeCommentCount> = ({
	likeCount,
	commentCount,
	viewCount,
	isLiked = false,
	isCommented = false,
	lightColor = false,
}) => {
	return (
		<div
			className={`flex items-center gap-x-2 ${
				lightColor
					? "text-k-opposite-text-color"
					: "text-k-grey-text-color"
			}`}
		>
			<div className="flex items-center gap-1">
				<span>
					<HiEye />
				</span>
				<span className="text-sm">
					{replaceNumbersWithPersian(viewCount)}
				</span>
			</div>
			<div className="flex items-center gap-1">
				<span className={isLiked ? "text-k-primary-color" : ""}>
					<AiFillHeart className="k-like-icon" />
				</span>
				<span className="text-sm">
					{replaceNumbersWithPersian(likeCount)}
				</span>
			</div>
			<div className="flex items-center gap-1">
				<span
					className={isCommented ? "text-k-secondary-color" : ""}
				>
					<TbMessageCircle2Filled className="k-comment-icon " />
				</span>
				<span className="text-sm">
					{replaceNumbersWithPersian(commentCount)}
				</span>
			</div>
		</div>
	);
};

export default memo(CardLikeCommentCount);
