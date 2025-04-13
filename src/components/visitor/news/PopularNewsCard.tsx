
import Calendar from '@/assets/icons/Calendar';
import React from 'react'

export default function PopularNewsCard({ article }: { article: any }) {
    return (
        <div>
            <div className="relative text-start  w-full h-[300px] bg-gradient-to-l from-black/90 to-black/20 rounded-xl">
                <img className="w-[290px] h-[300px] bg-gradient-to-l from-black/90 to-black/20 rounded-xl"
                    src={`${process.env.GATSBY_API_URL}${article.image}`}
                    alt={article.title_en || article.title_fr} />
                <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 rounded-xl"></div>
                <div className="absolute left-[30px] bottom-[20px] right-[60px]  text-white flex flex-col gap-3 sm:gap-4">
                    <div className="flex gap-2 flex-wrap">

                    {article.themes?.map((item: any) =>
                        <div className="px-2.5 py-1 bg-white/30 rounded-[3px] inline-flex justify-center items-center gap-2.5">
                            <div className="justify-center text-white text-sm font-semibold font-['Montserrat'] leading-tight">
                                {item?.name_en || item?.name_fr}
                            </div>
                        </div>
                    )}

                    </div>
                    <div className="sm:text-sm sm:leading-6 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        {article.card_description_en || article.card_description_fr}
                    </div>
                    <div className="flex gap-2 text-white  items-center">
   <Calendar/>
                        <span className="uppercase font-light text-xs">
                            {new Date(article.created_at).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>
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
