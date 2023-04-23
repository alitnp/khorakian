"use client";

import "@/assets/style/emblaStyles.css";
import KSwiper from "@/components/KSwipper/KSwiper";
import { SwiperSlide } from "swiper/react";
import { FC } from 'react';
import PageItemTitle from "@/components/PageItems/PageItemTitle";
import ImageOnlyCard from "@/components/Card/ImageOnlyCard";

interface IImageOnlyCardsRow {
	greyBg?: boolean;
}

const ImageOnlyCardsRow: FC<IImageOnlyCardsRow> = ({ greyBg = false }) => {
	return (
		<div className={`py-14 k-container ${greyBg && "bg-k-grey-bg-1-color"}`}>
			<PageItemTitle title="تازه ها" desc="آخرین محتوای اضافه شده به سامانه" moreText="۱۴ مورد دیگر" moreUrl="/" />

			<KSwiper
				slidesPerView={"auto"}
				spaceBetween={40}
				wrapperClassName="pb-4"
			>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_item, index) => (
					<SwiperSlide key={index} className="py-2 w-fit">
						<ImageOnlyCard />
					</SwiperSlide>
				))}
			</KSwiper>
		</div>
	);
};

export default ImageOnlyCardsRow;
