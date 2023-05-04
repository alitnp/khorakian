import KSwiper from "@/components/global/KSwipper/KSwiper";
import { FC, ReactNode, memo } from "react";
import { Autoplay, Navigation, Thumbs } from "swiper";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/thumbs";
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
				slidesPerView="auto"
				spaceBetween={20}
				wrapperClassName="pb-4"
				modules={[Autoplay, Navigation, Thumbs]}
			>
				{items.map((item, index) => (
					<SwiperSlide key={index} className="py-2  !w-fit">
						{item}
					</SwiperSlide>
				))}
			</KSwiper>
		</div>
	);
};

export default memo(CardsRow);
