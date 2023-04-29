import { SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import KSwiper from "@/components/global/KSwipper/KSwiper";

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
