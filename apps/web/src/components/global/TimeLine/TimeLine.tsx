import { FC, useState, useMemo } from "react";
import Swiper, { Autoplay } from "swiper";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import KSwiper from "@/components/global/KSwipper/KSwiper";
import SwiperInstance from "@/components/global/TimeLine/SwiperInstance";
import { IPostRead } from "@my/types";
import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import TimeLineButtons from "@/components/global/TimeLine/components/TimeLineButtons";
import TimeLineHeader from "@/components/global/TimeLine/components/TimeLineHeader";
import TimeLineYearShape from "@/components/global/TimeLine/components/TimeLineYearShape";
import TimeLineSlide from "@/components/global/TimeLine/components/TimeLineSlide";

interface ITimeLine {
	posts: IPostRead[];
	title: string;
	subTitle?: string;
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
	[1, 2, 3, 4, 5].map((_) => {
		posts.map((post) => tempPosts.push(post));
	});
	tempPosts.sort((a, b) => a.eventDate - b.eventDate);
	return tempPosts;
};

const TimeLine: FC<ITimeLine> = ({
	posts,
	title,
	subTitle,
}) => {
	//states
	const [activeIndex, setActiveIndex] = useState(0);
	const [swiperInstance, setSwiperInstance] =
		useState<Swiper>();

	const getSlide = (slides: IPostRead[], index: number) => {
		let needYear;
		if (index > 0) {
			needYear =
				dateObjectFormatter(slides[0].eventDate, "YYYY") !==
				dateObjectFormatter(
					array[index - 1].posts[0].eventDate,
					"YYYY"
				);
		} else {
			needYear =
				dateObjectFormatter(slides[0].eventDate, "YYYY") !==
				dateObjectFormatter(
					array[array.length - 1].posts[0].eventDate,
					"YYYY"
				);
		}

		return (
			<SwiperSlide className="px-0 !w-fit" key={index}>
				<TimeLineSlide
					index={index}
					slides={slides}
					needYear={needYear}
				/>
			</SwiperSlide>
		);
	};

	const array: any = chunkArray(multiplePosts(posts), 2).map(
		(arr, index) => ({ posts: arr, index })
	);

	// console.log(array);
	// console.log(activeIndex);
	// console.log(
	// 	dateObjectFormatter(
	// 		array[activeIndex].posts[0].eventDate,
	// 		"YYYY"
	// 	)
	// );

	const renderSlides = useMemo(
		() =>
			chunkArray(multiplePosts(posts), 2).map((arr, index) =>
				getSlide(arr, index)
			),
		[]
	);
	const activeYear = useMemo(
		() =>
			dateObjectFormatter(
				array[activeIndex].posts[0].eventDate,
				"YYYY"
			),
		[activeIndex]
	);

	return (
		<div className="relative">
			<TimeLineHeader
				title={title}
				subTitle={subTitle}
				year={activeYear}
			/>
			<div className="relative w-full py-24 overflow-hidden">
				<TimeLineYearShape
					orientation="vertical"
					year={activeYear}
				/>

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
						onSlideChange={(swiper: Swiper) => {
							setActiveIndex(swiper.realIndex);
							console.log(swiper);
						}}
						// centeredSlides={true}
						loop={false}
					>
						{renderSlides}
						<SwiperInstance
							setSwiperInstance={setSwiperInstance}
						/>
					</KSwiper>
				</div>
				<div className="absolute top-0 left-0 w-full border-b h-1/2 border-k-text-color" />
			</div>
			<TimeLineButtons swiperInstance={swiperInstance} />
		</div>
	);
};

export default TimeLine;
