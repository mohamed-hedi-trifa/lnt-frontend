import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import './Carousel.css';
import { Autoplay, FreeMode } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

SwiperCore.use([Autoplay, FreeMode]);

const Carousel = ({ slides }: { slides: any[] }) => {
  return (
    <div className="u-wrapper">
      <div className="c-carousel">
        {slides ? (
          <Swiper
  spaceBetween={0}
  speed={1000}
  autoplay={{
    delay: 0, // No delay between slides
    disableOnInteraction: false, // Autoplay continues after user interaction
  }}
  loop={true}
  freeMode={false}
  freeModeMomentum={false}
  allowTouchMove={true}
  loopAdditionalSlides={slides ? slides.length : 0}
  slidesPerView={1}
  breakpoints={{
    375: { slidesPerView: 2 },
    640: { slidesPerView: 3 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 5 },
  }}
  className="c-carousel__wrapper"
>
  {slides?.map((slide, index) => (
    <SwiperSlide key={index} className="c-carousel__item">
      <img
        src={`${process.env.GATSBY_API_URL}${slide?.image}`}
        alt={slide.name}
        className="h-20"
      />
    </SwiperSlide>
  ))}
</Swiper>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Carousel;
