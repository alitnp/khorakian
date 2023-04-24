"use client";

import "@/assets/style/emblaStyles.css";
import "swiper/css/pagination";
import KSwiper from "@/components/KSwipper/KSwiper";
import { Pagination } from "swiper";
import { FC, ReactNode, memo } from "react";
import { SwiperSlide } from "swiper/react";

interface IWideCardsRow {
	greyBg?: boolean;
	items: ReactNode[];
	title: ReactNode;
}

const WideCardsRow: FC<IWideCardsRow> = ({
	greyBg = false,
	title,
	items,
}) => {
	return (
		<div
			className={`py-14 k-container ${
				greyBg && "bg-k-grey-bg-1-color"
			}`}
		>
			{title}
			<KSwiper
				slidesPerView={1.2}
				spaceBetween={40}
				modules={[Pagination]}
				pagination={{
					clickable: true,
				}}
				wrapperClassName="pt-2 pb-6"
				breakpoints={{ 1500: { slidesPerView: 2 } }}
			>
				{items.map((item, index) => (
					<SwiperSlide key={index} className="pb-10 w-fit">
						{item}
					</SwiperSlide>
				))}
			</KSwiper>
		</div>
	);
};

export default memo(WideCardsRow);
