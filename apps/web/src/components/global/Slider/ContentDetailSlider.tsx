import { FC, useState } from "react";
import React from "react";
import { SwiperSlide, SwiperProps } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FreeMode, Thumbs } from "swiper";
import webConfig from "@/global/constants/webConfig";
import Image from "next/image";
import { IImage, IVideoRead } from "@my/types";
import KSwiper from "@/components/global/KSwipper/KSwiper";
import VideoItem from "@/components/global/VideoPlayer/VideoItem";

interface IProps extends SwiperProps {
	images: IImage[];
	videos: IVideoRead[];
}

const ContentDetailSlider: FC<IProps> = ({
	images,
	videos,
}) => {
	//state
	const [thumbsSwiper, setThumbsSwiper] = useState<any>();
	const [activeIndex, setActiveIndex] = useState<number>(0);

	if (images.length === 0 && videos.length === 0)
		return <></>;
	return (
		<div className="mb-6 select-none bg-k-text-color">
			<KSwiper
				observer
				observeParents
				spaceBetween={0}
				onSlideChange={(swiper: any) =>
					setActiveIndex(swiper.activeIndex)
				}
				thumbs={{
					swiper:
						thumbsSwiper && !thumbsSwiper.destroyed
							? thumbsSwiper
							: null,
				}}
				modules={[FreeMode, Thumbs]}
			>
				{videos?.map((vid) => (
					<SwiperSlide
						key={vid._id + ""}
						className="relative w-full h-[300px] md:h-[500px] max-h-[80vh] overflow-hidden"
					>
						<VideoItem video={vid} size="full" />
					</SwiperSlide>
				))}
				{images?.map((img) => (
					<SwiperSlide
						key={img._id + ""}
						className="relative w-full h-[300px] md:h-[500px] max-h-[80vh] overflow-hidden"
					>
						<Image
							className="z-0 object-cover object-center w-full h-[300px] md:h-[500px] max-h-[80vh] scale-110 brightness-50 blur-lg"
							src={webConfig.domain + img.pathname}
							width={img.width}
							height={img.height}
							alt={img.title}
						/>
						<div className="absolute top-0 left-0 z-20 w-full h-full ">
							<Image
								className="object-contain shadow-lg w-full h-[300px] md:h-[500px] max-h-[80vh] object-center"
								src={webConfig.domain + img.pathname}
								width={img.width}
								height={img.height}
								alt={img.title}
							/>
						</div>
					</SwiperSlide>
				))}
			</KSwiper>

			{images?.length + videos?.length > 1 && (
				<div className="!w-fit mx-auto">
					<KSwiper
						onSwiper={setThumbsSwiper}
						spaceBetween={8}
						slidesPerView={"auto"}
						watchSlidesProgress={true}
						modules={[Thumbs]}
						dir="rtl"
						pagination={{
							clickable: true,
							dynamicBullets: true,
						}}
					>
						{videos?.map((vid, index) => (
							<SwiperSlide
								key={vid._id + ""}
								className={`h-[100px] max-h-[20vh] !w-fit border-2 rounded-lg overflow-hidden ${
									index === activeIndex
										? " border-k-secondary-color"
										: "border-transparent"
								}`}
							>
								<VideoItem video={vid} size="small" imageOnly />
							</SwiperSlide>
						))}
						{images?.map((img, index) => (
							<SwiperSlide
								key={img._id + ""}
								className={`h-[100px] max-h-[20vh] !w-fit border-2 rounded-lg overflow-hidden ${
									index + videos.length === activeIndex
										? " border-k-secondary-color"
										: "border-transparent"
								}`}
							>
								<Image
									className="object-contain w-fit h-[100px] max-h-[20vh] object-center"
									src={webConfig.domain + img.pathname}
									width={img.width}
									height={img.height}
									alt={img.title}
								/>
							</SwiperSlide>
						))}
					</KSwiper>
				</div>
			)}
		</div>
	);
};

export default ContentDetailSlider;
