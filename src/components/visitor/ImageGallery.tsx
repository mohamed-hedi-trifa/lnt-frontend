import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useMediaQuery } from "react-responsive";
import "./ImageGallery.css";

const ImageGallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  // Tailwind's "lg" breakpoint starts at 1024px.
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const images = [
    "/images/formation.png",
    "/images/definition.png",
    "/images/groupe.png",
    "/images/team.png",
    "/images/formation.png",
    "/images/definition.png",
    "/images/team.png",
  ];

  return (
    <div className="w-full max-w-[800px] mx-auto">
      {/* Main Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        loop={true}
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        className="rounded-xl shadow-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
        <div className="w-full h-full top-0 z-10 absolute flex items-center justify-between">
          <div className="swiper-prev ml-2.5">
            <ChevronLeftIcon className="text-[#3E3232]" />
          </div>
          <div className="swiper-next mr-2.5">
            <ChevronRightIcon className="text-[#3E3232]" />
          </div>
        </div>
      </Swiper>

      {/* Conditionally render thumbnail Swiper based on viewport */}
      {isDesktop ? (
        <div className="px-10 relative mt-[30px]">
          <Swiper
            modules={[Thumbs, FreeMode, Navigation]}
            onSwiper={setThumbsSwiper}
            navigation={{
              nextEl: ".thumb-next",
              prevEl: ".thumb-prev",
            }}
            spaceBetween={25}
            slidesPerView={6}
            watchSlidesProgress={true}
            className="mt-4"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <img
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-[100px] object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="w-full h-full top-0 left-0 z-50 absolute flex items-center justify-between pointer-events-none">
            <div className="thumb-prev relative z-50 pointer-events-auto">
              <ChevronLeftIcon className="text-[#3E3232]" />
            </div>
            <div className="thumb-next relative z-50 pointer-events-auto">
              <ChevronRightIcon className="text-[#3E3232]" />
            </div>
          </div>
        </div>
      ) : (
        <div className="px-10 relative mt-[30px]">
          <Swiper
            modules={[Thumbs, FreeMode, Navigation]}
            onSwiper={setThumbsSwiper}
            navigation={{
              nextEl: ".thumb-next",
              prevEl: ".thumb-prev",
            }}
            spaceBetween={20}
            slidesPerView={4}
            watchSlidesProgress={true}
            className="mt-4"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <img
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-[50px] object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="w-full h-full top-0 left-0 z-50 absolute flex items-center justify-between">
            <div className="thumb-prev relative z-50">
              <ChevronLeftIcon className="text-[#3E3232]" />
            </div>
            <div className="thumb-next relative z-50">
              <ChevronRightIcon className="text-[#3E3232]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
