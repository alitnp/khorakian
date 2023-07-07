import TimeLineYearShape from "@/components/global/TimeLine/components/TimeLineYearShape";
import { Select } from "antd";
import { FC } from "react";

interface ITimeLineHeader {
	title: string;
	subTitle?: string;
	year: string;
	yearsIndex: { year: string; index: number }[];
	goToSlide: (_index: number) => void;
}

const TimeLineHeader: FC<ITimeLineHeader> = ({
	title,
	subTitle,
	year,
	yearsIndex,
	goToSlide,
}) => {
	return (
		<>
			<div className="absolute top-0 right-0 z-20 w-full mt-6 border-k-text-color">
				<div className="flex flex-col justify-between mx-6 sm:flex-row md:mx-16">
					<div>
						<h2 className="text-2xl font-bold md:text-3xl">
							{title}
						</h2>
						{subTitle && <span className="">{subTitle}</span>}
					</div>
					<div className="">
						<Select
							options={yearsIndex.map((item) => ({
								label: item.year,
								value: item.index,
							}))}
							onChange={(e) => goToSlide(e)}
							placeholder="برو به سال"
							style={{ minWidth: "100px" }}
						/>
					</div>
				</div>
				<TimeLineYearShape
					orientation="horizental"
					year={year}
				/>
			</div>
		</>
	);
};

export default TimeLineHeader;
