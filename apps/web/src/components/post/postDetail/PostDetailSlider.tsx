import 'swiper/css';
import 'swiper/css/autoplay';
import { FC, useState } from 'react';
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
import webConfig from '@/global/constants/webConfig';

interface IProps extends SwiperProps {
  images: any;
}

const PostDetailSlider: FC<IProps> = ({ children, images }) => {
  //state
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  //hooks

  console.log(images);

  return (
    <>
      <div className={'py-14 k-container bg-k-grey-bg-1-color'}>
        <Swiper
          // style={{
          //   '--swiper-navigation-color': '#fff',
          //   '--swiper-pagination-color': '#fff',
          // }}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {images?.length > 0 &&
            images?.map((img: any) => (
              <SwiperSlide key={img._id}>
                <img
                  className="w-full h-full"
                  src={webConfig.domain + img.pathname}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
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
        >
          {images?.length > 0 &&
            images?.map((img: any) => (
              <SwiperSlide key={img._id}>
                <img src={webConfig.domain + img.pathname} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default PostDetailSlider;
