"use client";

import "@/assets/style/emblaStyles.css";
import "swiper/css/pagination";
import WideCard from "@/components/Card/WideCard";
import KSwiper from "@/components/KSwipper/KSwiper";
import { Pagination } from "swiper";
import { SwiperSlide } from "swiper/react";
import { FC } from "react";
import PageItemTitle from "@/components/PageItems/PageItemTitle";

interface IWideCardsRow {
	greyBg?: boolean;
}

const WideCardsRow: FC<IWideCardsRow> = ({ greyBg = false }) => {
	return (
		<div className={`py-14 k-container ${greyBg && "bg-k-grey-bg-1-color"}`}>
			<PageItemTitle title="تازه ها" desc="آخرین محتوای اضافه شده به سامانه" moreText="۱۴ مورد دیگر" moreUrl="/" />
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
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_item, index) => (
					<SwiperSlide key={index} className="pb-10 w-fit">
						<WideCard />
					</SwiperSlide>
				))}
			</KSwiper>
		</div>
	);
};

export default WideCardsRow;
