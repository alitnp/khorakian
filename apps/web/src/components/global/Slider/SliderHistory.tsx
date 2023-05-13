import { IHistory } from "@my/types";
import { FC, useEffect, useState } from "react";

interface ISliderHistory {
	histories: IHistory[];
}

const SliderHistory: FC<ISliderHistory> = ({
	histories,
}) => {
	//state
	const [activeIndex, setActiveIndex] = useState<number>(0);

	//effect
	useEffect(() => {
		const interval = setInterval(() => {
			if (!histories) return;
			if (activeIndex === histories.length - 1)
				setActiveIndex(0);
			else setActiveIndex(activeIndex + 1);
		}, 3000);
		return () => clearInterval(interval);
	}, [activeIndex]);

	if (!histories || histories?.length === 0) return null;

	return (
		<div className="relative z-20 py-3 sm:rounded-tr-lg sm:bottom-0 sm:left-0 sm:px-4 sm:py-6 sm:absolute bg-k-dark-bg-color sm:bg-k-faded-dark-bg-color sm:w-64">
			<div className="text-center text-k-opposite-text-color sm:flex">
				<div className="w-full">
					<h5>{histories[activeIndex]?.title}</h5>
					<p className="font-bold text-center text-k-primary-color">
						{histories[activeIndex]?.from} -{" "}
						{histories[activeIndex]?.to}
					</p>
				</div>
				<div className="flex justify-center gap-2 mt-2 sm:mt-0 sm:flex-col">
					{histories.map((_dot, index) => (
						<div
							key={index}
							className={`${
								index === activeIndex
									? "bg-k-primary-color scale-125"
									: "bg-k-bg-color"
							} transition-all duration-300 w-2 h-2 rounded-full`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default SliderHistory;
