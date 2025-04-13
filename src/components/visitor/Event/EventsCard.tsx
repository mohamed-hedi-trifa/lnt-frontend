import React from 'react';
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { Link } from 'gatsby';
import { useTranslation } from '@/contexts/TranslationContext';
import PageParagraph2 from '@/components/atoms/PageParagraph2';
import ButtonCard from '@/components/atoms/ButtonCard';

export default function EventsCard({ event}: { event: any}) {

    const formatDate = (eventDatetime) => {
        const date = new Date(eventDatetime);
        return format(date, "dd MMMM yyyy 'à' HH'h'mm", { locale: fr });
      };
    
        const { t, lang } = useTranslation();

        const formattedDate = event?.event_start_at
        ? format(new Date(event.event_start_at),
            lang === "fr" ? "d MMMM yyyy 'à' HH:mm" : "MMMM d, yyyy 'at' HH:mm",
            { locale: lang === "fr" ? fr : enUS }
        )
        : lang === "fr" ? "Date non disponible" : "Date not available";




    return (
        <>
            {/* Mobile View */}
            <div className='flex sm:hidden flex-col bg-white shadow-helmi gap-4 items-start rounded-2xl sm:min-h-[432px] sm:pb-0 pb-5 '>
                <img className="w-full h-[170px] object-cover rounded-t-md"
                    src={`${process.env.GATSBY_API_URL}${event?.image}`}
                    alt={event?.title_en || event?.title_fr || event?.id} />
                <div className='sm:py-5 sm:px-4 pt-3 sm:pt-0  px-6 text-start w-full sm:w-fit'>
                    <h3 className='font-bold sm:text-sm text-lg'>
                        {event?.title_en || event?.title_fr}
                    </h3>
                            <PageParagraph2>
                            <h3 className="font-normal text-sm mt-2 min-h-[55px] ">
                              {event?.description_en
                                ? event?.description_en.length > 120
                                  ? event?.description_en.slice(0, event?.description_en.lastIndexOf(" ", 120)) + "..."
                                  : event?.description_en
                                : event?.description_fr
                                ? event?.description_fr.length > 120
                                  ? event?.description_fr.slice(0, event?.description_fr.lastIndexOf(" ", 120)) + "..."
                                  : event?.description_fr
                                : ""}
                            </h3>
                            </PageParagraph2>
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
                <Link to={`/event/event-details/${event?.slug}`} className='w-full'>               
                <button className="text-white sm:text-xs font-medium self-center rounded-3xl bg-gradient-to-r from-[#51ADC6] to-[#006E9F] w-fit max-w-md sm:py-2 py-[6px] px-6 sm:px-4 
                    shadow-[0px_6px_12px_rgba(0,0,0,0.3)] 
                    hover:shadow-[0px_10px_20px_rgba(0,0,0,0.4)] 
                    hover:opacity-90 transition duration-300 ease-in-out">
                    En savoir plus
                </button>
                </Link>
            </div>

            {/* Larger Screens */}
            <div className='hidden sm:flex flex-col bg-white rounded-md shadow-helmi pb-5 items-start h-full w-[300px] '>
                <img className="w-full h-[122px] object-cover rounded-t-md"
                    src={`${process.env.GATSBY_API_URL}${event?.image}`}
                    alt={event?.title_en || event?.title_fr} />

                <div className="py-2 text-start px-5 flex-grow">
                    <h3 className='font-semibold sm:text-xl min-h-[29px]'>
                        {event?.title_en || event?.title_fr}
                    </h3>
                    <PageParagraph2>
                            <h3 className="font-normal text-sm mt-2 min-h-[55px] ">
                              {event?.description_en
                                ? event?.description_en.length > 120
                                  ? event?.description_en.slice(0, event?.description_en.lastIndexOf(" ", 120)) + "..."
                                  : event?.description_en
                                : event?.description_fr
                                ? event?.description_fr.length > 120
                                  ? event?.description_fr.slice(0, event?.description_fr.lastIndexOf(" ", 120)) + "..."
                                  : event?.description_fr
                                : ""}
                            </h3>
                            </PageParagraph2>
                </div>
                <div className="w-full text-start self-start  ">
        <div className="flex justify-center">
          <hr className="mt-2 w-full max-w-[275px] border-t border-gray-600" />
        </div>
        <div className='mx-3'>
            {/* Location & Expiry Information */}
            <div className="text-start text-[14px] mt-3 font-normal">
              <span className="text-[#0270A0] font-bold text-[16px]">Lieu :</span> {event.location_en || event.location_fr}
            </div>
            <div className="text-starttext-[14px] mt-1 font-normal pb-4">
              <span className="text-[#0270A0] font-bold text-[16px]">Date :</span> {formatDate(event.event_start_at)}
            </div>
            {/* Button Section */}
            <div className='flex justify-center'>
            <Link to={`/event/event-details/${event?.slug}`}>
              <ButtonCard variant="primary"  >  
                En savoir plus
              </ButtonCard>
            </Link>
            </div>
        </div>

      </div>
            </div>
        </>
    );
}
