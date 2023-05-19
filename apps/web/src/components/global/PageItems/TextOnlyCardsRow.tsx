import KSwiper from "@/components/global/KSwipper/KSwiper";
import { FC, ReactNode, memo } from "react";
import { SwiperSlide } from "swiper/react";

interface ITextOnlyCardsRow {
	greyBg?: boolean;
	items: ReactNode[];
	title: ReactNode;
}

const TextOnlyCardsRow: FC<ITextOnlyCardsRow> = ({
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
				slidesPerView={"auto"}
				spaceBetween={40}
				wrapperClassName="pb-4"
			>
				{items.map((item, index) => (
					<SwiperSlide key={index} className="py-2 !w-fit">
						{item}
					</SwiperSlide>
				))}
			</KSwiper>
		</div>
	);
};

export default memo(TextOnlyCardsRow);
