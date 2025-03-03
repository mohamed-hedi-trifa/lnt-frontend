import React from 'react'

export default function OpportunityImage({ imgSrc }: { imgSrc: string }) {
    return (
        <div className='relative text-start'>
            <img className='w-full object-cover h-[301px] sm:h-[607px]' src={imgSrc} />
            <div className='absolute bg-[rgba(0,0,0,0.2)] h-full w-full top-0 left-0'></div>
            <div className='absolute left-[20px] sm:right-[40px] right-[60px] bottom-[20px]   sm:bottom-[100px] sm:left-[40px]  text-white sm:max-w-4xl  flex flex-col gap-3 sm:gap-6'>
                <div className='sm:text-5xl text-2xl  font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                Les Gardiens de Nos Écosystèmes Marins
                </div>
                <div className='sm:text-3xl text-base sm:leading-9 font-medium  sm:w-[68%] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                Découvrez l'équipe dédiée à la protection et à la gestion durable de l'Aire Marine et Côtière Protégée de Kerkennah
                </div>
            </div>
        </div>
    )
}
