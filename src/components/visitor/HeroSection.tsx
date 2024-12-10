import React, { ReactNode } from 'react'

export default function HeroSection({imgSrc, title, subTitle}:{imgSrc:any, title:string, subTitle:string|ReactNode}) {
  return (
    <div className='relative'>
                <img className='w-full object-cover h-[50vh] sm:h-[80vh]' src={imgSrc} />
                <div className='absolute bg-[rgba(0,0,0,0.2)] h-full w-full top-0 left-0'></div>
                <div className='px-10 absolute top-[80px] sm:top-[50%] text-white max-w-2xl flex flex-col gap-2 sm:gap-4'>
                    <div className='text-xl sm:text-5xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{title}</div>
                    <div className='sm:text-3xl font-semibold text-justify drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{subTitle}</div>
                </div>
            </div>
  )
}
