import React from 'react'



export default function NewsImage({ imgSrc, btnText, paragraph, date }: { imgSrc: string, btnText: string, paragraph: string, date: string }) {
    return (
        <div className='relative text-start'>
            <img className='w-full object-cover h-[301px] sm:h-[607px]' src={imgSrc} />
            <div className='absolute bg-[rgba(0,0,0,0.2)] h-full w-full top-0 left-0'></div>
            <div className='absolute left-[20px] bottom-[20px] right-[60px] sm:bottom-[30px] sm:left-[40px]  text-white max-w-4xl flex flex-col gap-3 sm:gap-6'>
                {btnText !== "" && (
                    <button type="submit" className="rounded-lg bg-[#0270A0] text-white text-sm sm:text-base font-normal py-2 w-fit px-3">{btnText}</button>
                )}
                <div className='sm:text-4xl text-xl sm:leading-9 leading-10 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{paragraph}</div>

                {date !== "" && (
                    <div className="flex gap-2 text-white">
                        <div className='hidden sm:block'>
                            <CalendarIcon />
                        </div>
                        <span className="uppercase text-base font-light">{date}</span>
                    </div>
                )}



            </div>
        </div>
    )
}
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={20} height={20}>
        <path d="M152 64c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16V16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v48zm192 0c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16V16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v48zM0 128c0-35.3 28.7-64 64-64h32v16c0 26.5 21.5 48 48 48h16c26.5 0 48-21.5 48-48V64h128v16c0 26.5 21.5 48 48 48h16c26.5 0 48-21.5 48-48V64h32c35.3 0 64 28.7 64 64v336c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm48 80v256c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V208H48z"></path>
    </svg>
);
