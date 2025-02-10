import React from 'react';


export default function NewsCard({ image, slug, category, title, date }: { image: string, slug: string, category: string, title: string, date: string }) {
 
    return (
        <>
            {/* Mobile View */}
     
         
            <div className='flex sm:hidden flex-col bg-white shadow-xl gap-4 items-start rounded-2xl min-h-[432px]'>
                <div className='flex flex-col justify-start items-start gap-3'>
                    <div className='px-2 pt-4'>
                        <img className="w-full h-[250px] object-cover rounded-xl" src={image} alt={title} />
                    </div>
                    <div className='flex flex-col gap-3 px-5 pt-5'>
                        <button className="rounded-lg bg-[#F6F8FF] text-[#006E9F] font-normal py-1 px-2 text-xs w-fit">
                            {category}
                        </button>
                        <div className="text-sm leading-6 font-bold drop-shadow-md text-start">
                            {title}
                        </div>
                    </div>
                </div>
                <span className="uppercase font-light text-sm px-5 py-5">{date}</span>
            </div>
       
            {/* Larger Screens */}
            <div className='hidden sm:flex flex-col bg-white shadow-xl px-5 py-5 gap-4 items-start'>
                <div className='flex flex-col justify-start items-start gap-3'>
                    <img className="w-full h-[250px] object-cover rounded-xl" src={image} alt={title} />
                    <button className="rounded-lg bg-blue-700/20 text-blue-700 font-light py-1 px-2 text-xs w-fit">
                        {category}
                    </button>
                    <div className="text-sm leading-6 font-bold drop-shadow-md text-start">
                        {title}
                    </div>
                </div>
                <span className="uppercase font-light text-sm">{date}</span>
            </div>
        </>
    );
}

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={20} height={20}>
        <path d="M152 64c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16V16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v48zm192 0c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16V16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v48zM0 128c0-35.3 28.7-64 64-64h32v16c0 26.5 21.5 48 48 48h16c26.5 0 48-21.5 48-48V64h128v16c0 26.5 21.5 48 48 48h16c26.5 0 48-21.5 48-48V64h32c35.3 0 64 28.7 64 64v336c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm48 80v256c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V208H48z"></path>
    </svg>
);

