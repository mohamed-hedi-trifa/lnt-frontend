
import Calendar from '@/assets/icons/Calendar'
import LocationIcon from '@/assets/icons/LocationIcon'
import React from 'react'

export default function CulturalEventsCard({ image, category, title, date }: { image: string, category: string, title: string, date: string }) {
    return (
        <div>
            <div className="relative text-start  w-full min-h-[300px] ">
                <img className="w-full h-full object-cover min-h-[300px] rounded-xl" src={image} alt="News" />
                <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 rounded-lg"></div>
                <div className="absolute    bottom-[30px] right-10  left-[35px] text-white max-w-3xl  flex flex-col gap-5 sm:gap-5">

                    <div className="font-bold sm:text-2xl text-xl">Festival de la Musique Traditionnelle</div>

                    <div className="flex gap-2 text-white">
                        <Calendar/>
                        <span className="uppercase font-light text-sm">15 février 2025 à 10:30</span>
                    </div>

                    <div className="flex gap-3 text-white items-center">
                        <LocationIcon />
                        <span className="uppercase font-light text-sm">Port de pêche, Kraten</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

