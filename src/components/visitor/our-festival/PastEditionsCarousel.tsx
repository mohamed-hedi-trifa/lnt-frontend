import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import "./PastEditionsCarousel.css"
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import FestivalCardCarousel from "./FestivalCardCarousel";

const PastEditionsCarousel = ({editions}:{editions:any[]}) => {

  return (
    <div className="w-full max-w-[1202px] mx-auto relative">
      {/* Main Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        loop={true}
        spaceBetween={10}
        navigation={{
          nextEl: ".past-edit-swiper-next",
          prevEl: ".past-edit-swiper-prev"
      }}
        pagination={{ clickable: true }}
        className="rounded-xl shadow-lg"
      >
        {editions?.map((edition, index) => (
          <SwiperSlide key={index}>
             <FestivalCardCarousel
                      // key={cards[activeIndex % cards.length].}
                      date={edition.date}
                      description={edition.description}
                      titre={edition.titre}
                      lieu={edition.lieu}
                      />
          </SwiperSlide>
        ))}
      </Swiper>
        <div className="w-full h-full top-0 z-10 absolute flex items-center justify-between">
        <div className="past-edit-swiper-prev ml-[-50px] flex justify-center items-center"><div className="rotate-180"><ArrowRightIcon /></div></div>
        <div className="past-edit-swiper-next mr-[-50px] flex justify-center items-center"><ArrowRightIcon /></div>
        </div>

    </div>
  );
};

export default PastEditionsCarousel;
