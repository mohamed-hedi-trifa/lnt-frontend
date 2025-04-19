import React, { ReactNode } from 'react'
import Breadcrumbs from '../Breadcumbs'


export default function HeroSection({imgSrc, title, subTitle}:{imgSrc:any, title:string, subTitle:string|ReactNode}) {
  return (
    <div>
      <div className='relative'>
                <img className='w-full object-cover h-[50vh] sm:h-[80vh]' src={imgSrc} />
                <div className='absolute bg-[rgba(0,0,0,0.2)] h-full w-full top-0 left-0'></div>
                <div className='absolute left-[20px] bottom-[20px] right-[60px] sm:bottom-[100px] sm:left-[40px]  text-white max-w-[700px] flex flex-col gap-2 sm:gap-4'>
                    <div className='text-xl sm:text-[44px] sm:leading-tight font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{title}</div>
                    <div className='sm:text-3xl sm:leading-9 font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{subTitle}</div>
                </div>
      </div>
      
      <div className="max-w-full items-center justify-between sm:pb-4">
        <Breadcrumbs />
      </div>
     
    </div>
  )
}
