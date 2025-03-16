import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import FestivalCardCarousel from "./FestivalCardCarousel";

const PastEditionsCarousel = ({ prevEditions }: { prevEditions: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

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
    <div className="w-full max-w-full sm:max-w-[1202px] mx-auto relative min-h-full">
      {/* Swiper principal */}
      <Swiper
        modules={[Navigation, Thumbs]}
        loop={true}
        spaceBetween={10}
        navigation={{
          nextEl: ".past-edit-swiper-next",
          prevEl: ".past-edit-swiper-prev"
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="rounded-xl shadow-helmi"
      >
        {prevEditions?.map((edition, index) => (
          <SwiperSlide key={index}>
            <FestivalCardCarousel
              date={formatDateRange(edition.start_date, edition.end_date)}
              description={edition.card_description_en || edition.card_description_fr}
              titre={edition.name_en || edition.name_fr}
              lieu={edition.place_en || edition.place_fr} 
              slug={edition.slug}
              image={edition.image}
              year={edition.year}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Boutons de navigation */}
      <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-between pointer-events-none">
        <button className="past-edit-swiper-prev ml-[-50px] pointer-events-auto">
          <div className="rotate-180">
            <ArrowRightIcon />
          </div>
        </button>
        <button className="past-edit-swiper-next mr-[-50px] pointer-events-auto">
          <ArrowRightIcon />
        </button>
      </div>

      {/* Indicateurs centrés */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex gap-3 px-3 py-2 rounded-xl bg-white bg-opacity-80 shadow-helmi">
          {prevEditions?.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ease-in-out ${
                index === activeIndex
                  ? "bg-[#0270A0] scale-125 opacity-100 shadow-lg"
                  : "bg-black/60 scale-100 opacity-60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastEditionsCarousel;
