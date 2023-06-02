import { yearShape } from "@/global/constants/icons";
import { FC } from "react";

interface ITimeLineYearShape {
	orientation: "vertical" | "horizental";
	year: string;
}

const TimeLineYearShape: FC<ITimeLineYearShape> = ({
	orientation,
	year,
}) => {
	if (orientation === "vertical")
		return (
			<div className="absolute top-0 right-0 z-10 hidden h-full border-l md:block w-36 backdrop-blur-sm border-k-text-color">
				<div className="relative w-full h-full ">
					<div className="absolute left-0 -translate-x-1/2 -translate-y-1/2 top-1/2">
						{yearShape}
						<div className="absolute -rotate-90 translate-x-1/2 -translate-y-1/2 text-k-bg-color top-1/2 right-1/2">
							{year}
						</div>
					</div>
				</div>
			</div>
		);
	return (
		<div className="relative w-full h-0 mt-8 border-b border-k-text-color md:hidden">
			<div className="absolute translate-x-1/2 -translate-y-1/2 right-1/2 top-1/2">
				<div className="rotate-90">{yearShape}</div>
				<div className="absolute translate-x-1/2 -translate-y-1/2 text-k-bg-color top-1/2 right-1/2">
					{year}
				</div>
			</div>
		</div>
	);
};

export default TimeLineYearShape;
