import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ICard {}

const WideCard: FC<ICard> = ({}) => {
	return (
		<article className="flex w-full overflow-hidden rounded-md shadow-md">
			<Image
				src="/image.png"
				width={225}
				height={150}
				alt="sdfgsdfg "
				className="shrink-0 w-[225px] h-[150px] object-cover"
			/>
			<div>
				<span className="text-sm font-light text-k-grey-text-color">
					آلبوم
				</span>
				<h2 className="text-base font-medium">
					مراسم پیاده روی اربعین
				</h2>
				<p className="line-clamp-2">
					ای شهر تهران شرکت کردم. من به عنوان یک فرد سیاست مدار،
					به دنبال تحقق دموکراسی، عدالت اجتماعی و پیشرفت اقتصادی
					برای کشورم هستم. من در طول فعالیت های سیاسی خود، سعی
					کرده ام که با مشارکت مردم، نظارت بر عملکرد دولت و
					پیگیری مطالبات شهروندان باشم
				</p>
				<div className="flex justify-end ">
					<Link
						href={"/"}
						className="cursor-pointer text-k-primary-color"
					>
						ادامه مطلب
					</Link>
				</div>
			</div>
		</article>
	);
};

export default WideCard;
