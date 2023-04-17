import { FC } from "react";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { AiFillHeart } from "react-icons/ai";
import { replaceNumbersWithPersian } from "@my/helpers";

interface ICardLikeCommentCount {
	likeCount: number;
	commentCount: number;
	isLiked: boolean;
	isCommented: boolean;
}

const CardLikeCommentCount: FC<ICardLikeCommentCount> = ({
	likeCount,
	commentCount,
	isLiked,
	isCommented,
}) => {
	return (
		<div className="flex items-center text-k-grey-text-color gap-x-1">
			<span className={isLiked ? "text-k-primary-color" : ""}>
				<AiFillHeart />
			</span>
			<span className="text-sm">
				{replaceNumbersWithPersian(likeCount)}
			</span>
			<span
				className={isCommented ? "text-k-secondary-color" : ""}
			>
				<TbMessageCircle2Filled />
			</span>
			<span className="text-sm">
				{replaceNumbersWithPersian(commentCount)}
			</span>
		</div>
	);
};

export default CardLikeCommentCount;
