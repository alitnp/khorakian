import Slider from "@/components/global/Slider/Slider";
import SliderHistory from "@/components/global/Slider/SliderHistory";
import SliderSlide from "@/components/global/Slider/SliderSlide";
import {
	IHistory,
	IPageItemConents,
	ISliderRead,
} from "@my/types";
import { FC, memo } from "react";

interface IHomeSlider {
	data: IPageItemConents;
	histories: IHistory[];
}

const HomeSlider: FC<IHomeSlider> = ({
	data,
	histories,
}) => {
	return (
		<Slider
			history={<SliderHistory histories={histories} />}
			items={data.content.map((slide: ISliderRead) => (
				<SliderSlide
					key={slide._id}
					{...slide}
					imagePathName={slide.image.pathname}
					width={slide.image.width}
					height={slide.image.height}
					imageAlt={slide.image.title}
				/>
			))}
		/>
	);
};

export default memo(HomeSlider);
