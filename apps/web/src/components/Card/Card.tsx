import CardLikeCommentCount from "@/components/Card/CardLikeCommentCount";
import Image from "next/image";
import { FC } from "react";

interface ICard {}

const Card: FC<ICard> = ({}) => {
	return (
		<article className="items-stretch overflow-hidden shadow-md rounded-xl w-fit shrink-0 snap-start">
			<div className="relative w-[300px] h-[300px] overflow-hidden">
				<Image
					src="/slider.png"
					alt="sdfgsdfg"
					width={300}
					height={300}
					className="object-cover w-[300px] h-[300px] hover:scale-110 transition-transform duration-500 ease-out"
				/>
			</div>
			<div className="w-[300px] px-4 py-2">
				<span className="text-sm font-light text-k-grey-text-color">
					آلبوم
				</span>
				<h2 className="h-12 text-base font-medium leading-6 line-clamp-2">
					مراسم پیاده روی سبنت سمنیبت سمینتسی aslfj asdjf alskdjf
					مسنیتب منسیتبم سنیبت
				</h2>
				<div className="flex items-center justify-between pt-2 mt-4 border-t">
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
			</div>
		</article>
	);
};

export default Card;
