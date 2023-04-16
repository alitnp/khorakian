"use client";

import Carousel from "re-carousel";
import IndicatorDots from "./indicator-dots";
import SliderButtons from "./slider-bottons";
import SliderHistory from "@/components/Home/Slider/SliderHistory";

const slides = [
	{
		title: "امیر خوراکیان",
		subTitle: "سخنگو مرکز ملی فضای مجازی",
		description:
			"فارغ التحصیل رشته روابط بین الملل از دانشگاه تهران. از سال ۱۳۹۶ عضو حزب اعتماد ملی هستم و در انتخابات شورای شهر تهران شرکت کردم. من به عنوان یک فرد سیاست مدار، به دنبال تحقق دموکراسی، عدالت اجتماعی و پیشرفت اقتصادی برای کشورم هستم. من در طول فعالیت های سیاسی خود، سعی کرده ام که با مشارکت مردم، نظارت بر عملکرد دولت و پیگیری مطالبات شهروندان باشم. من در حوزه های مختلف سیاسی، از جمله روابط خارج",
	},
];

const Slider = () => {
	return (
		<div className="relative w-full h-96">
			<Carousel
				loop={false}
				auto={false}
				widgets={[IndicatorDots, SliderButtons]}
				interval={0}
				duration={300}
			>
				{slides.map((item, key) => (
					<div
						key={key}
						className="relative flex items-center justify-center w-full h-full bg-slate-700"
					>
						<div className="absolute top-0 right-0 flex flex-col items-center justify-center w-full h-full sm:w-1/2 sm:items-start">
							<h1 className="text-4xl font-bold text-k-opposite-text-color">
								{item.title}
							</h1>
							<h3 className="text-lg font-medium text-k-opposite-text-color">
								{item.subTitle}
							</h3>
							<p className=" text-k-opposite-text-color line-clamp-3">
								{item.description}
							</p>
						</div>
					</div>
				))}
			</Carousel>
			<SliderHistory />
		</div>
	);
};

export default Slider;
