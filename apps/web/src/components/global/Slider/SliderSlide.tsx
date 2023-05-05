import webConfig from "@/global/constants/webConfig";
import { ISliderRead } from "@my/types";
import Image from "next/image";
import { FC } from "react";

interface ISliderSlide extends ISliderRead {
	imagePathName: string;
	width: number;
	height: number;
	imageAlt: string;
}

const SliderSlide: FC<ISliderSlide> = ({
	imagePathName,
	imageAlt,
	width,
	height,
	...props
}) => {
	return (
		<div className="h-[500px] sm:h-[768px] max-h-[80vh] bg-slate-500">
			<div className="relative flex items-center justify-center w-full h-full overflow-hidden">
				<Image
					src={(webConfig.domain as string) + imagePathName}
					alt={imageAlt}
					width={width}
					height={height}
					className="object-cover object-center w-full h-full mx-auto "
				/>
				{/* <Image
					src={(webConfig.domain as string) + imagePathName}
					alt={imageAlt}
					width={width}
					height={height}
					className="absolute object-cover object-center w-full h-full scale-110 blur-xl brightness-50 -z-10"
				/> */}
				<div className="absolute top-0 right-0 flex flex-col items-center justify-center w-full h-full gap-2 k-container sm:items-start bg-k-faded-dark-bg-color sm:bg-transparent sm:bg-gradient-to-l from-k-dark-bg-color via-15% via-k-dark-bg-color to-50% to-black/0">
					{props.title && (
						<h1 className="text-3xl font-bold sm:text-5xl text-k-opposite-text-color">
							{props.title}
						</h1>
					)}
					{props.subTitle && (
						<h3 className="text-xl font-medium text-k-opposite-text-color">
							{props.subTitle}
						</h3>
					)}
					{props.shortDesc && (
						<h3 className="text-lg font-medium text-k-opposite-text-color">
							{props.shortDesc}
						</h3>
					)}
					<p className="max-w-xl mt-4 text-justify sm:text-right text-k-opposite-text-color">
						{props.desc}
					</p>
				</div>
			</div>
		</div>
	);
};

export default SliderSlide;
