import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

// Import des styles de Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface Props {
  switcher: string[];
}

const Carousel2: React.FC<Props> = ({ switcher }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="w-full">
      {/* Carrousel principal avec navigation */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        className="w-full"
      >
        {switcher.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Image ${index}`}
              className="w-full h-auto object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Miniatures avec breakpoints pour ajuster le nombre de slides */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={10}
        freeMode={true}
        watchSlidesProgress={true}
        breakpoints={{
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 10 },
        }}
        className="mt-4"
      >
        {switcher.map((image, index) => (
          <SwiperSlide key={index} style={{ cursor: "pointer" }}>
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              className="w-full h-auto object-cover rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel2;
