import "swiper/css";
import "swiper/css/autoplay";
import { FC, useState } from "react";
import React from "react";
import {
	Swiper,
	SwiperSlide,
	SwiperProps,
} from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import webConfig from "@/global/constants/webConfig";
import Image from "next/image";
import { IImage } from "@my/types";

interface IProps extends SwiperProps {
	images: IImage[];
}

const PostDetailSlider: FC<IProps> = ({ images }) => {
	//state
	const [thumbsSwiper, setThumbsSwiper] = useState<any>();
	//hooks

	console.log(images);

	return (
		<>
			<div className="select-none bg-k-text-color">
				<Swiper
					spaceBetween={0}
					navigation={true}
					thumbs={{
						swiper:
							thumbsSwiper && !thumbsSwiper.destroyed
								? thumbsSwiper
								: null,
					}}
					modules={[FreeMode, Navigation, Thumbs]}
				>
					{images?.length > 0 &&
						images?.map((img) => (
							<SwiperSlide
								key={img._id}
								className="relative w-full h-[500px] max-h-[80vh] "
							>
								<Image
									className="object-contain w-full h-[500px] max-h-[80vh] object-center"
									src={webConfig.domain + img.pathname}
									width={img.width}
									height={img.height}
									alt={img.title}
								/>
							</SwiperSlide>
						))}
				</Swiper>

				<Swiper
					onSwiper={setThumbsSwiper}
					spaceBetween={0}
					slidesPerView={4}
					freeMode={true}
					watchSlidesProgress={true}
					modules={[FreeMode, Navigation, Thumbs]}
					dir="rtl"
					pagination={{
						clickable: true,
						dynamicBullets: true,
					}}
				>
					{images?.length > 0 &&
						images?.map((img) => (
							<SwiperSlide
								key={img._id}
								className="h-[200px] max-h-[20vh]"
							>
								<Image
									className="object-contain w-full h-[200px] max-h-[20vh] object-center"
									src={webConfig.domain + img.pathname}
									width={img.width}
									height={img.height}
									alt={img.title}
								/>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</>
	);
};

export default PostDetailSlider;
