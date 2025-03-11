import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderSection from "./HeaderSection";
import Calendar from "@/assets/icons/Calendar.svg";

export default function RecentArticle() {
  const [news, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("/api/recent-news")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recent news:", error);
      });
  }, []);

  if (news.length === 0) {
    return <p className="text-center text-gray-500">Chargement des articles...</p>;
  }

  return (
    <div>
      <HeaderSection headerName="Articles Récents" />

      <div className="flex justify-between flex-col sm:flex-row w-full gap-1 h-fit mt-10 font-['Montserrat']">
        {/* First Article - Large Featured Article */}
        <div className="relative text-start sm:w-[52.67%] sm:h-[560px] h-[416px]">
          <img
            className="w-full h-full object-cover rounded-xl"
            src={`${process.env.GATSBY_API_URL}${news[0]?.image}`}
            alt={news[0]?.title_en || news[0]?.title_fr}
          />

          <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 rounded-xl"></div>

          <div className="absolute left-[30px] bottom-[30px] right-[60px] sm:left-[40px] text-white max-w-3xl flex flex-col gap-5 sm:gap-5">
            {news.themes?.map((item: any) =>

              <button
                type="submit"
                className="rounded-[3px] bg-white/30 text-white font-semibold py-2 w-fit px-3 text-sm"
              >
                {item?.name_en || item?.name_fr}
              </button>
            )}
            <div className="sm:leading-[35.84px] leading-[35.84px] font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-base font-['Montserrat']">
              {news[0]?.title_en || news[0]?.title_fr}
            </div>

            <div className="flex gap-2 text-white">
              <img src={Calendar} className="size-6" alt="calendar" />
              <span className="uppercase font-light text-sm">
                {new Date(news[0]?.created_at).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Remaining 3 Articles */}
        <div className="flex flex-col gap-4 items-center justify-between w-full sm:w-[45.67%] h-[560px] mt-10 sm:mt-0">
          {news.slice(1, 4).map((article, index) => (
            <div
              key={index}
              className="flex items-center overflow-hidden h-1/3 w-full justify-center"
            >
              <div className="flex flex-col py-2 sm:p-3 flex-grow text-start gap-2 sm:h-fit h-full justify-between">
              {article.themes?.map((item: any) => 
                <button
                type="submit"
                className="rounded-lg bg-[#0270A0] text-white font-normal py-1 px-3 text-sm w-fit"
                >
     {item?.name_en || item?.name_fr}
                </button>
                )}
                <div className="font-semibold mt-2 text-gray-800 sm:text-base text-base">
                  {article.title_en || article.title_fr}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                  <img src={Calendar} className="size-6" alt="calendar" />
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
                className="object-cover rounded-xl max-w-[46%] sm:max-w-[37.67%] h-full"
                alt={article.title_en || article.title_fr}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
