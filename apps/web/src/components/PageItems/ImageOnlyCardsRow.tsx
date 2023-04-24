"use client";

import "@/assets/style/emblaStyles.css";
import KSwiper from "@/components/KSwipper/KSwiper";
import { FC, ReactNode, memo } from "react";
import { SwiperSlide } from "swiper/react";

interface IImageOnlyCardsRow {
	greyBg?: boolean;
	items: ReactNode[];
	title: ReactNode;
}

const ImageOnlyCardsRow: FC<IImageOnlyCardsRow> = ({
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
				slidesPerView={"auto"}
				spaceBetween={40}
				wrapperClassName="pb-4"
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

export default memo(ImageOnlyCardsRow);
