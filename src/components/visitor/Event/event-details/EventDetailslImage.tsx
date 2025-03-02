import LocationIcon from '@/assets/icons/LocationIcon';
import { Description } from '@headlessui/react';
import React, { useEffect, useState } from 'react'



export default function EventDetailslImage({ event, language = "fr" }: { event: any, language: string }) {

    const hasCoordinates = event.latitude && event.longitude;

    // Construct the Google Maps URL
    const mapUrl = hasCoordinates
        ? `https://www.google.com/maps?q=${event.latitude},${event.longitude}`
        : "#";



    if (!event || !event.event_start_at || !event.event_end_at) {
        console.error("Invalid event data:", event);
        return <p className="text-[#7E7E7E] font-semibold">Date and time not available</p>;
    }

    // Convert the date strings to a valid format
    const startDate = new Date(event.event_start_at.replace(" ", "T"));
    const endDate = new Date(event.event_end_at.replace(" ", "T"));

   
    if (isNaN(startDate.getTime())) {
        console.error("Invalid start date:", event.event_start_at);
        return <p className="text-[#7E7E7E] font-semibold">Invalid start date</p>;
    }
    if (isNaN(endDate.getTime())) {
        console.error("Invalid end date:", event.event_end_at);
        return <p className="text-[#7E7E7E] font-semibold">Invalid end date</p>;
    }


    const formattedDate = new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(startDate);

    const formattedTime = new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false, 
    }).format(startDate);

    const formattedEndTime = new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false, 
    }).format(endDate);

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
    });

    useEffect(() => {
        const eventDate = new Date(event.event_start_at).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime(); 
            const timeDifference = eventDate - now;

            if (timeDifference > 0) {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

                setTimeLeft({ days, hours, minutes });
            } else {

                setTimeLeft({ days: 0, hours: 0, minutes: 0 });
            }
        };


        const interval = setInterval(updateCountdown, 1000);


        return () => clearInterval(interval);
    }, [event.event_start_at]);


    const generateGoogleCalendarUrl = (event) => {
        const { event_start_at, event_end_at, title_en, title_fr, description_en, description_fr, location } = event;
      
   
        const title = title_en || title_fr;
        const description = description_en || description_fr;
 
        const startDate = new Date(event_start_at).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const endDate = new Date(event_end_at).toISOString().replace(/-|:|\.\d\d\d/g, "");
      
        // Construct the Google Calendar URL
        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
          title
        )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
            description
        )}&location=${encodeURIComponent(location)}`;
      };
    return (
        <>
            <div className='relative text-start sm:block hidden'>
                <img className='w-full object-cover h-[301px] sm:h-[607px]'
                    src={`${process.env.GATSBY_API_URL}${event?.image}`}
                    alt={event?.title_en || event?.title_fr} />
                <div className='absolute bg-[rgba(0,0,0,0.2)] h-full w-full top-0 left-0'></div>
                <div className='absolute left-[40px] bottom-[40px] right-[60px] sm:bottom-[70px] sm:left-[70px]  text-white max-w-lg flex flex-col gap-3 sm:gap-6'>

                    <div className="flex flex-col gap-5">
                        <h2 className="font-bold text-5xl" style={{ textShadow: "2px 5px rgba(0, 0, 0, 0.5)" }}>
                            {event?.title_en || event?.title_fr}
                        </h2>


                        <h4 className='text-2xl italic ' style={{ textShadow: "3px 3px rgba(0, 0, 0, 0.3)" }}>{event.description_en || event.description_fr}</h4>
                        <div className="flex items-center sm:gap-4 gap-2">
                            <div className="flex flex-col items-center">
                                <div className="sm:text-3xl text-xl font-bold text-white" style={{ textShadow: "0px 0px 10px #00FFFF" }}>
                                    {timeLeft.days}
                                </div>
                                <div className="font-semibold text-[#00FFFF] sm:text-lg text-sm" style={{ textShadow: "0px 0px 10px #00FFFF" }}>
                                    Jours
                                </div>
                            </div>

                            <div className="w-1 sm:h-16 h-11 bg-[#00FFFF] shadow-lg" style={{ boxShadow: "0px 0px 20px #00FFFF" }}></div>


                            <div className="flex flex-col items-center">
                                <div className="sm:text-3xl text-xl font-bold text-white" style={{ textShadow: "0px 0px 20px #00FFFF" }}>
                                    {timeLeft.hours}
                                </div>
                                <div className="font-bold text-[#00FFFF] sm:text-lg text-sm" style={{ textShadow: "0px 0px 20px #00FFFF" }}>
                                    Heures
                                </div>
                            </div>


                            <div className="w-1 sm:h-16 h-11 bg-[#00FFFF] shadow-lg" style={{ boxShadow: "0px 0px 20px #00FFFF" }}></div>

                            <div className="flex flex-col items-center">
                                <div className="sm:text-3xl text-xl font-bold text-white" style={{ textShadow: "0px 0px 20px #00FFFF" }}>
                                    {timeLeft.minutes}
                                </div>
                                <div className="font-bold text-[#00FFFF] sm:text-lg text-sm" style={{ textShadow: "0px 0px 20px #00FFFF" }}>
                                    Minutes
                                </div>
                            </div>
                        </div>



                    </div>


                </div>

                <div className='absolute  bottom-[40px]  bg-white right-[60px]   w-[400px] flex flex-col gap-3 sm:gap-6 px-5 py-7 rounded-xl'>
                    <div className="flex flex-col gap-5 max-w-xs
                ">
                        <div className="flex flex-col gap-1">
                            <h1 className='font-bold text-xl'>
                                Date & Heure
                            </h1>
                            <p className="text-[#7E7E7E] font-semibold">
                                {language === "fr" ? (
                                    <>
                                        {formattedDate}, de {formattedTime} à {formattedEndTime}
                                    </>
                                ) : (
                                    <>
                                        {formattedDate}, from {formattedTime} to {formattedEndTime}
                                    </>
                                )}
                            </p>
                        </div>

                        <div className="flex flex-col text-[#7E7E7E] gap-1">
                            <h1 className='font-bold text-xl text-black'>
                                Lieu
                            </h1>
                            <p className=' font-semibold'>{event?.location_en || event?.location_fr}</p>
                            <a
                                href={mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex gap-2 font-semibold ${!hasCoordinates ? "pointer-events-none opacity-50" : ""}`}
                                aria-disabled={!hasCoordinates}
                            >
                                <span className="text-[#0270A0]">
                                    <LocationIcon />
                                </span>
                                Voir la carte
                            </a>
                        </div>



                    </div>
                    <button
                        onClick={() => window.open(generateGoogleCalendarUrl(event), "_blank")}
                        className="bg-[#0270A0] w-full px-5 py-3 rounded-lg text-white font-semibold"
                    >
                        Ajouter à votre calendrier
                    </button>

                </div>

            </div>

            <div className='relative text-start sm:hidden block'>
                <img className='w-full object-cover h-[301px] sm:h-[607px]' src={event.image} />
                <div className='absolute bg-[rgba(0,0,0,0.2)] h-full w-full top-0 left-0'></div>
                <div className='absolute px-3 left-[40px] bottom-[20px] right-[60px] sm:bottom-[70px] sm:left-[70px]  text-white max-w-lg flex flex-col  '>

                    <div className="flex flex-col gap-3 items-center ">
                        <h2 className="font-bold text-3xl text-center" style={{ textShadow: "2px 5px rgba(0, 0, 0, 0.5)" }}>
                            {event.title}
                        </h2>


                        <h4 className='text-xl italic text-center font-semibold ' style={{ textShadow: "3px 3px rgba(0, 0, 0, 0.3)" }}>{event.description}</h4>
                        <div className="flex items-center sm:gap-4 gap-2">
                            <div className="flex flex-col items-center">
                                <div className="sm:text-3xl text-xl font-bold text-white" style={{ textShadow: "0px 0px 10px #00FFFF" }}>
                                    20
                                </div>
                                <div
                                    className="font-semibold text-[#00FFFF] sm:text-lg text-sm"
                                    style={{ textShadow: "0px 0px 10px #00FFFF" }}
                                >
                                    Jours
                                </div>

                            </div>
                            <div className="w-1 sm:h-16 h-11  bg-[#00FFFF] shadow-lg" style={{ boxShadow: "0px 0px 20px #00FFFF" }}></div>

                            <div className="flex flex-col items-center">
                                <div className="sm:text-3xl text-xl font-bold text-white" style={{ textShadow: "0px 0px 20px #00FFFF" }}>
                                    05
                                </div>
                                <div className="font-bold text-[#00FFFF] sm:text-lg text-sm" style={{ textShadow: "0px 0px 20px #00FFFF" }}>Heures</div>
                            </div>
                            <div className="w-1  sm:h-16 h-11 bg-[#00FFFF] shadow-lg" style={{ boxShadow: "0px 0px 20px #00FFFF" }}></div>

                            <div className="flex flex-col items-center">
                                <div className="sm:text-3xl text-xl font-bold text-white" style={{ textShadow: "0px 0px 20px #00FFFF" }}>
                                    30
                                </div>
                                <div className="font-bold text-[#00FFFF] sm:text-lg text-sm" style={{ textShadow: "0px 0px 20px #00FFFF" }}>Minutes</div>
                            </div>
                        </div>


                    </div>


                </div>



            </div>
        </>

    )
}
