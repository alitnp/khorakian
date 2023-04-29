import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import Image from "next/image";
import Link from "next/link";
import { FC, memo } from "react";

interface ICard {}

const WideCard: FC<ICard> = ({}) => {
	return (
		<article className="flex flex-col w-full overflow-hidden border rounded-md shadow-lg md:flex-row h-fit bg-k-bg-color">
			<div className="relative w-full aspect-video md:aspect-auto  md:w-[355.55px] md:h-[200px] shrink-0">
				<Image
					src="/image.png"
					width={355.55}
					height={200}
					alt="sdfgsdfg "
					className="shrink-0 w-full aspect-video md:aspect-auto md:w-[355.55px] md:h-[200px] object-cover"
				/>
			</div>
			<div className="px-4 py-2 h-[200px] flex flex-col">
				<span className="text-sm font-light text-k-grey-text-color">
					آلبوم
				</span>
				<h2 className="mb-2 text-base font-medium line-clamp-1">
					مراسم پیاده روی اربعین
				</h2>
				<p className="mb-2 text-sm line-clamp-3">
					ای شهر تهران شرکت کردم. من به عنوان یک فرد سیاست مدار،
					به دنبال تحقق دموکراسی، عدالت اجتماعی و پیشرفت اقتصادی
					برای کشورم هستم. من در طول فعالیت های سیاسی خود، سعی
					کرده ام که با مشارکت مردم، نظارت بر عملکرد دولت و
					پیگیری مطالبات شهروندان باشم
				</p>
				<div className="flex justify-end ">
					<Link
						href={"/"}
						className="text-sm cursor-pointer text-k-primary-color"
					>
						ادامه مطلب
					</Link>
				</div>
				<div className="flex justify-between pt-2 mt-auto border-t">
					<span className="text-sm text-k-grey-text-color">
						۱۶ مهر ۱۴۰۰
					</span>
					<CardLikeCommentCount
						commentCount={3}
						likeCount={12}
					/>
				</div>
			</div>
		</article>
	);
};

export default memo(WideCard);
