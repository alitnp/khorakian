
import CardLikeCommentCount from "@/components/global/Card/CardLikeCommentCount";
import { FC, memo } from "react";

interface ITextOnlyCard {}

const TextOnlyCard: FC<ITextOnlyCard> = ({}) => {
	return (
		<article className="items-stretch overflow-hidden border shadow-md bg-k-bg-color rounded-xl w-fit shrink-0 snap-start">
			<div className="w-full sm:w-[400px] px-4 py-2">
				<span className="text-sm font-light text-k-grey-text-color">
					آلبوم
				</span>
				<h2 className="mb-2 text-base font-medium line-clamp-1">
					مراسم پیاده روی سبنت سمنیبت سمینتسی aslfj asdjf alskdjf
					مسنیتب منسیتبم سنیبت
				</h2>
				<p className="mb-2 text-sm line-clamp-4">
					ای شهر تهران شرکت کردم. من به عنوان یک فرد سیاست مدار،
					به دنبال تحقق دموکراسی، عدالت اجتماعی و پیشرفت اقتصادی
					برای کشورم هستم. من در طول فعالیت های سیاسی خود، سعی
					کرده ام که با مشارکت مردم، نظارت بر عملکرد دولت و
					پیگیری مطالبات شهروندان باشم
				</p>
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

export default memo(TextOnlyCard);
