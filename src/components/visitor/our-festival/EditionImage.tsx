import React from 'react'

export default function EditionImage({ imgSrc }: { imgSrc: string }) {
    return (
        <div className="relative text-center w-full">
            <img className="w-full object-cover h-[301px] sm:h-[607px]" src={imgSrc} />
            <div className="absolute bg-[rgba(0,0,0,0.2)] h-full w-full top-0 left-0"></div>

            {/* Centering text */}
            <div className="absolute w-full inset-0 flex flex-col items-center justify-center mt-16 text-white text-center  gap-3 sm:gap-6">
                <div className="sm:text-5xl text-4xl  font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    Éditions Précédentes
                </div>
                <div className="sm:text-4xl text-xl max-w-[200px] sm:max-w-[450px] sm:leading-9 font-medium sm:w-[450px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                Revivez Nos Festivals Passés
                </div>
            </div>
        </div>

    )
}
