import { FC, useState, useMemo } from "react";
import Swiper, { Autoplay } from "swiper";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import { yearShape } from "@/global/constants/icons";
import KSwiper from "@/components/global/KSwipper/KSwiper";
import SwiperInstance from "@/components/global/TimeLine/SwiperInstance";
import { IPostRead } from "@my/types";
import TimeLinePost from "@/components/global/TimeLine/components/TimeLinePost";
import {
	IoIosArrowBack,
	IoIosArrowForward,
} from "react-icons/io";

interface ITimeLine {
	posts: IPostRead[];
}

function chunkArray(arr: any[], size: number): any[] {
	const chunkedArr = [];
	let index = 0;
	while (index < arr.length) {
		chunkedArr.push(arr.slice(index, index + size));
		index += size;
	}
	return chunkedArr;
}
const multiplePosts = (posts: IPostRead[]): IPostRead[] => {
	const tempPosts: IPostRead[] = [];
	[1, 2, 3, 4, 5, 6, 7].map((_) => {
		posts.map((post) => tempPosts.push(post));
	});
	tempPosts.sort((a, b) => a.eventDate - b.eventDate);
	return tempPosts;
};

const TimeLine: FC<ITimeLine> = ({ posts }) => {
	//states
	const [activeIndex, setActiveIndex] = useState(0);
	const [swiperInstance, setSwiperInstance] =
		useState<Swiper>();

	const getSlide = (slides: IPostRead[], index: number) => (
		<SwiperSlide className="px-0 !w-fit" key={index}>
			<div className="px-2 py-2 w-fit">
				<div className="h-[500px] w-fit">
					<div className="flex items-center w-fit h-1/2 ">
						{[
							...slides.filter((_item, idx) => idx % 2 === 1),
						].map((post) => (
							<TimeLinePost
								index={index}
								post={post}
								key={post._id}
							/>
						))}
					</div>
					<div className="flex items-center h-1/2 shrink-0 w-fit">
						{[
							...slides.filter((_item, idx) => idx % 2 === 0),
						].map((post) => (
							<TimeLinePost
								key={post._id}
								post={post}
								index={index}
								down
							/>
						))}
					</div>
				</div>
			</div>
		</SwiperSlide>
	);

	const renderSlides = useMemo(
		() =>
			chunkArray(multiplePosts(posts), 2).map((arr, index) =>
				getSlide(arr, index)
			),
		[]
	);

	return (
		<div className="relative">
			<div className="relative w-full py-24 overflow-hidden">
				<div className="absolute top-0 right-0 z-10 hidden h-full border-l md:block w-36 backdrop-blur-sm border-k-text-color">
					<div className="relative w-full h-full ">
						<div className="absolute left-0 -translate-x-1/2 -translate-y-1/2 top-1/2">
							{yearShape}
						</div>
					</div>
				</div>
				<div className="w-full overflow-hidden border-y">
					<KSwiper
						slidesPerView={"auto"}
						freeMode={true}
						scrollbar={true}
						modules={
							[
								// Autoplay
							]
						}
						autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
						spaceBetween={0}
						onSlideChange={(swiper: Swiper) =>
							setActiveIndex(swiper.activeIndex)
						}
						// centeredSlides={true}
						loop
					>
						{renderSlides}
						<SwiperInstance
							setSwiperInstance={setSwiperInstance}
						/>
					</KSwiper>
				</div>
				<div className="absolute top-0 left-0 w-full border-b h-1/2 border-k-text-color" />
			</div>
			<div className="absolute bottom-0 flex flex-col h-full translate-x-1/2 right-1/2">
				<div className="w-1/2 h-full border-l border-dashed border-k-primary-color"></div>
			</div>
			<div className="absolute translate-x-1/2 bottom-6 right-1/2">
				<div className="relative flex gap-8 py-6">
					<div
						className="flex items-center justify-center w-8 h-8 transition-shadow duration-300 border rounded-full shadow-none cursor-pointer hover:shadow-lg"
						onClick={() => swiperInstance?.slideNext()}
					>
						<IoIosArrowForward className="cursor-pointer shadow-none transition-shadow hover:shadow-lg ml-[2px]" />
					</div>
					<div
						className="flex items-center justify-center w-8 h-8 transition-shadow duration-300 border rounded-full shadow-none cursor-pointer hover:shadow-lg"
						onClick={() => swiperInstance?.slidePrev()}
					>
						<IoIosArrowBack className=" mr-[2px]" />
					</div>
					<div className="absolute top-0 w-0 h-full translate-x-1/2 border-2 rounded-full border-k-primary-color right-1/2"></div>
				</div>
			</div>
		</div>
	);
};

export default TimeLine;
