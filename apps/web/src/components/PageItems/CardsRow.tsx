"use client";

import KSwiper from "@/components/KSwipper/KSwiper";
import { FC, ReactNode, memo } from "react";
import { SwiperSlide } from "swiper/react";

interface ICardsRow {
	greyBg?: boolean;
	items: ReactNode[];
	title: ReactNode;
}

const CardsRow: FC<ICardsRow> = ({
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
				wrapperClassName="pb-4"
				breakpoints={{ 768: { slidesPerView: "auto" } }}
			>
				{items.map((item, index) => (
					<SwiperSlide key={index} className="py-2 w-fit">
						{item}
					</SwiperSlide>
				))}
			</KSwiper>
		</div>
	);
};

export default memo(CardsRow);
