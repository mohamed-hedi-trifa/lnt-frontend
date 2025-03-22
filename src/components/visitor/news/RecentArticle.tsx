import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderSection from "./HeaderSection";
import Calendar from "@/assets/icons/Calendar";

export default function RecentArticle() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("/api/recent-news")
      .then(response => setArticles(response.data))
      .catch(error => console.error("Error fetching recent news:", error));
  }, []);

  if (articles.length === 0) {
    return <p className="text-center text-gray-500">Chargement des articles...</p>;
  }

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1, 4);

  return (
    <div className="px-5">
      <HeaderSection headerName="Articles Récents" />

      <div className="flex flex-col sm:flex-row justify-between gap-1 mt-10 font-montserrat">
        {/* Article en vedette */}
        <div className="relative sm:w-[52.67%] w-full h-[416px] sm:h-[560px]">
          <img
            className="w-full h-full object-cover rounded-xl"
            src={`${process.env.GATSBY_API_URL}${featuredArticle?.image}`}
            alt={featuredArticle?.title_en || featuredArticle?.title_fr}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl" />
          <div className="absolute left-8 sm:left-10 bottom-8 sm:bottom-10 text-white max-w-3xl flex flex-col gap-5">
            {featuredArticle?.themes?.map((theme, idx) => (
              <button
                key={idx}
                type="button"
                className="rounded bg-white/30 text-white font-semibold py-2 px-3 text-sm"
              >
                {theme?.name_en || theme?.name_fr}
              </button>
            ))}
            <div className="text-base font-extrabold drop-shadow text-white">
              {featuredArticle?.title_en || featuredArticle?.title_fr}
            </div>
            <div className="flex items-center gap-2">
              <img src={Calendar} alt="calendar" className="w-6 h-6" />
              <span className="uppercase font-light text-sm">
                {new Date(featuredArticle?.created_at).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Autres articles */}
        <div className="flex flex-col sm:w-[45.67%] w-full gap-4 mt-10 sm:mt-0">
          {otherArticles.map((article, index) => (
            <div key={article.id || index} className="flex items-center justify-center overflow-hidden h-1/3 gap-2">
              <div className="flex flex-col flex-grow py-2 sm:p-3 gap-2 justify-between text-start">
                {article.themes?.map((theme, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="rounded-lg bg-[#0270A0] text-white font-normal py-1 px-3 text-sm w-fit"
                  >
                    {theme?.name_en || theme?.name_fr}
                  </button>
                ))}
                <div className="text-gray-800 font-semibold mt-2 text-base">
                  {article.title_en || article.title_fr}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                  <img src={Calendar} alt="calendar" className="w-6 h-6" />
                  <span>
                    {new Date(article.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <img
                src={`${process.env.GATSBY_API_URL}${article.image}`}
                className="object-cover rounded-xl max-w-[46%] sm:w-40 sm:h-40 h-full"
                alt={article.title_en || article.title_fr}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
