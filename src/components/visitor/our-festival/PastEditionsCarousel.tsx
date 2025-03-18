import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import FestivalCardCarousel from "./FestivalCardCarousel";

const PastEditionsCarousel = ({ prevEditions }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

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

  // On met à jour Swiper après son montage
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [swiperRef.current]);

  return (
    <div className="w-full max-w-full sm:max-w-[1202px] mx-auto">
      <div className="relative">
        <Swiper
          modules={[Navigation, Thumbs]}
          loop={true}
          spaceBetween={10}
          observer={true}
          observeParents={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
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

        {/* Boutons de navigation pour desktop en overlay */}
        <div className="hidden sm:flex absolute top-0 left-0 w-full h-full z-10 items-center justify-between pointer-events-none">
          <button
            className="pointer-events-auto ml-[-50px]"
            onClick={() => swiperRef.current && swiperRef.current.slidePrev()}
          >
            <div className="rotate-180">
              <ArrowRightIcon />
            </div>
          </button>
          <button
            className="pointer-events-auto mr-[-50px]"
            onClick={() => swiperRef.current && swiperRef.current.slideNext()}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      {/* Navigation mobile avec indicateurs entre les boutons */}
      <div className="flex sm:hidden justify-center mt-8 items-center gap-x-16">
        <button
          className="pointer-events-auto"
          onClick={() => swiperRef.current && swiperRef.current.slidePrev()}
        >
          <div className="rotate-180">
            <ArrowRightIcon />
          </div>
        </button>

        {/* Indicateurs mobile */}
        <div className="flex gap-3 px-3 py-2 rounded-xl">
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

        <button
          className="pointer-events-auto"
          onClick={() => swiperRef.current && swiperRef.current.slideNext()}
        >
          <ArrowRightIcon />
        </button>
      </div>

      {/* Indicateurs sous la carte pour desktop */}
      <div className="hidden sm:flex justify-center mt-6">
        <div className="flex gap-3 px-3 py-2 rounded-xl ">
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
