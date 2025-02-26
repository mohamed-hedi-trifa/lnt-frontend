import React, { useState } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


import recentArticle1 from '../../../assets/images/recentArticle1.jpg';
import recentArticle2 from '../../../assets/images/recentArticle2.jpg';
import recentArticle3 from '../../../assets/images/eventImage3.jpg';
import recentArticle4 from '../../../assets/images/eventImage4.jpg';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";



import PreviousIcon from '@/assets/icons/PreviousIcon';
import NextIcon from '@/assets/icons/NextIcon';
import TitleSectionEvent from './TitleSectionEvent';
import CulturalEventsCard from './CulturalEventsCard';

export default function CulturalEvents() {
  const newsData = [
    { image: recentArticle1, title: "Festival de la Musique Traditionnelle", date: "LE 4 OCTOBRE 2024", location: "Parc Culturel, Kraten" },
    { image: recentArticle2, title: "Exposition d'Artisanat Local", date: "LE 5 OCTOBRE 2024", location: "Musée Abbassia, Kerkennah" },
    { image: recentArticle3, title: "Festival de la Musique Traditionnelle", date: "LE 6 OCTOBRE 2024", location: "Parc Culturel, Kraten" },
    { image: recentArticle4, title: "Projection de Film Documentaire", date: "LE 7 OCTOBRE 2024", location: "Parc Culturel, Kraten" },
    { image: recentArticle2, title: " Soirée Live avec Seven Skies Band", date: "LE 8 OCTOBRE 2024", location: "Maison des jeunes, Kraten" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + newsData.length) % newsData.length);
  };
  return (
    <div className='mt-10'>
      <TitleSectionEvent headerName="Événements culturels" showButton={true} />
      <div className=' flex-col mt-10 gap-4 hidden sm:flex'>
        <div className="grid grid-cols-3 gap-2 h-[250px]">
          {newsData.slice(2).map((news, index) => (
            <div className="relative text-start w-full">
              <img className="w-full h-full object-cover rounded-md" src={news.image} alt="News" />
              <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 rounded-md"></div>
              <div className="absolute left-[35px] bottom-[40px] right-[60px]  sm:left-[20px] text-white max-w-3xl flex flex-col gap-3 sm:gap-3">

                <div className="font-bold text-base">{news.title}</div>

                <div className="flex gap-2 text-white items-center">
                  <img src="/carousel_images/whiteCalendar.svg" className='size-4 ' />
                  <span className="uppercase font-light text-[10px]">{news.date}</span>
                </div>

                <div className="flex gap-2 text-white items-center">
                  <img src="/carousel_images/whiteCalendar.svg" className='size-4 ' />
                  <span className="uppercase font-light text-[10px]">{news.location}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 h-[300px]">
          {newsData.slice(3, 5).map((news, index) => (
            <div className="relative text-start w-full">
              <img className="w-full h-full object-cover rounded-md" src={news.image} alt="News" />
              <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 rounded-md"></div>
              <div className="absolute left-[30px] bottom-[60px] right-[60px]  sm:left-[40px] text-white max-w-6xl flex flex-col gap-5 sm:gap-3">

                <div className="font-bold text-lg">{news.title}</div>

                <div className="flex gap-2 text-white">
                  <img src="/carousel_images/whiteCalendar.svg" className='size-5 ' />
                  <span className="uppercase font-light text-sm">{news.date}</span>
                </div>

                <div className="flex gap-2 text-white">
                  <img src="/carousel_images/whiteCalendar.svg" className='size-5 ' />
                  <span className="uppercase font-light text-sm">{news.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <div className='block mt-10 sm:hidden relative px-[50px] '>
        <Swiper
          modules={[Navigation, Thumbs]}
          loop={true}
          spaceBetween={10}
          navigation={{
            nextEl: ".swiper-nexxt",
            prevEl: ".swiper-previous"
          }}
          thumbs={{ swiper: thumbsSwiper }}
          className="shadow-lg"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {newsData.map((news, index) => (
            <SwiperSlide key={index}>
              <CulturalEventsCard
                image={news.image}
                category={news.title}
                title={news.title}
                date={news.date}
              />
            </SwiperSlide>
          ))}



        </Swiper>
        <div className="swiper-previous absolute left-[-2px] top-1/2 -translate-y-1/2  " onClick={prevSlide} >
            <PreviousIcon />
          </div>
          <div className="swiper-nexxt absolute right-[-2px] top-1/2 -translate-y-1/2" onClick={nextSlide}>
            <NextIcon />
          </div>

        {/* Pagination centered above the swiper */}
        <div className="absolute top-[106%] left-1/2 -translate-x-1/2 flex sm:gap-5 gap-3 bg-black/50 w-fit sm:px-3 px-2 sm:py-2 py-1 rounded-xl mb-5 z-20">

          {newsData.map((_, idx) => (
            <div
              key={idx}
              className={`sm:w-3 w-3 sm:h-3 h-3 rounded-full transition-all duration-500 ease-in-out
          ${idx === activeIndex ? "bg-[#0270A0] scale-125 opacity-100 shadow-lg" : "bg-white/50 scale-100 opacity-60"}`}
            ></div>
          ))}
        </div>
      </div>



    </div>
  );
}





