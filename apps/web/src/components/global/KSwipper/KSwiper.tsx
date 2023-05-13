import "swiper/css";
import "swiper/css/autoplay";
import { FC } from "react";
import { Swiper, SwiperProps } from "swiper/react";
import useScreenWidth from "@/global/utils/useScreenWidth";

interface IKSwiper extends SwiperProps {
	wrapperClassName?: string;
	needNavigation?: boolean;
}

const KSwiper: FC<IKSwiper> = ({
	wrapperClassName,
	needNavigation,
	children,
	...props
}) => {
	//hooks
	const width = useScreenWidth();

	return (
		<>
			<div className={wrapperClassName}>
				<Swiper
					dir="rtl"
					pagination={{
						clickable: true,
						dynamicBullets: true,
					}}
					navigation={
						width > 500 && needNavigation ? true : false
					}
					{...props}
				>
					{children}
				</Swiper>
			</div>
		</>
	);
};

export default KSwiper;
