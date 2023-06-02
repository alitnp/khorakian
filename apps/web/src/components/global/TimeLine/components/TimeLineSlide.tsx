import TimeLinePost from "@/components/global/TimeLine/components/TimeLinePost";
import { yearShape } from "@/global/constants/icons";
import { dateObjectFormatter } from "@/global/utils/helperFunctions";
import { IPostRead } from "@my/types";
import { FC } from "react";

interface ITimeLineSlide {
	index: number;
	needYear: boolean;
	slides: IPostRead[];
}

const TimeLineSlide: FC<ITimeLineSlide> = ({
	index,
	needYear,
	slides,
}) => {
	return (
		< >
			{needYear && (
				<div className="absolute top-0 right-0 flex items-center justify-center h-full border-l border-dashed fill-k-grey-bg-2-color inherit-fill ">
					<div className="relative scale-75 right-1/2">
						{yearShape}
						<span className="absolute -rotate-90 translate-x-1/2 -translate-y-1/2 top-1/2 right-1/2">
							{dateObjectFormatter(slides[0].eventDate, "YYYY")}
						</span>
					</div>
				</div>
			)}
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
		</>
	);
};

export default TimeLineSlide;
