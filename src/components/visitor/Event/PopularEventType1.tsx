import React from 'react'

import eventImage2 from '../../../assets/images/eventImage2.jpg'
import eventImage3 from '../../../assets/images/eventImage3.jpg'
import eventImage4 from '../../../assets/images/eventImage4.jpg'




import LocationIcon from '@/assets/icons/LocationIcon'
export default function PopularEventType1({ events, language = "fr" }: { events: any, language: string }) {

    const eventsData = events.slice(1, 4);
    const formatEventDate = (dateString, language) => {
        const date = new Date(dateString.replace(" ", "T")); // Convert to valid date format

        const options = {
            weekday: "long", // Full weekday name (e.g., "Friday" or "Vendredi")
            day: "numeric",  // Day of the month (e.g., "2")
            month: "long",   // Full month name (e.g., "August" or "août")
            year: "numeric", // Full year (e.g., "2024")
            hour: "numeric", // Hour (e.g., "17" or "5")
            minute: "numeric", // Minute (e.g., "00")
            hour12: language === "en", // Use 12-hour format for English, 24-hour for French
        };

        const formatter = new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-US", options);
        return formatter.format(date);
    };

    return (
        <div className='w-full'>


            <div className="flex justify-between flex-col sm:flex-row w-full h-fit mt-10  font-['Montserrat']">

                <div className="relative text-start sm:w-[50.67%] sm:h-[460px] h-[416px]">
                    <img className="w-full h-full object-cover rounded-lg"
                        src={`${process.env.GATSBY_API_URL}${events[0]?.image}`}
                        alt={events[0]?.title_en || events[0]?.title_fr}
                    />


                    <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 rounded-lg"></div>

                    <div className="absolute    bottom-[40px] right-[60px]  left-[40px] text-white max-w-3xl flex flex-col gap-5 sm:gap-5">

                        <div className="font-bold sm:text-2xl text-lg">{events[0]?.title_en || events[0]?.title_fr}</div>

                        <div className="flex gap-2 text-white">
                            <img src="/carousel_images/whiteCalendar.svg" className='size-5 ' />
                            <span className="uppercase font-light text-sm">
                                {
                                    events[0]?.event_start_at ?
                                        formatEventDate(events[0]?.event_start_at, language)
                                        :
                                        "Date not available"
                                }
                            </span>
                        </div>

                        <div className="flex gap-3 text-white ml-1 items-center">
                            <LocationIcon />
                            <span className="uppercase font-light text-sm">{events[0]?.location_en || events[0]?.location_fr}</span>
                        </div>
                    </div>
                </div>



                <div className="flex flex-col gap-4 items-center justify-between w-full sm:w-[47.67%] h-[460px] mt-10 sm:mt-0">
                    {eventsData.map((event) => (
                        <div key={event.id} className="flex items-center overflow-hidden h-1/3 w-full justify-center">
                            <img className="h-full aspect-square object-cover rounded-xl"
                                src={`${process.env.GATSBY_API_URL}${event?.image}`}
                                alt={events?.title_en || events?.title_fr}
                            />
                            <div className="flex flex-col  py-2 sm:ml-2 ml-4  sm:p-3 flex-grow text-start sm:gap-4 gap-2 sm:h-fit h-full justify-between">
                                <div className="font-bold sm:text-lg text-lg  leading-6">{event.title_en || event.title_fr}</div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2 items-center text-[#6D757F]">
                                        <img src="/carousel_images/grayCalendar.png" className='size-4' />
                                        <span className="uppercase font-light text-xs">
                                            {
                                                event?.event_start_at ?
                                                    formatEventDate(event?.event_start_at, language)
                                                    :
                                                    "Date not available"
                                            }
                                        </span>
                                    </div>

                                    <div className="flex gap-2  items-center text-[#6D757F]">
                                        <LocationIcon />
                                        <span className="uppercase font-light text-xs">{event.location_en || event.location_fr}</span>
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

