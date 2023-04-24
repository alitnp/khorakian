import { FC, useMemo } from "react";

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

const TimeLine: FC<ITimeLine> = ({}) => {
	const topImage = useMemo(
		() => (
			<div className="flex items-center border-b h-1/2 gap-x-2 border-k-text-color">
				{[...imageSrcs].reverse().map((src, index) => (
					<div className="relative flex items-center w-full h-full ">
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
							className={`relative overflow-hidden rounded-xl shrink-0 shadow-lg ${
								index % 2 === 0 && "scale-75"
							}`}
						>
							<img
								src={src}
								className="object-contain max-w-[256px] max-h-[200px] hover:scale-125 transition-all duration-1000 ease-linear"
							/>
						</div>
					</div>
				))}
			</div>
		),
		[]
	);
	const bottomImage = useMemo(
		() => (
			<div className="flex items-center mr-28 h-1/2 gap-x-2 w-fit">
				{imageSrcs.map((src, index) => (
					<div className="relative flex items-center w-full h-full ">
						<div className="absolute top-0 w-full h-1/2">
							<div className="relative w-1/2 h-full border-l border-dashed border-k-text-color">
								<div className="absolute w-2 h-2 rounded-full -top-1 -left-1 bg-k-text-color" />
							</div>
						</div>
						{(index + 1) % 4 === 0 && (
							<span className="absolute pb-1 text-xs translate-x-1/2 -translate-y-full -top-0 right-1/2 text-k-grey-text-color whitespace-nowrap">
								۲۰ فروردین ۱۴۰۱
							</span>
						)}
						<div
							key={index}
							className={`relative overflow-hidden shadow-lg rounded-xl shrink-0 ${
								index % 2 === 0 && "scale-75"
							}`}
						>
							<img
								src={src}
								className="object-contain max-w-[256px] max-h-[200px] hover:scale-125 transition-all duration-1000 ease-linear"
							/>
						</div>
					</div>
				))}
			</div>
		),
		[]
	);
	return (
		<div className="w-full h-[500px] border-y relative overflow-x-auto">
			{topImage}
			{bottomImage}

			<div className="fixed top-0 right-0 h-full border-l w-28 backdrop-blur-sm border-k-text-color"></div>
		</div>
	);
};

export default TimeLine;
