import { FC } from "react";
import {
	IoIosArrowBack,
	IoIosArrowForward,
} from "react-icons/io";
import Swiper from "swiper";

interface ITimeLineButtons {
	swiperInstance: Swiper | undefined;
}

const TimeLineButtons: FC<ITimeLineButtons> = ({
	swiperInstance,
}) => {
	return (
		<>
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
		</>
	);
};

export default TimeLineButtons;
