
import React from 'react'

export default function PopularNewsCard({image, category, title, date}: { image: string, category: string, title: string, date: string }) {
  return (
    <div>
       <div className="relative text-start  w-full min-h-[300px] ">
                            <img className="w-full h-full object-cover min-h-[300px] rounded-xl" src={image} alt="News" />
                            <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 rounded-xl"></div>
                            <div className="absolute left-[30px] bottom-[20px] right-[60px]  text-white flex flex-col gap-3 sm:gap-4">
                                <button type="button" className="rounded-[3px] bg-white/30 text-white font-semibold py-1 w-fit px-2 text-sm">
                                {category}
                                </button>
                                <div className="sm:text-sm sm:leading-6 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                {title}
                                </div>
                                <div className="flex gap-2 text-white  items-center">
                                    <CalendarIcon />
                                    <span className="uppercase font-light text-xs">{date}</span>
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
