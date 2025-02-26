import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, FreeMode } from 'swiper';
import './Carousel.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

// Optionally import additional Swiper modules’ CSS if needed
// import 'swiper/css/autoplay';

// Configure Swiper to use modules
SwiperCore.use([Autoplay, FreeMode]);

const Carousel = ({slides}:{slides:any[]}) => {
  return (
    <div className="u-wrapper">
      <div className="c-carousel">
        <Swiper
          spaceBetween={0}
          speed={5000}
          direction="horizontal"
          autoplay={{ delay: 0 }}
          loop={true}
          slidesPerView={1}
          simulateTouch={false}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="c-carousel__wrapper"
        >
          {slides.map((slide)=><SwiperSlide className="c-carousel__item ">
            <img src={slide.image} alt="Logo 331" className='h-20 ' />
          </SwiperSlide>)}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
