"use client";

import { FC, useEffect } from "react";
import Swiper from "swiper";
import { useSwiper } from "swiper/react";

interface ISwiperInstance {
	setSwiperInstance?: (_swiper: Swiper) => void;
	activeIndex?: number;
}

const SwiperInstance: FC<ISwiperInstance> = ({
	setSwiperInstance,
	activeIndex,
}) => {
	//hooks
	const swiper = useSwiper();

	//effect
	useEffect(() => {
		swiper && setSwiperInstance && setSwiperInstance(swiper);
	}, [swiper]);
	useEffect(() => {
		if (
			swiper?.slideTo !== undefined &&
			activeIndex !== undefined
		) {
			swiper?.slideTo(activeIndex, 0.5);
		}
	}, [activeIndex, swiper]);

	return null;
};

export default SwiperInstance;
