import { FC, memo } from "react";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { AiFillHeart } from "react-icons/ai";
import { replaceNumbersWithPersian } from "@my/helpers";

interface ICardLikeCommentCount {
	likeCount: number;
	commentCount: number;
	isLiked?: boolean;
	isCommented?: boolean;
	lightColor?: boolean;
}

const CardLikeCommentCount: FC<ICardLikeCommentCount> = ({
	likeCount,
	commentCount,
	isLiked = false,
	isCommented = false,
	lightColor = false,
}) => {
	return (
		<div
			className={`flex items-center gap-x-1 ${
				lightColor
					? "text-k-opposite-text-color"
					: "text-k-grey-text-color"
			}`}
		>
			<span className={isLiked ? "text-k-primary-color" : ""}>
				<AiFillHeart className="k-like-icon" />
			</span>
			<span className="text-sm">
				{replaceNumbersWithPersian(likeCount)}
			</span>
			<span
				className={isCommented ? "text-k-secondary-color" : ""}
			>
				<TbMessageCircle2Filled className="k-comment-icon " />
			</span>
			<span className="text-sm">
				{replaceNumbersWithPersian(commentCount)}
			</span>
		</div>
	);
};

export default memo(CardLikeCommentCount);
