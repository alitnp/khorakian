import { FC, useEffect, useState } from "react";

interface ISliderHistory {}

const data = [
	{ label: "مشاور مجلس شورای اسلامی", from: 1388, to: 1392 },
	{ label: "مشاور شورای مجلس ", from: 1386, to: 1392 },
	{ label: "مشاور مجلس اسلامی", from: 1385, to: 1392 },
];

const SliderHistory: FC<ISliderHistory> = ({}) => {
	//state
	const [activeIndex, setActiveIndex] = useState<number>(0);

	//effect
	useEffect(() => {
		const interval = setInterval(() => {
			if (activeIndex === data.length - 1) setActiveIndex(0);
			else setActiveIndex(activeIndex + 1);
		}, 3000);
		return () => clearInterval(interval);
	}, [activeIndex]);

	return (
		<div className="relative z-20 py-3 sm:rounded-tr-lg sm:bottom-0 sm:left-0 sm:px-4 sm:py-6 sm:absolute bg-k-dark-bg-color sm:bg-k-faded-dark-bg-color sm:w-64">
			<div className="text-center text-k-opposite-text-color sm:flex">
				<div className="w-full">
					<p>{data[activeIndex].label}</p>
					<p className="font-bold text-center text-k-primary-color">
						{data[activeIndex].from} - {data[activeIndex].to}
					</p>
				</div>
				<div className="flex justify-center gap-2 mt-2 sm:mt-0 sm:flex-col">
					{data.map((_dot, index) => (
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
