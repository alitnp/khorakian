"use client";

import "@/assets/style/emblaStyles.css";
import { SwiperSlide } from "swiper/react";
import KSwiper from "@/components/KSwipper/KSwiper";
import { Pagination } from "swiper";

const Slider = ({ items, history }) => {
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
				{items.map((item, key) => (
					<SwiperSlide key={key}>{item}</SwiperSlide>
				))}
			</KSwiper>
			{/* <SliderHistory /> */}
			{history}
		</div>
	);
};

export default Slider;
