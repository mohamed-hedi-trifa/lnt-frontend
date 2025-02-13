import React from 'react'

import eventImage2 from '../../../assets/images/eventImage2.jpg'
import eventImage3 from '../../../assets/images/eventImage3.jpg'
import eventImage4 from '../../../assets/images/eventImage4.jpg'




import LocationIcon from '@/assets/icons/LocationIcon'
import TitleSectionEvent from './TitleSectionEvent'
export default function WorkshopsAndTraining() {

    const eventsData = [
        {
            id: 1,
            title: "Atelier de Fabrication de Nasses Artisanales",
            date: "15 février 2025 à 10:30",
            location: "Port de pêche, Kraten",
            image: eventImage2
        },
        {
            id: 2,
            title: "Formation en Pescatourisme",
            date: "10 avril 2025 10:00",
            location: "Maison des Jeunes de kraten, Kerkennah",
            image: eventImage3
        },
        {
            id: 3,
            title: "Atelier sur la Gestion des Déchets Marins",
            date: "05 mai 2024 à 10:30",
            location: "Port de pêche, Kraten",
            image: eventImage4
        }
    ];

    return (
        <div className='w-full'>
            <TitleSectionEvent headerName="Articles Récents" showButton={true} />

            <div className="flex justify-between flex-col sm:flex-row w-full h-fit mt-10  font-['Montserrat']">

                <div className="relative text-start sm:w-[50.67%] sm:h-[460px] h-[416px]">
                    <img className="w-full h-full object-cover rounded-lg" src={eventImage2} />


                    <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 rounded-lg"></div>

                    <div className="absolute    bottom-[40px] right-[60px]  left-[40px] text-white max-w-3xl flex flex-col gap-5 sm:gap-5">

                        <div className="font-bold sm:text-2xl text-lg">Atelier de Pêche Durable</div>

                        <div className="flex gap-2 text-white">
                            <img src="/carousel_images/whiteCalendar.svg" className='size-5 ' />
                            <span className="uppercase font-light text-sm">15 février 2025 à 10:30</span>
                        </div>

                        <div className="flex gap-3 text-white ml-1 items-center">
                            <LocationIcon />
                            <span className="uppercase font-light text-sm">Port de pêche, Kraten</span>
                        </div>
                    </div>
                </div>



                <div className="flex flex-col gap-4 items-center justify-between w-full sm:w-[47.67%] h-[460px] mt-10 sm:mt-0">
                    {eventsData.map((event) => (
                        <div key={event.id} className="flex items-center overflow-hidden h-1/3 w-full justify-center">
                            <img src={event.image} className="h-full aspect-square object-cover rounded-xl" alt={event.title} />
                            <div className="flex flex-col  py-2 sm:ml-2 ml-4  sm:p-3 flex-grow text-start sm:gap-4 gap-2 sm:h-fit h-full justify-between">
                                <div className="font-bold sm:text-lg text-lg  leading-6">{event.title}</div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2 items-center text-[#6D757F]">
                                        <img src="/carousel_images/grayCalendar.png" className='size-4' />
                                        <span className="uppercase font-light text-xs">{event.date}</span>
                                    </div>

                                    <div className="flex gap-2  items-center text-[#6D757F]">
                                        <LocationIcon />
                                        <span className="uppercase font-light text-xs">{event.location}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>




        </div>
    )
}

