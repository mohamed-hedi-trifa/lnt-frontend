import React from 'react'

export default function OpportunityImage({ imgSrc }: { imgSrc: string }) {
    return (
        <div className='relative text-start'>
            <img className='w-full object-cover h-[301px] sm:h-[607px]' src={imgSrc} />
            <div className='absolute bg-[rgba(0,0,0,0.2)] h-full w-full top-0 left-0'></div>
            <div className='absolute bottom-[20px] sm:bottom-[60px] left-1/2 transform -translate-x-1/2 text-white sm:max-w-4xl flex flex-col gap-3 sm:gap-6'>
                <div className='sm:text-6xl text-3xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-center sm:w-[850px] w-[350px]'>
                    Coordinateur pour MedFund Co-Management Agreement
                </div>
            </div>
        </div>
    )
}
