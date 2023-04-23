import CardLikeCommentCount from "@/components/Card/CardLikeCommentCount";
import Image from "next/image";
import { FC } from "react";

interface IImageOnlyCard { }

const ImageOnlyCard: FC<IImageOnlyCard> = ({ }) => {
	return (
		<article className="items-stretch overflow-hidden shadow-md bg-k-bg-color rounded-xl  w-fit shrink-0 snap-start h-[200px]">
			<div className="relative overflow-hidden group">
				<img
					src="/slider.png"
					alt="sdfgsdfg"
					className="object-contain transition-transform h-[200px] duration-500 ease-out group-hover:scale-110"
				/>
				<div className="absolute top-0 left-0 w-full h-full bg-k-faded-dark-bg-color" >
					<div className="relative w-full h-full">
						<div className="absolute top-2 left-4">
							<CardLikeCommentCount
								likeCount={10}
								commentCount={21}
								isLiked={false}
								isCommented={false}
								lightColor
							/>
						</div>
						<div className="absolute right-0 bottom-2">
							<h2 className="mx-4 text-base font-medium line-clamp-1 text-k-opposite-text-color">
								مراسم پیاده روی سبنت سمنیبت سمینتسی aslfj asdjf alskdjf
								مسنیتب منسیتبم سنیبت
							</h2>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};

export default ImageOnlyCard;
