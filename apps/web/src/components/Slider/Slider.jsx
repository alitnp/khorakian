"use client";

import IndicatorDots from "./indicator-dots";
import SliderButtons from "./slider-bottons";
import SliderHistory from "@/components/Slider/SliderHistory";
import "@/assets/style/emblaStyles.css";
import { useMemo } from "react";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import KSwiper from "@/components/KSwipper/KSwiper";
import { Pagination, Autoplay } from "swiper";

const slides = [
	{
		title: "امیر خوراکیان",
		subTitle: "فعال فرهنگی انقلاب اسلامی",
		shortDesc: "سخنگو مرکز ملی فضای مجازی",
		description:
			"فارغ التحصیل رشته روابط بین الملل از دانشگاه تهران. از سال ۱۳۹۶ عضو حزب اعتماد ملی هستم و در انتخابات شورای شهر تهران شرکت کردم. من به عنوان یک فرد سیاست مدار، به دنبال تحقق دموکراسی، عدالت اجتماعی و پیشرفت اقتصادی برای کشورم هستم. من در طول فعالیت های سیاسی خود، سعی کرده ام که با مشارکت مردم، نظارت بر عملکرد دولت و پیگیری مطالبات شهروندان باشم. من در حوزه های مختلف سیاسی، از جمله روابط خارج",
	},
	{
		title: "امیر خوراکیان",
		subTitle: "فعال فرهنگی انقلاب اسلامی",
		shortDesc: "سخنگو مرکز ملی فضای مجازی",
		description:
			"فارغ التحصیل رشته روابط بین الملل از دانشگاه تهران. از سال ۱۳۹۶ عضو حزب اعتماد ملی هستم و در انتخابات شورای شهر تهران شرکت کردم. من به عنوان یک فرد سیاست مدار، به دنبال تحقق دموکراسی، عدالت اجتماعی و پیشرفت اقتصادی برای کشورم هستم. من در طول فعالیت های سیاسی خود، سعی کرده ام که با مشارکت مردم، نظارت بر عملکرد دولت و پیگیری مطالبات شهروندان باشم. من در حوزه های مختلف سیاسی، از جمله روابط خارج",
	},
	{
		title: "امیر خوراکیان",
		subTitle: "فعال فرهنگی انقلاب اسلامی",
		shortDesc: "سخنگو مرکز ملی فضای مجازی",
		description:
			"فارغ التحصیل رشته روابط بین الملل از دانشگاه تهران. از سال ۱۳۹۶ عضو حزب اعتماد ملی هستم و در انتخابات شورای شهر تهران شرکت کردم. من به عنوان یک فرد سیاست مدار، به دنبال تحقق دموکراسی، عدالت اجتماعی و پیشرفت اقتصادی برای کشورم هستم. من در طول فعالیت های سیاسی خود، سعی کرده ام که با مشارکت مردم، نظارت بر عملکرد دولت و پیگیری مطالبات شهروندان باشم. من در حوزه های مختلف سیاسی، از جمله روابط خارج",
	},
];

const Slider = () => {
	return (
		<div className="relative">
			<KSwiper
				modules={[
					Pagination,
					// Autoplay
				]}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				slidesPerView={1}
				loop
			>
				{slides.map((item, index) => (
					<SwiperSlide>
						<div className="h-[768px] max-h-[100vh]" key={index}>
							<div className="relative flex items-center justify-center w-full h-full">
								<Image
									src="/slider.png"
									alt="Asdf"
									fill
									className="object-cover object-center"
								/>
								<div className="absolute top-0 right-0 flex flex-col items-center justify-center w-full h-full gap-2 k-container sm:items-start bg-k-faded-dark-bg-color sm:bg-transparent sm:bg-gradient-to-l from-k-dark-bg-color via-15% via-k-dark-bg-color to-50% to-black/0">
									{item.title && (
										<h1 className="text-5xl font-bold text-k-opposite-text-color">
											{item.title}
										</h1>
									)}
									{item.subTitle && (
										<h3 className="text-xl font-medium text-k-opposite-text-color">
											{item.subTitle}
										</h3>
									)}
									{item.shortDesc && (
										<h3 className="text-lg font-medium text-k-opposite-text-color">
											{item.shortDesc}
										</h3>
									)}
									<p className="max-w-xl mt-4 text-justify sm:text-right text-k-opposite-text-color">
										{item.description}
									</p>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</KSwiper>
			<SliderHistory />
		</div>
	);
};

export default Slider;
