import React from 'react'
import HeaderSection from './HeaderSection'
import recentArticle1 from '../../../assets/images/recentArticle1.jpg'
import NewsCard from './NewsCard';

export default function PopularNews() {
    const newsData = [
        { image: recentArticle1, category: "Initiative scientifique", title: "Lancement d'une initiative scientifique pour protéger les tortues marines à Kerkennah", date: "LE 4 OCTOBRE 2024" },
        { image: recentArticle1, category: "Initiative scientifique", title: "Lancement d'une initiative scientifique pour protéger les tortues marines à Kerkennah", date: "LE 4 OCTOBRE 2024" },
        { image: recentArticle1, category: "Initiative scientifique", title: "Lancement d'une initiative scientifique pour protéger les tortues marines à Kerkennah", date: "LE 4 OCTOBRE 2024" },
        { image: recentArticle1, category: "Initiative scientifique", title: "Lancement d'une initiative scientifique pour protéger les tortues marines à Kerkennah", date: "LE 4 OCTOBRE 2024" },
        { image: recentArticle1, category: "Initiative scientifique", title: "Lancement d'une initiative scientifique pour protéger les tortues marines à Kerkennah", date: "LE 4 OCTOBRE 2024" },
    ];

    return (
        <div className='mt-10'>
            <HeaderSection headerName="Nos Actualités Populaires" />
            <div className='flex flex-col mt-10 gap-4'>
                <div className="grid grid-cols-2 gap-2 h-[300px]">
                    {newsData.slice(0, 2).map((news, index) => (
                        <div className="relative text-start w-full">
                            <img className="w-full h-full object-cover rounded-xl" src={news.image} alt="News" />
                            <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 rounded-xl"></div>
                            <div className="absolute left-[30px] bottom-[20px] right-[60px]  text-white flex flex-col gap-1 sm:gap-4">
                                <button type="button" className="rounded-lg bg-black/20 text-white font-semibold py-2 w-fit px-3 text-sm">
                                    {news.category}
                                </button>
                                <div className="sm:text-sm sm:leading-6 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                    {news.title}
                                </div>
                                <div className="flex gap-2 text-white  items-center">
                                    <CalendarIcon />
                                    <span className="uppercase font-light text-sm">{news.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-2 h-[250px]">
                    {newsData.slice(2).map((news, index) => (
                        <div className="relative text-start w-full">
                            <img className="w-full h-full object-cover rounded-xl" src={news.image} alt="News" />
                            <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 rounded-xl"></div>
                            <div className="absolute left-[20px] bottom-[10px] text-white flex flex-col gap-1">
                                <button type="button" className="rounded-lg bg-black/20 text-white font-semibold w-fit px-2 text-xs py-1">
                                    {news.category}
                                </button>
                                <div className="text-xs leading-5 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                    overflow-hidden text-ellipsis whitespace-normal break-words max-w-full">
                                    {news.title}
                                </div>
                                <div className="flex gap-3 text-white items-center">
                                    <CalendarIcon width={10} height={10} /> 
                                    <span className="uppercase font-light text-[10px]">{news.date}</span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) 
}

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={20} height={20}>
        <path d="M152 64c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16V16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v48zm192 0c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16V16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v48zM0 128c0-35.3 28.7-64 64-64h32v16c0 26.5 21.5 48 48 48h16c26.5 0 48-21.5 48-48V64h128v16c0 26.5 21.5 48 48 48h16c26.5 0 48-21.5 48-48V64h32c35.3 0 64 28.7 64 64v336c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm48 80v256c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V208H48z"></path>
    </svg>
);