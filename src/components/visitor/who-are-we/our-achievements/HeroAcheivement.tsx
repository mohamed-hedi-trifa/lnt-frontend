import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Link } from "gatsby"; 

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type Achievement = {
  id: number;
  slug: string;
  date: string;
  image: string;
  title_fr?: string;
  title_en?: string;
  themes?: Array<{
    id: number;
    name_fr?: string;
    name_en?: string;
  }>;
};

function formatDate(dateString: string, language: "fr" | "en" = "fr") {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const locale = language === "fr" ? "fr-FR" : "en-US";
  return date.toLocaleDateString(locale, options);
}

function getThemeLabels(
  themes?: Array<{ id: number; name_fr?: string; name_en?: string }>,
  language: "fr" | "en" = "fr"
) {
  if (!themes) return "";
  return themes
    .map((t) => (language === "fr" ? t.name_fr : t.name_en) || t.name_fr || t.name_en)
    .filter(Boolean)
    .join(" • ");
}

interface HeroAcheivementProps {
  achievements?: Achievement[];
  language?: "fr" | "en";
}

export default function HeroAcheivement({
  achievements,
  language = "fr",
}: HeroAcheivementProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [achievementsData, setAchievementsData] = useState<Achievement[]>([]);
  
  useEffect(() => {
    if (achievements && achievements.length > 0) {
      setAchievementsData(achievements.slice(0, 4));
    } else {
      axios
        .get<Achievement[]>("/api/achievements")
        .then((res) => {
          const data = res.data || [];
          data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setAchievementsData(data.slice(0, 4));
        })
        .catch((err) => {
          console.error("Erreur fetch achievements:", err);
        });
    }
  }, [achievements]);

  if (achievementsData.length === 0) {
    return (
      <div className="w-full h-[412px] sm:h-[607px] bg-gray-200 flex items-center justify-center">
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation, Thumbs]}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-nexxt",
          prevEl: ".swiper-previous",
        }}
        thumbs={{ swiper: thumbsSwiper }}
        className="shadow-lg"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {achievementsData.map((achievement, index) => {
          const themeStr = getThemeLabels(achievement.themes, language);
          const dateFormatted = formatDate(achievement.date, language);

          return (
            <SwiperSlide
              key={achievement.id}
              className="relative text-start h-[412px] sm:h-[607px] bg-cover bg-center transition-all duration-500 ease-in-out w-full"
            >
              {/* Image de fond */}
              <img
                src={`${process.env.GATSBY_API_URL ?? ""}${achievement.image}`}
                alt={achievement.title_fr || achievement.title_en || "Achievement"}
                className="w-full absolute h-full top-0 left-0 object-cover"
              />

              {/* Overlay sombre */}
              <div className="absolute inset-0 bg-[rgba(0,0,128,0.2)]"></div>

              {/* Carte "cliquable" menant à la page d'un Achievement */}
              <Link
                to={`/who-are-we/our-achievements/${achievement.slug}`}
                className="flex flex-col items-center sm:gap-10 gap-3 absolute bottom-[44px] left-1/2 transform -translate-x-1/2 text-white text-lg w-full sm:w-auto py-4 px-10 sm:p-12 bg-[rgba(0,0,0,0.8)] rounded-xl sm:mb-20 mb-5 shadow-helmi"
              >
                {/* Titre */}
                <div className="sm:text-3xl text-base text-center font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  {achievement.title_fr || achievement.title_en}
                </div>

                {/* Thèmes */}
                {themeStr && (
                  <div className="font-medium sm:text-lg text-sm">
                    {themeStr}
                  </div>
                )}

                {/* Date */}
                <div className="font-medium sm:text-lg text-sm drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  {dateFormatted}
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Cercles d'indicateurs */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex sm:gap-5 gap-3 bg-black/50 w-fit sm:px-3 px-2 sm:py-2 py-1 rounded-xl">
          {achievementsData.map((_, idx) => (
            <div
              key={idx}
              className={`sm:w-3 w-3 sm:h-3 h-3 rounded-full transition-all duration-500 ease-in-out
                ${
                  idx === activeIndex
                    ? "bg-[#0270A0] scale-125 opacity-100 shadow-lg"
                    : "bg-white/50 scale-100 opacity-60"
                }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Flèches de navigation gauche/droite */}
      <div className="w-full h-full top-0 z-10 absolute flex items-center justify-between pointer-events-none">
        <button className="swiper-previous absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#0270A0] bg-opacity-70 sm:py-14 px-2 py-8 rounded-r-xl hover:bg-opacity-90 transition duration-300 pointer-events-auto">
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>

        <button className="swiper-nexxt absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#0270A0] bg-opacity-70 sm:py-14 px-2 py-8 rounded-l-xl hover:bg-opacity-90 transition duration-300 pointer-events-auto">
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
