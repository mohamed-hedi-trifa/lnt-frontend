import React from 'react'

import eventImage2 from '../../../assets/images/eventImage2.jpg'
import eventImage3 from '../../../assets/images/eventImage3.jpg'
import eventImage4 from '../../../assets/images/eventImage4.jpg'
import { CalendarIcon } from '@heroicons/react/24/outline'
import LocationIcon from '@/assets/icons/LocationIcon'
import TitleSectionEvent from './TitleSectionEvent'
import EmptyEvent1 from './EmptyEvent1'
import NoEventsMessage from './NoEventsMessage'
import { Link } from 'gatsby'

export default function PopularEventType2({ events, eventTypeTitle, language = "fr" }: { events: any, language: string, eventTypeTitle: string }) {

    if (!events || events.length === 0) {
        return <NoEventsMessage eventTypeTitle={eventTypeTitle} />;
    }

    const eventsData = events.slice(0, 3);


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



        <div className="flex w-full justify-center sm:flex-row flex-col sm:gap-5 gap-2 mt-10 sm:px-0 px-12">
            {eventsData.map((event, index) => (
                <React.Fragment key={index}>

                    <Link to={`/event/event-details/${event.slug}`} className="flex flex-col gap-2 ">
                        <img src={`${process.env.GATSBY_API_URL}${event?.image}`}
                            className=' object-cover aspect-square rounded-xl sm:h-[288px] h-[258px]'
                            alt={event?.title_en || event?.title_fr} />

                        <div className="flex flex-col sm:h-[110px] justify-between gap-4 sm:gap-0 ">
                            <div className="font-bold sm:text-lg text-xl text-[#183354] text-start "> {event?.title_en || event?.title_fr}</div>

                            <div className="flex flex-col sm:gap-1 gap-2 text-[#6D757F] font-semibold">
                                <div className="flex gap-2 items-center">
                                    <CalendarIcon className='w-5' />
                                    <span className="uppercase text-start text-xs">


                                        {
                                            event?.event_start_at ?
                                                formatEventDate(event?.event_start_at, language)
                                                :
                                                "Date not available"
                                        }
                                    </span>
                                </div>

                                <div className="flex gap-2 sm:justify-start items-center ml-[2px]">
                                    <LocationIcon />
                                    <span className="uppercases text-start  text-xs">{event.location_en || event.location_fr}</span>
                                </div>
                            </div>

                        </div>

                    </Link>

                    {(index + 1) % 4 !== 0 && (
                        <div className="w-[2px] my-4 h-auto bg-[#B3B3B3]" />
                    )}


                </React.Fragment>


            ))}

        </div>


    )
}
