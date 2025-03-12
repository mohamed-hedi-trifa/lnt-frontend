import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderSection from "./HeaderSection";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import PopularNewsCard from "./PopularNewsCard";

export default function PopularNews() {
    const [news, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios
            .get("/api/popular-news")
            .then((response) => {
                setArticles(response.data);
            })
            .catch((error) => {
                console.error("Error fetching recent news:", error);
            });
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
    };

    if (news.length === 0) {
        return <p className="text-center text-gray-500">Chargement des articles...</p>;
    }

    return (
        <div className="mt-10">
            <div className="px-5">
                <HeaderSection headerName="Nos Actualités Populaires" />
            </div>
            {/* Large Section */}
            {/* <div className="flex-col mt-10 gap-4 hidden sm:flex">
            
                <div className="grid grid-cols-2 gap-2 h-[300px]">
                    {news.slice(0, 2).map((article, index) => (
                        <div key={index} className="relative text-start w-full">
                            <img
                                className="w-full h-full object-cover rounded-xl"
                                src={`${process.env.GATSBY_API_URL}${article.image}`}
                                alt={article.title_en || article.title_fr}
                            />
                            <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 rounded-xl"></div>
                            <div className="absolute left-[30px] bottom-[20px] right-[60px] text-white flex flex-col gap-1 sm:gap-4">

                                {article.themes?.map((item: any) =>
                                    <button
                                        key={index}
                                        type="button"
                                        className="rounded-[3px] bg-white/30 text-white font-semibold py-2 w-fit px-3 text-sm"
                                    >
                                        {item?.name_en || item?.name_fr}
                                    </button>
                                )}
                                <div className="sm:text-sm sm:leading-6 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                    {article.title_en || article.title_fr}
                                </div>
                                <div className="flex gap-2 text-white items-center">
                                    <CalendarIcon />
                                    <span className="uppercase font-light text-sm">
                                        {new Date(article.created_at).toLocaleDateString("fr-FR", {
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


                <div className="grid grid-cols-3 gap-2 h-[250px]">
                    {news.slice(2, 3).map((article, index) => (
                        <div key={index} className="relative text-start w-full">
                            <img
                                className="w-full h-full object-cover rounded-xl"
                                src={`${process.env.GATSBY_API_URL}${article.image}`}
                                alt={article.title_en || article.title_fr}
                            />
                            <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 rounded-xl"></div>
                            <div className="absolute left-[20px] bottom-[10px] text-white flex flex-col gap-1">
                                {article.themes?.map((item: any) =>
                                    <button
                                        key={index}
                                        type="button"
                                        className="rounded-[3px] bg-white/30 text-white font-semibold w-fit px-2 text-xs py-1"
                                    >
                                        {item?.name_en || item?.name_fr}
                                    </button>
                                )}
                                <div className="text-xs leading-5 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] overflow-hidden text-ellipsis whitespace-normal break-words max-w-full">
                                    {article.title_en || article.title_fr}
                                </div>
                                <div className="flex gap-3 text-white items-center">
                                    <CalendarIcon width={10} height={10} />
                                    <span className="uppercase font-light text-[10px]">
                                        {new Date(article.created_at).toLocaleDateString("fr-FR", {
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
            </div> */}
            <div className="w-[890.04px] inline-flex flex-col justify-start items-start gap-[30px] mt-5 ">

                <div className="self-stretch  inline-flex justify-start items-end gap-2.5 flex-wrap content-end">
                    {news.slice(0, 2).map((article, index) => (
                        <div className="w-[440.02px] h-[300px] relative">
                            <div className="w-[440.02px] h-[300px] left-0 top-0 absolute rounded-xl overflow-hidden">
                                <div className="w-[440.02px] h-[300px] left-0 top-0 absolute">
                                    <img className="w-[440.02px] h-[300px] left-0 top-0 absolute"
                                        src={`${process.env.GATSBY_API_URL}${article.image}`}
                                        alt={article.title_en || article.title_fr}
                                    />
                                </div>
                                <div className="w-[440.02px] h-[300px] left-0 top-0 absolute bg-gradient-to-l from-black/90 to-black/20"></div>
                            </div>
                            <div className="w-[365.75px] left-[30px] top-[126px] absolute inline-flex flex-col justify-start items-start gap-3.5">
                                <div className="flex gap-4">

                                    {article.themes?.map((item: any) =>

                                        <div className="px-2.5 py-1 bg-white/30 rounded-[3px] inline-flex justify-center items-center gap-2.5">
                                            <div className="justify-center text-white text-sm font-semibold font-['Montserrat'] leading-tight">
                                                {item?.name_en || item?.name_fr}
                                            </div>
                                        </div>

                                    )}
                                </div>

                                <div className="self-stretch h-[72px] relative">
                                    <div className="w-[378px] h-[72px] left-0 top-0 text-start absolute justify-center text-white text-lg font-bold font-['Montserrat'] capitalize leading-relaxed">
                                        {article.title_en || article.title_fr}
                                    </div>
                                </div>
                                <div className="inline-flex justify-start items-center gap-[15px]">
                                    <div className="w-[143.20px] h-4 relative">
                                        <div className="w-[16.53px] h-4 left-0 top-0 absolute overflow-hidden">
                                            <div className="w-4 h-4 left-[0.27px] top-0 absolute bg-[#bacce1]"></div>
                                        </div>
                                        <div className="w-[147px] h-4 left-[22px] top-0 absolute justify-center text-[#bacce1] text-[13px] font-semibold font-['Montserrat'] uppercase tracking-wide">
                                            Le {new Date(article.created_at).toLocaleDateString("fr-FR", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {news.slice(2, 3).map((article, index) => (
                        <div className="w-[290px] h-[300px] p-[30px] relative shadow-[0px_-0.27000001072883606px_2.75px_0px_rgba(0,0,0,0.02)] shadow-[0px_-0.6899999976158142px_6.949999809265137px_0px_rgba(0,0,0,0.03)] shadow-[0px_-1.4199999570846558px_14.180000305175781px_0px_rgba(0,0,0,0.04)] shadow-[0px_-2.9200000762939453px_29.200000762939453px_0px_rgba(0,0,0,0.05)] shadow-[0px_-8px_80px_0px_rgba(0,0,0,0.07)] flex justify-center items-end gap-2.5">
                            <div className="w-[290px] h-[300px] left-0 top-0 absolute rounded-xl overflow-hidden">
                                <div className="w-[290px] h-[300px] left-0 top-0 absolute">
                                    <img className="w-[290px] h-[300px] left-0 top-0 absolute"
                                        src={`${process.env.GATSBY_API_URL}${article.image}`}
                                        alt={article.title_en || article.title_fr}
                                    />
                                </div>
                                <div className="w-[290px] h-[300px] left-0 top-0 absolute bg-gradient-to-l from-black/90 to-black/20"></div>
                            </div>
                            <div className="inline-flex flex-col justify-start items-start gap-2.5">
                                <div className="flex gap-4">

                                    {article.themes?.map((item: any) =>

                                        <div className="px-2.5 py-1 bg-white/30 rounded-[3px] inline-flex justify-center items-center gap-2.5">
                                            <div className="justify-center text-white text-sm font-semibold font-['Montserrat'] leading-tight">
                                                {item?.name_en || item?.name_fr}
                                            </div>
                                        </div>

                                    )}
                                </div>
                                <div className="py-px inline-flex justify-center items-center gap-2.5">
                                    <div className="w-60 justify-center text-white text-lg font-bold font-['Montserrat'] capitalize leading-relaxed">
                                        {article.title_en || article.title_fr}
                                    </div>
                                </div>
                                <div className="w-[143.20px] h-4 relative">
                                    <div className="w-[16.53px] h-4 left-0 top-0 absolute overflow-hidden">
                                        <div className="w-4 h-4 left-[0.27px] top-0 absolute bg-[#bacce1]"></div>
                                    </div>
                                    <div className="w-[131px] h-4 left-[22px] top-0 absolute justify-center text-[#bacce1] text-[13px] font-semibold font-['Montserrat'] uppercase tracking-wide">
                                        Le {new Date(article.created_at).toLocaleDateString("fr-FR", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Mobile Section */}
            <div className="block mt-10 px-2 sm:hidden ">
                <div className="flex justify-between items-center gap-3">
                    <button onClick={prevSlide}>
                        <ChevronLeftIcon className="text-[#3E3232] w-[40px] cursor-pointer" />
                    </button>
                    <PopularNewsCard
                        article={news[currentIndex]}

                    />
                    <button onClick={nextSlide}>
                        <ChevronRightIcon className="text-[#3E3232] w-[40px] cursor-pointer" />
                    </button>
                </div>
                <div className="flex w-full justify-center mt-5 gap-3">
                    {news.map((_, index) => (
                        <div
                            key={index}
                            className={`rounded-full w-3 h-3 ${index === currentIndex ? "bg-[#0270A0]" : "bg-black/30"
                                }`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
        width={20}
        height={20}
    >
        <path d="M152 64c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16V16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v48zm192 0c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16V16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v48zM0 128c0-35.3 28.7-64 64-64h32v16c0 26.5 21.5 48 48 48h16c26.5 0 48-21.5 48-48V64h128v16c0 26.5 21.5 48 48 48h16c26.5 0 48-21.5 48-48V64h32c35.3 0 64 28.7 64 64v336c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm48 80v256c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V208H48z"></path>
    </svg>
);