import { FC, useEffect, useState } from "react";

interface ISliderHistory {}

const data = [
	{ label: "مشاور مجلس شورای اسلامی", from: 1388, to: 1392 },
	{ label: "مشاور مجلس ", from: 1386, to: 1392 },
	{ label: "مشاور اسلامی", from: 1385, to: 1392 },
];

const SliderHistory: FC<ISliderHistory> = ({}) => {
	//state
	const [activeIndex, setActiveIndex] = useState<number>(0);

	//effect
	useEffect(() => {
		const interval = setInterval(() => {
			console.log("called");
			if (activeIndex === data.length - 1) setActiveIndex(0);
			else setActiveIndex(activeIndex + 1);
		}, 4000);
		return () => clearInterval(interval);
	}, [activeIndex]);

	return (
		<div className="bg-slate-700/50">
			<div>
				<p>{data[activeIndex].label}</p>
				<p>
					{data[activeIndex].from} - {data[activeIndex].to}
				</p>
			</div>
		</div>
	);
};

export default SliderHistory;
