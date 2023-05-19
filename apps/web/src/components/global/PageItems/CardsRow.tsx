import KSwiper from "@/components/global/KSwipper/KSwiper";
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
			className={`py-24 k-container relative ${
				greyBg && "bg-k-grey-bg-1-color"
			}`}
		>
			{title}

			<KSwiper
				slidesPerView={1.2}
				breakpoints={{ 768: { slidesPerView: "auto" } }}
				wrapperClassName="pb-4"
				spaceBetween={48}
			>
				{items.map((item, index) => (
					<SwiperSlide key={index} className="py-2 md:!w-fit">
						{item}
					</SwiperSlide>
				))}
			</KSwiper>
		</div>
	);
};

export default memo(CardsRow);
