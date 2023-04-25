"use client";

import { FC, useEffect } from "react";
import Swiper from "swiper";
import { useSwiper } from "swiper/react";

interface ISwiperInstance {
	setSwiperInstance: (_swiper: Swiper) => void;
}

const SwiperInstance: FC<ISwiperInstance> = ({
	setSwiperInstance,
}) => {
	//hooks
	const swiper = useSwiper();

	//effect
	useEffect(() => {
		swiper && setSwiperInstance(swiper);
	}, [swiper]);

	return null;
};

export default SwiperInstance;
