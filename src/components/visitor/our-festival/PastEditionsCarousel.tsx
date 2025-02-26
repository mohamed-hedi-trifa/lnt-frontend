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

const PastEditionsCarousel = ({ prevEditions }: { prevEditions: any[] }) => {
  const formatDateRange = (startDate, endDate) => {
    const options = { day: "numeric", month: "long", year: "numeric" };

    const start = new Date(startDate);
    const end = new Date(endDate);

    const isSameYear = start.getFullYear() === end.getFullYear();
    const isSameMonth = start.getMonth() === end.getMonth() && isSameYear;

    if (isSameMonth) {
      return `Du ${start.getDate()} au ${end.toLocaleDateString("fr-FR", options)}`;
    } else if (isSameYear) {
      return `Du ${start.getDate()} ${start.toLocaleDateString("fr-FR", { month: "long" })} au ${end.toLocaleDateString("fr-FR", options)}`;
    } else {
      return `Du ${start.toLocaleDateString("fr-FR", options)} au ${end.toLocaleDateString("fr-FR", options)}`;
    }
  };

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
        {prevEditions?.map((edition, index) => (
          <SwiperSlide key={index}>
            <FestivalCardCarousel
              // key={cards[activeIndex % cards.length].}
              date={formatDateRange(edition.start_date, edition.end_date)}
              description={edition.card_description_en || edition.card_description_fr}
              titre={edition.titre}
              lieu={edition.place_en || edition.place_fr} 
              slug={edition.slug}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full h-full top-0 z-10 absolute flex items-center justify-between pointer-events-none">
        <div className="past-edit-swiper-prev ml-[-50px] flex justify-center items-center"><div className="rotate-180"><ArrowRightIcon /></div></div>
        <div className="past-edit-swiper-next mr-[-50px] flex justify-center items-center"><ArrowRightIcon /></div>
      </div>

    </div>
  );
};

export default PastEditionsCarousel;
