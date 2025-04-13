import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderSection from "./HeaderSection";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import PopularNewsCard from "./PopularNewsCard";
import Calendar from "@/assets/icons/Calendar";

export default function PopularNews() {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get("/api/popular-news")
      .then(response => setArticles(response.data))
      .catch(error => console.error("Error fetching popular news:", error));
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + articles.length) % articles.length);
  };

  if (articles.length === 0) {
    return <p className="text-center text-gray-500">Chargement des articles...</p>;
  }

  return (
    <div className="mt-10">
      <div className="px-5">
        <HeaderSection headerName="Nos Actualités Populaires" />
      </div>

      {/* Version Desktop */}
      <div className="w-[890px] mx-auto mt-5 hidden sm:flex flex-col gap-8">
        <div className="flex gap-8 flex-col">
          <div className="flex w-full gap-4">


            {articles.slice(0, 2).map((article, index) => (
              <div key={article.id || index} className="relative w-full h-[300px]">
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <img
                    src={`${process.env.GATSBY_API_URL}${article.image}`}
                    alt={article.title_en || article.title_fr}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/90 to-black/20" />
                </div>
                <div className="absolute left-8 bottom-8  text-white">
                  <div className="flex gap-4 mb-2">
                    {article.themes?.slice(0, 2).map((theme, idx) => (
                      <div key={idx} className="px-2.5 py-1 bg-white/30 rounded inline-flex items-center">
                        <span className="text-sm font-semibold">
                          {theme?.name_en || theme?.name_fr}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-lg font-bold capitalize mb-2">
                    {article.card_description_en || article.card_description_fr}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                  <Calendar/>
                    <span className="font-semibold">
                      Le {new Date(article.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full gap-4">
            {articles.slice(2, 5).map((article, index) => (
              <div key={article.id || index} className="relative w-[290px] h-[300px] p-8 shadow-lg flex items-end">
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <img
                    src={`${process.env.GATSBY_API_URL}${article.image}`}
                    alt={article.title_en || article.title_fr}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/90 to-black/20" />
                </div>
                <div className="relative z-10 flex flex-col gap-2 text-white">
                  <div className="flex gap-4">
                    {article.themes?.slice(0, 2).map((theme, idx) => (
                      <div key={idx} className="px-2.5 py-1 bg-white/30 rounded inline-flex items-center">
                        <span className="text-sm font-semibold">
                          {theme?.name_en || theme?.name_fr}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-lg font-bold capitalize">
                    {article.card_description_en || article.card_description_fr}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar/>
                    <span className="font-semibold">
                      Le {new Date(article.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Version Mobile */}
      <div className="block sm:hidden mt-10 px-2">
        <div className="flex justify-between items-center gap-3">
          <button onClick={prevSlide}>
            <ChevronLeftIcon className="text-[#3E3232] w-10 cursor-pointer" />
          </button>
          <PopularNewsCard article={articles[currentIndex]} />
          <button onClick={nextSlide}>
            <ChevronRightIcon className="text-[#3E3232] w-10 cursor-pointer" />
          </button>
        </div>
        <div className="flex justify-center mt-5 gap-3">
          {articles.map((_, index) => (
            <div
              key={index}
              className={`rounded-full w-3 h-3 ${index === currentIndex ? "bg-[#0270A0]" : "bg-black/30"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
