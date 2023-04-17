import CardLikeCommentCount from "@/components/Card/CardLikeCommentCount";
import Image from "next/image";
import { FC } from "react";

interface ICard {}

const Card: FC<ICard> = ({}) => {
	return (
		<article className="items-stretch overflow-hidden rounded-md shadow-md w-fit shrink-0">
			<Image
				src="/image.png"
				width={200}
				height={200}
				alt="sdfgsdfg "
			/>
			<span className="text-sm font-light text-k-grey-text-color">
				آلبوم
			</span>
			<h2 className="text-base font-medium">
				مراسم پیاده روی اربعین
			</h2>
			<div className="flex items-center justify-between py-2 mt-4 border-t">
				<span className="text-sm text-k-grey-text-color">
					۱۶ مهر ۱۴۰۰
				</span>
				<CardLikeCommentCount
					likeCount={10}
					commentCount={21}
					isLiked={false}
					isCommented={false}
				/>
			</div>
		</article>
	);
};

export default Card;
