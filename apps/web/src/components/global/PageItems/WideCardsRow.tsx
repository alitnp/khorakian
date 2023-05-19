import "swiper/css/pagination";
import { Pagination } from "swiper";
import { FC, ReactNode, memo } from "react";
import { SwiperSlide } from "swiper/react";
import KSwiper from "@/components/global/KSwipper/KSwiper";

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
			className={`py-24 k-container ${
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
