import "swiper/css/pagination";
import webConfig from "@/global/constants/webConfig";
import { IAboutMeRead, IImage } from "@my/types";
import Image from "next/image";
import { FC } from "react";
import HomeAboutMeCard from "@/components/home/HomeAboutMeCard";
import { SwiperSlide } from "swiper/react";
import KSwiper from "@/components/global/KSwipper/KSwiper";
import { Pagination } from "swiper";

interface IHomeAboutMe {
	posts: IAboutMeRead[];
	home_aboutMe_title?: string;
	home_aboutMe_text?: string;
	home_aboutMe_image?: IImage;
}

const HomeAboutMe: FC<IHomeAboutMe> = ({
	posts,
	home_aboutMe_title,
	home_aboutMe_text,
	home_aboutMe_image,
}) => {
	return (
		<div className="grid w-full grid-cols-1 my-6 k-container">
			<div className="flex items-center w-full">
				<div className="flex flex-col justify-center w-full py-20 grow-0">
					<h4 className="mb-4 text-2xl font-bold">
						{home_aboutMe_title}
					</h4>
					<p className="max-w-[100ch] 2xl:max-w-[130ch] w-full mb-6">
						{home_aboutMe_text}
					</p>
					<div className="xl:max-w-[100ch] 2xl:max-w-[130ch]">
						<KSwiper
							slidesPerView={1}
							spaceBetween={16}
							modules={[Pagination]}
							pagination={{
								clickable: true,
							}}
							wrapperClassName=""
							breakpoints={{ 600: { slidesPerView: 2 } }}
						>
							{posts.map((item, index: number) => (
								<SwiperSlide
									key={item._id}
									className="!h-auto pb-8"
								>
									<HomeAboutMeCard aboutMe={item} index={index} />
								</SwiperSlide>
							))}
						</KSwiper>
					</div>
				</div>
				<div className="hidden w-full xl:block shrink">
					{home_aboutMe_image && (
						<div className="mx-auto overflow-hidden rounded-lg w-fit ">
							<Image
								src={webConfig.domain + home_aboutMe_image.pathname}
								width={home_aboutMe_image.width}
								height={home_aboutMe_image.height}
								alt={home_aboutMe_image.title}
								className="object-cover h-full max-w-md w-full max-h-[500px]"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default HomeAboutMe;
