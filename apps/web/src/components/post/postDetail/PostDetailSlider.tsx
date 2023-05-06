import { FC, useState } from "react";
import React from "react";
import { SwiperSlide, SwiperProps } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FreeMode, Thumbs } from "swiper";
import webConfig from "@/global/constants/webConfig";
import Image from "next/image";
import { IImage } from "@my/types";
import KSwiper from "@/components/global/KSwipper/KSwiper";

interface IProps extends SwiperProps {
	images: IImage[];
}

const PostDetailSlider: FC<IProps> = ({ images }) => {
	//state
	const [thumbsSwiper, setThumbsSwiper] = useState<any>();
	const [activeIndex, setActiveIndex] = useState<number>(0);

	return (
		<>
			<div className="select-none bg-k-text-color ">
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
					{images?.length > 0 &&
						images?.map((img) => (
							<SwiperSlide
								key={img._id}
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
						{images?.length > 0 &&
							images?.map((img, index) => (
								<SwiperSlide
									key={img._id}
									className={`h-[100px] max-h-[20vh] !w-fit border-2 rounded-lg overflow-hidden ${
										index === activeIndex
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
			</div>
		</>
	);
};

export default PostDetailSlider;
