"use client";

import IndicatorDots from "./indicator-dots";
import SliderButtons from "./slider-bottons";
import SliderHistory from "@/components/Slider/SliderHistory";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import '@/assets/style/emblaStyles.css';
import { useMemo } from "react";

const slides = [
	{
		title: "امیر خوراکیان",
		subTitle: "سخنگو مرکز ملی فضای مجازی",
		description:
			"فارغ التحصیل رشته روابط بین الملل از دانشگاه تهران. از سال ۱۳۹۶ عضو حزب اعتماد ملی هستم و در انتخابات شورای شهر تهران شرکت کردم. من به عنوان یک فرد سیاست مدار، به دنبال تحقق دموکراسی، عدالت اجتماعی و پیشرفت اقتصادی برای کشورم هستم. من در طول فعالیت های سیاسی خود، سعی کرده ام که با مشارکت مردم، نظارت بر عملکرد دولت و پیگیری مطالبات شهروندان باشم. من در حوزه های مختلف سیاسی، از جمله روابط خارج",
	},
	{
		title: "امیر خوراکیان",
		subTitle: "سخنگو مرکز ملی فضای مجازی",
		description:
			"فارغ التحصیل رشته روابط بین الملل از دانشگاه تهران. از سال ۱۳۹۶ عضو حزب اعتماد ملی هستم و در انتخابات شورای شهر تهران شرکت کردم. من به عنوان یک فرد سیاست مدار، به دنبال تحقق دموکراسی، عدالت اجتماعی و پیشرفت اقتصادی برای کشورم هستم. من در طول فعالیت های سیاسی خود، سعی کرده ام که با مشارکت مردم، نظارت بر عملکرد دولت و پیگیری مطالبات شهروندان باشم. من در حوزه های مختلف سیاسی، از جمله روابط خارج",
	},
	{
		title: "امیر خوراکیان",
		subTitle: "سخنگو مرکز ملی فضای مجازی",
		description:
			"فارغ التحصیل رشته روابط بین الملل از دانشگاه تهران. از سال ۱۳۹۶ عضو حزب اعتماد ملی هستم و در انتخابات شورای شهر تهران شرکت کردم. من به عنوان یک فرد سیاست مدار، به دنبال تحقق دموکراسی، عدالت اجتماعی و پیشرفت اقتصادی برای کشورم هستم. من در طول فعالیت های سیاسی خود، سعی کرده ام که با مشارکت مردم، نظارت بر عملکرد دولت و پیگیری مطالبات شهروندان باشم. من در حوزه های مختلف سیاسی، از جمله روابط خارج",
	},
];

const Slider = () => {
	const sliderOptions = useMemo(() => ({ loop: true, speed: 20, dragFree: false }), []);
	const autoplayOptions = useMemo(() => ({ delay: 4000, rootNode: (emblaRoot) => emblaRoot.parentElement }), []);

	const [emblaRef] = useEmblaCarousel(sliderOptions, [Autoplay(autoplayOptions)]);

	return (<div className="relative">
		<div className="embla">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{slides.map((item, index) => (
						<div className=" embla__slide h-96" key={index}>
							<div
								className="relative flex items-center justify-center w-full h-full bg-slate-700/80"
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
						</div>
					))}
				</div>
			</div>
		</div>
		<SliderHistory />
	</div>
	);
};

export default Slider;
