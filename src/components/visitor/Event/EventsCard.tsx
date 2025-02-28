import React from 'react';
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { Link } from 'gatsby';

export default function CulturelEventsCard({ event, custunCss, lang = "fr" }: { event: any, custunCss: string, lang: string }) {



    const formattedDate = event?.event_datetime
        ? format(new Date(event.event_datetime),
            lang === "fr" ? "d MMMM yyyy 'à' HH:mm" : "MMMM d, yyyy 'at' HH:mm",
            { locale: lang === "fr" ? fr : enUS }
        )
        : lang === "fr" ? "Date non disponible" : "Date not available";


    console.log(event);

    return (
        <>
            {/* Mobile View */}
            <div className='flex sm:hidden flex-col bg-white shadow-xl gap-4 items-start rounded-2xl sm:min-h-[432px] sm:pb-0 pb-5 '>
                <img className="w-full h-[170px] object-cover rounded-t-md"
                    src={`${process.env.GATSBY_API_URL}${event?.image}`}
                    alt={event?.title_en || event?.title_fr || event?.id} />
                <div className='sm:py-5 sm:px-4 pt-3 sm:pt-0  px-6 text-start w-full sm:w-fit'>
                    <h3 className='font-bold sm:text-sm text-lg'>
                        {event?.title_en || event?.title_fr}
                    </h3>
                    <hr className='mt-4' />

                    <div className='text-start sm:text-sm mt-3 font-medium '>
                        <span className='text-[#0270A0] font-bold '>Lieu : </span>
                        {event?.location_en || event?.location_fr}
                    </div>

                    <div className='text-start sm:text-sm mt-1 font-medium '>
                        <span className='text-[#0270A0] font-bold'>Date : </span>
                        {formattedDate}
                    </div>
                </div>

                <button className="text-white sm:text-xs font-medium self-center rounded-3xl bg-gradient-to-r from-[#51ADC6] to-[#006E9F] w-fit max-w-md sm:py-2 py-[6px] px-6 sm:px-4 
 shadow-[0px_6px_12px_rgba(0,0,0,0.3)] 
 hover:shadow-[0px_10px_20px_rgba(0,0,0,0.4)] 
 hover:opacity-90 transition duration-300 ease-in-out">
                    En savoir plus
                </button>
            </div>

            {/* Larger Screens */}
            <div className='hidden sm:flex flex-col bg-white rounded-md shadow-xl pb-4 items-start h-fit w-fit '>
                <img className="w-full h-[122px] object-cover rounded-t-md"
                    src={`${process.env.GATSBY_API_URL}${event?.image}`}
                    alt={event?.title_en || event?.title_fr} />

                <div className={`py-5 text-start ${custunCss}`}>
                    <h3 className='font-bold text-sm'>
                        {event?.title_en || event?.title_fr}
                    </h3>
                    <hr className='mt-4' />

                    <div className='text-start text-sm mt-3 font-medium '>
                        <span className='text-[#0270A0] font-bold'>Lieu : </span>
                        {event?.location_en || event?.location_fr}
                    </div>

                    <div className='text-start text-sm mt-1 font-medium '>
                        <span className='text-[#0270A0] font-bold'>Date : </span>
                        {formattedDate}
                    </div>
                </div>

                <Link to={`/event/event-details/${event?.slug}`} className='w-full'>
                    <button className="text-white text-xs font-medium self-center rounded-3xl bg-gradient-to-r from-[#51ADC6] to-[#006E9F] w-fit max-w-md py-2 px-4 
                        shadow-[0px_6px_12px_rgba(0,0,0,0.3)] 
                        hover:shadow-[0px_10px_20px_rgba(0,0,0,0.4)] 
                        hover:opacity-90 transition duration-300 ease-in-out">
                        En savoir plus
                    </button>
                </Link>

            </div>
        </>
    );
}
