"use client";

import IndicatorDots from "./indicator-dots";
import SliderButtons from "./slider-bottons";
import SliderHistory from "@/components/Slider/SliderHistory";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "@/assets/style/emblaStyles.css";
import { useMemo } from "react";
import Image from "next/image";

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
	const sliderOptions = useMemo(
		() => ({ loop: true, speed: 20, dragFree: false }),
		[]
	);
	const autoplayOptions = useMemo(
		() => ({
			delay: 10000,
			rootNode: (emblaRoot) => emblaRoot.parentElement,
		}),
		[]
	);

	const [emblaRef] = useEmblaCarousel(sliderOptions, [
		Autoplay(autoplayOptions),
	]);

	return (
		<div className="relative">
			<div className="embla">
				<div className="embla__viewport" ref={emblaRef}>
					<div className="embla__container">
						{slides.map((item, index) => (
							<div className=" embla__slide h-[768px]" key={index}><div className="relative flex items-center justify-center w-full h-full">
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
						))}
					</div>
				</div>
			</div>
			<SliderHistory />
		</div>
	);
};

export default Slider;
