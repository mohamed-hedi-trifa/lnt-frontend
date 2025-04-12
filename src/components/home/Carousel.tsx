import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import des modules
import { Autoplay, FreeMode } from 'swiper/modules';

// Import obligatoire des CSS
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';

import './Carousel.css';
import Loader from '../atoms/loader';

interface SlideItem {
  image: string;
  name?: string;
}

const Carousel = ({ slides }: { slides: SlideItem[] }) => {
  return (
    <div className="u-wrapper">
      <div className="c-carousel">
        {slides ? (
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView={1}
          freeMode={true}
          freeModeMomentum={false}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={4000}
          allowTouchMove={true}
          spaceBetween={0}
          breakpoints={{
            375:  { slidesPerView: 2 },
            640:  { slidesPerView: 3 },
            768:  { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}

          className="c-carousel__wrapper"
        >
          {slides?.map((slide, index) => (
            <SwiperSlide key={index} className="c-carousel__item">
              <img
                src={`${process.env.GATSBY_API_URL}${slide.image}`}
                alt={slide.name || ''}
                className="h-20"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className='flex justify-center items-center pt-40'> <Loader/> </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
