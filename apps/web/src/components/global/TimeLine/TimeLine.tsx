import { FC, useState } from "react";
import Swiper, { Autoplay } from "swiper";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import { yearShape } from "@/global/constants/icons";
import KSwiper from "@/components/global/KSwipper/KSwiper";
import SwiperInstance from "@/components/global/TimeLine/SwiperInstance";

interface ITimeLine {}

const imageSrcs = [
	"/image/1.jpg",
	"/image/2.jpg",
	"/image/3.jpg",
	"/image/4.jpg",
	"/image/5.jpg",
	"/image/6.jpg",
	"/image/7.jpg",
	"/image/8.jpg",
	"/image/9.jpg",
	"/image/10.jpg",
	"/image/11.jpg",
	"/image/12.jpg",
	"/image/13.jpg",
	"/image/14.jpg",
	"/image/15.jpg",
	"/image/16.jpg",
	"/image/17.jpg",
	"/image/18.jpg",
	"/image/19.jpg",
];

function chunkArray(arr: any[], size: number): any[] {
	const chunkedArr = [];
	let index = 0;
	while (index < arr.length) {
		chunkedArr.push(arr.slice(index, index + size));
		index += size;
	}
	return chunkedArr;
}

const TimeLine: FC<ITimeLine> = ({}) => {
	//states
	const [activeIndex, setActiveIndex] = useState(0);
	const [swiperInstance, setSwiperInstance] =
		useState<Swiper>();

	const getSlide = (slides: any[], index: number) => (
		<SwiperSlide className="px-0 !w-fit" key={index}>
			<div className="px-2 py-2 w-fit">
				<div className="h-[500px] w-fit">
					<div className="flex items-center w-fit h-1/2 ">
						{[...slides.filter((_item, idx) => idx % 2 === 1)]
							.reverse()
							.map((src, index) => (
								<div
									className="relative flex items-center h-full "
									key={index}
								>
									<div className="absolute bottom-0 w-full h-1/2">
										<div className="relative w-1/2 h-full border-l border-dashed border-k-text-color">
											<div className="absolute w-2 h-2 rounded-full -bottom-1 -left-1 bg-k-text-color" />
										</div>
									</div>
									{index % 3 === 0 && (
										<span className="absolute pt-1 text-xs translate-x-1/2 translate-y-full -bottom-0 right-1/2 text-k-grey-text-color whitespace-nowrap">
											۲۰ فروردین ۱۴۰۱
										</span>
									)}
									<div
										key={index}
										className={`relative overflow-hidden rounded-xl  shadow-lg 
									border
										`}
									>
										<img
											src={src}
											className="object-contain max-w-[256px] max-h-[200px] hover:scale-125 transition-all duration-1000 ease-linear"
										/>
									</div>
								</div>
							))}
					</div>
					<div className="flex items-center h-1/2 shrink-0 w-fit">
						{[
							...slides.filter((_item, idx) => idx % 2 === 0),
						].map((src, index) => (
							<div
								className="relative flex items-center h-full "
								key={index}
							>
								<div className="absolute top-0 w-full h-1/2">
									<div className="relative w-1/2 h-full border-l border-dashed border-k-text-color">
										<div className="absolute w-2 h-2 rounded-full -top-1 -left-1 bg-k-text-color" />
									</div>
								</div>

								<span className="absolute pb-1 text-xs translate-x-1/2 -translate-y-full -top-0 right-1/2 text-k-grey-text-color whitespace-nowrap">
									۲۰ فروردین ۱۴۰۱
								</span>

								<div
									key={index}
									className={`relative overflow-hidden shadow-lg rounded-xl border`}
								>
									<img
										src={src}
										className="object-contain max-w-[256px] max-h-[200px] hover:scale-125 transition-all duration-1000 ease-linear"
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</SwiperSlide>
	);

	return (
		<>
			<div className="relative w-full overflow-hidden">
				<div className="absolute top-0 right-0 z-10 h-full border-l w-36 backdrop-blur-sm border-k-text-color">
					<div className="relative w-full h-full ">
						<div className="absolute left-0 -translate-x-1/2 -translate-y-1/2 top-1/2">
							{yearShape}
						</div>
					</div>
				</div>
				<div className="w-full overflow-hidden ">
					<KSwiper
						slidesPerView={"auto"}
						freeMode={true}
						scrollbar={true}
						modules={[Autoplay]}
						autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
						spaceBetween={0}
						onSlideChange={(swiper: Swiper) =>
							setActiveIndex(swiper.activeIndex)
						}
						// centeredSlides={true}
						loop
					>
						{chunkArray([...imageSrcs, ...imageSrcs], 2).map(
							(arr, index) => getSlide(arr, index)
						)}
						<SwiperInstance
							setSwiperInstance={setSwiperInstance}
						/>
					</KSwiper>
				</div>
				<div className="absolute top-0 left-0 w-full border-b h-1/2 border-k-text-color" />
			</div>
			<button onClick={() => swiperInstance?.slideNext()}>
				next
			</button>
		</>
	);
};

export default TimeLine;
