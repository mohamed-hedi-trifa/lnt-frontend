import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, FreeMode } from 'swiper';
import './Carousel.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

SwiperCore.use([Autoplay, FreeMode]);

const Carousel = ({ slides }: { slides: any[] }) => {
  return (
    <div className="u-wrapper">
      <div className="c-carousel">
        <Swiper
          spaceBetween={0}
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          loop={true}
          freeMode={true}
          freeModeMomentum={false}
          allowTouchMove={false}
          loopAdditionalSlides={slides.length}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="c-carousel__wrapper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="c-carousel__item">
              <img src={slide.image} alt={`Logo ${index}`} className="h-20" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
