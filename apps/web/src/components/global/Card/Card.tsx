import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import Image from "next/image";
import { FC, memo } from "react";

interface ICard {}

const Card: FC<ICard> = ({}) => {
	return (
		<article className="items-stretch overflow-hidden border shadow-md bg-k-bg-color rounded-xl w-fit shrink-0 snap-start">
			<div className="relative overflow-hidden w-full aspect-video md:aspect-auto  md:w-[355.55px] md:h-[200px]">
				<Image
					src="/slider.png"
					alt="sdfgsdfg"
					width={355.55}
					height={200}
					className="object-cover w-full aspect-video md:aspect-auto md:w-[355.55px] md:h-[200px] transition-transform duration-500 ease-out hover:scale-110"
				/>
			</div>
			<div className="px-4 py-2 md:w-[355.55px]">
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

export default memo(Card);
