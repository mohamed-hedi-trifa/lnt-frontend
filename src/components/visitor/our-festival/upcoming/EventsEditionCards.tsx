import React from 'react';
import { format } from 'date-fns';
import { fr, enUS } from "date-fns/locale";
import { Link } from 'gatsby';
import ButtonCard from '@/components/atoms/ButtonCard';
import PageParagraph2 from '@/components/atoms/PageParagraph2';
import { useTranslation } from '@/contexts/TranslationContext';


export default function EventsEditionCards({ event }) {
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
    <div className="flex flex-col bg-white rounded-xl pb-5 h-full w-[300px] shadow-helmi">
      {/* Image Section */}
      <img
        className="w-full sm:h-[222px] h-[202px] object-cover rounded-t-md"
        src={`${process.env.GATSBY_API_URL}${event.image}`}
        alt={event.title_en || event.title_fr}
      />

      {/* Content Section */}
      <div className="py-2 text-start px-5 flex-grow">
        <h3 className="font-semibold sm:text-xl min-h-[29px]">
          {event.title_en || event.title_fr}
        </h3>
        <PageParagraph2>
        <h3 className="font-normal text-[14px] mt-2 min-h-[55px] ">
          {event.description_en
            ? event.description_en.length > 120
              ? event.description_en.slice(0, event.description_en.lastIndexOf(" ", 120)) + "..."
              : event.description_en
            : event.description_fr
            ? event.description_fr.length > 120
              ? event.description_fr.slice(0, event.description_fr.lastIndexOf(" ", 120)) + "..."
              : event.description_fr
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
              <span className="text-[#0270A0] font-bold text-[16px]">Date :</span> {formattedDate}
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
  );
}
