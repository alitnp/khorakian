import 'swiper/css';
import 'swiper/css/autoplay';
import { FC } from 'react';
import useScreenWidth from '@/global/utils/useScreenWidth';
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

interface IKSwiper extends SwiperProps {
  wrapperClassName?: string;
  needNavigation?: boolean;
}

const PostDetailSlider: FC<IKSwiper> = ({
  wrapperClassName,
  needNavigation,
  children,
  ...props
}) => {
  //state
  //   const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  //hooks
  const width = useScreenWidth();

  return (
    <>
      <div className={wrapperClassName}>
        <Swiper
          // style={{
          //   '--swiper-navigation-color': '#fff',
          //   '--swiper-pagination-color': '#fff',
          // }}
          spaceBetween={10}
          navigation={true}
          //   thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>
        </Swiper>
        <Swiper
          //   onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          dir="rtl"
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={width > 500 && needNavigation ? true : false}
          {...props}
        >
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default PostDetailSlider;
