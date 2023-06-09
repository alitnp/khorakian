import { FC, useState, useMemo } from "react";
import Swiper from "swiper";
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
					postsArray[index - 1].posts[0].eventDate,
					"YYYY"
				);
		} else {
			needYear =
				dateObjectFormatter(slides[0].eventDate, "YYYY") !==
				dateObjectFormatter(
					postsArray[postsArray.length - 1].posts[0].eventDate,
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

	const postsArray: any = chunkArray(
		multiplePosts(posts),
		2
	).map((arr, index) => ({ posts: arr, index }));

	const yearsIndex = useMemo(() => {
		if (!postsArray) return [];
		const years: { year: string; index: number }[] = [];
		postsArray.map(
			(postIndex: { posts: IPostRead[]; index: number }) => {
				const year = dateObjectFormatter(
					postIndex.posts[0].eventDate,
					"YYYY"
				);
				if (!years.some((item) => item.year === year))
					years.push({ year, index: postIndex.index });
			}
		);
		return years;
	}, []);

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
				postsArray[activeIndex].posts[0].eventDate,
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
				yearsIndex={yearsIndex}
				goToSlide={(index: number) =>
					swiperInstance?.slideTo(index, 300)
				}
			/>
			<div className="relative w-full py-32 overflow-hidden md:py-24">
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
						}}
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
