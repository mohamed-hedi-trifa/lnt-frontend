import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Link } from 'gatsby';

export default function EventsEditionCards({event}) {
    const formatDate = (eventDatetime) => {
        
        const date = new Date(eventDatetime);
        
       
        return format(date, "dd MMMM yyyy 'à' HH'h'mm", { locale: fr });
      };
  return (
    <div>
      <div
        className="sm:flex flex-col bg-white rounded-xl items-start pb-5  h-fit w-[300px]"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.07) 0px -8px 80px 0px, rgba(0, 0, 0, 0.05) 0px -2.92px 29.2px 0px, rgba(0, 0, 0, 0.04) 0px -1.42px 14.18px 0px, rgba(0, 0, 0, 0.03) 0px -0.69px 6.95px 0px, rgba(0, 0, 0, 0.02) 0px -0.27px 2.75px 0px",
        }}
      >


        {/* Image Section */}
        <img
          className="w-full sm:h-[222px] h-[202px] object-cover rounded-t-md"
          src={`${process.env.GATSBY_API_URL}${event.image}`}
          alt={event.title_en || event.title_fr}
        />

        {/* Content Section */}
        <div className="py-5 text-start px-5">
          <h3 className="font-medium sm:text-xs min-h-[29px]">
          {event.title_en || event.title_fr}
          </h3>



<h3 className="font-normal text-[10px] mt-2 min-h-[55px] sm:block hidden">
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


          <hr className="mt-2" />

          {/* Location & Expiry Information */}
          <div className="text-start sm:text-xs mt-3 font-medium">
            <span className="text-[#0270A0] font-bold">Lieu :</span> {event.location_en || event.location_fr}
          </div>
          <div className="text-start sm:text-xs mt-1 font-medium">
            <span className="text-[#0270A0] font-bold">Date :</span> {formatDate(event.event_start_at)}
          </div>
        </div>

        {/* Button Section */}
        <div className="w-full text-start self-start mx-3">
          <Link to={`/event/event-details/${event?.slug}`}>
            <button
              className="text-white sm:mb-0 mb-5 sm:text-xs font-medium self-start rounded-3xl bg-gradient-to-r from-[#51ADC6] to-[#006E9F] w-fit py-2 px-6 
              shadow-[0px_6px_12px_rgba(0,0,0,0.3)] 
              hover:shadow-[0px_10px_20px_rgba(0,0,0,0.4)] 
              hover:opacity-90 transition duration-300 ease-in-out"
            >
              En savoir plus
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
