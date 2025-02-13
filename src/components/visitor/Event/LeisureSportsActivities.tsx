import React from 'react'

import eventImage2 from '../../../assets/images/eventImage2.jpg'
import eventImage3 from '../../../assets/images/eventImage3.jpg'
import eventImage4 from '../../../assets/images/eventImage4.jpg'
import { CalendarIcon } from '@heroicons/react/24/outline'
import LocationIcon from '@/assets/icons/LocationIcon'
import TitleSectionEvent from './TitleSectionEvent'

export default function LeisureSportsActivities() {
    const newsData = [
        { image: eventImage2, title: "Tournoi de Volleyball de Plage", date: "8 AOÛT 2025 à 16:00", location: "Plage de Sidi Fredj, Kerkennah" },
        { image: eventImage4, title: "Tournoi de Pétanque", date: "8 AOÛT 2025 à 16:00", location: "Plage de Sidi Fredj, Kerkennah" },
        { image: eventImage3, title: "Tournoi de Volleyball de Plage", date: "8 AOÛT 2025 à 16:00", location: "Parc Culturel, Kraten" },
        { image: eventImage2, title: "Tournoi de Pétanque", date: "8 AOÛT 2025 à 16:00", location: "Plage de Sidi Fredj, Kerkennah" },
    ];
    return (
        <div className="my-5 py-10  text-center max-w-7xl w-full mx-auto justify-between mt-20 px-5  h-fit">
            <TitleSectionEvent headerName="Activités de loisirs et sportives" showButton={true}/>

            <div className="flex justify-between sm:flex-row flex-col sm:gap-5 gap-2 mt-10 sm:px-0 px-12">
                {newsData.map((news, index) => (
                    <React.Fragment key={index}>
                        <div className="flex flex-col gap-2 ">
                            <img src={news.image} className=' object-cover aspect-square rounded-xl sm:h-[288px] h-[258px]' alt="" />

                            <div className="flex flex-col sm:h-[110px] justify-between gap-4 sm:gap-0 ">
                                <div className="font-bold sm:text-lg text-xl text-[#183354] text-start ">{news.title}</div>

                                <div className="flex flex-col sm:gap-1 gap-2 text-[#6D757F]">
                                    <div className="flex gap-2 items-center">
                                        <CalendarIcon className='w-5'/>
                                        <span className="uppercase text-start font-light text-xs">{news.date}</span>
                                    </div>

                                    <div className="flex gap-2 sm:justify-start items-center ml-[2px]">
                                        <LocationIcon/>
                                        <span className="uppercases text-start font-light text-xs">{news.location}</span>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {(index + 1) % 4 !== 0 && (
                            <div className="w-[2px] my-4 h-auto bg-[#B3B3B3]" />
                        )}


                    </React.Fragment>


                ))}
            </div>
        </div>

    )
}
