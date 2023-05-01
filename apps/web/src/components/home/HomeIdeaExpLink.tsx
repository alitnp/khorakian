import MyButton from "@/components/basicUi/MyButton";
import { FC } from "react";
import { BiArrowBack } from "react-icons/bi";

interface IHomeIdeaExpLink {}

const HomeIdeaExpLink: FC<IHomeIdeaExpLink> = ({}) => {
	return (
		<div className="flex flex-col md:flex-row">
			<div className="flex items-center justify-center w-full md:w-1/2 bg-slate-700 ">
				<div className="mx-5 my-14 text-k-bg-color">
					<div className="w-40 py-4 mb-6 rounded-lg bg-k-primary-color">
						<h3 className="relative text-3xl font-bold whitespace-nowrap right-[15%]  sm:right-1/4">
							تجربیات دیگران
						</h3>
					</div>
					<p className="max-w-lg">
						آنچه تا امروز در فضای فرهنگی انقلاب اسلامی رقم خورده،
						مرهون تلاش مدیران و فعالان این عرصه بوده است که هر
						کدام به سهم خود سعی کرده‌اند نقش‌آفرینی کنند. متاسفانه
						این تجربیات به طور متمرکز در جایی ثبت نشده و این قسمت
						از سایت برای ثبت این تجارب طراحی شده است. اگر خودتان
						کار و پروژه‌ای انجام داده‌اید یا از طرحی اطلاع دقیق
						دارید، حتما در این بخش ثبت کنید یا برای فعالیت‌های ثبت
						شده دیگران، نظر و نقدی بنویسید.
					</p>
					<hr className="w-full my-6 border-k-bg-color" />
					<div className="flex justify-end">
						<MyButton
							type="primary"
							shape="round"
							className="!w-fit !px-10"
						>
							نمایش همه
						</MyButton>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-center w-full md:w-1/2 bg-zinc-700">
				<div className="flex flex-col items-center gap-4 mx-5 my-16 text-k-bg-color ">
					<h3 className="text-3xl font-medium whitespace-nowrap">
						ایده ها و نظر ها
					</h3>
					<p className="max-w-sm text-center">
						ایده یا پیشنهاد برای پیشرفت در زمینه فرهنگ و ارشاد
						کشور دارید، امیر خوراکیان، مشتاق شنیدن افکار نو
					</p>
					<MyButton
						type="primary"
						shape="round"
						className="flex items-center justify-center gap-x-2 !w-fit !px-10"
					>
						<span>ثبت ایده</span>
						<BiArrowBack />
					</MyButton>
					<div className="p-4 rounded-lg  bg-k-bg-color text-k-text-color">
						<div className="inline-flex gap-6 ">
							<p className="w-[20ch] line-clamp-3 text-xs">
								ایجاد سامانه دایره المعارف شهدای دفاع مقدس
							</p>
							<div className="rounded-full w-14 h-14 bg-slate-800"></div>
						</div>
						<div className="inline-flex gap-6">
							<p className="w-[20ch] line-clamp-3 text-xs">
								ایجاد سامانه دایره المعارف شهدای دفاع مقدس
							</p>
							<div className="rounded-full w-14 h-14 bg-slate-800"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeIdeaExpLink;
