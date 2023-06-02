import TimeLineYearShape from "@/components/global/TimeLine/components/TimeLineYearShape";
import { yearShape } from "@/global/constants/icons";
import { FC } from "react";

interface ITimeLineHeader {
	title: string;
	subTitle?: string;
	year: string;
}

const TimeLineHeader: FC<ITimeLineHeader> = ({
	title,
	subTitle,
	year,
}) => {
	return (
		<>
			<div className="absolute top-0 right-0 z-20 w-full mt-6 border-k-text-color">
				<h2 className="mr-6 text-2xl font-bold md:mr-16 md:text-3xl">
					{title}
				</h2>
				{subTitle && (
					<span className="mr-6 md:mr-16">{subTitle}</span>
				)}
				<TimeLineYearShape
					orientation="horizental"
					year={year}
				/>
			</div>
		</>
	);
};

export default TimeLineHeader;
