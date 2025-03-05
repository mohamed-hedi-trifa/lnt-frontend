import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import eventImage1 from "../../../assets/images/eventImage.jpg";
import eventImage2 from "../../../assets/images/FatmaB.png";
import eventImage3 from "../../../assets/images/JamilK.png";
import eventImage4 from "../../../assets/images/NajahH.png";
import LocationIcon from "@/assets/icons/LocationIcon";

export default function EventImage({ events, language="fr" }: { events: any, language:string }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  const eventsData = events.slice(0, 4);

  // Function to calculate the time left until the event
  const calculateTimeLeft = (eventDate) => {
    const now = new Date().getTime();
    const eventTime = new Date(eventDate.replace(" ", "T")).getTime();
    const timeDifference = eventTime - now;

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

      return { days, hours, minutes };
    } else {
      return { days: 0, hours: 0, minutes: 0 };
    }
  };

  const formatEventDate = (dateString, language) => {
    const date = new Date(dateString.replace(" ", "T")); // Convert to valid date format
  
    const options = {
      weekday: "long",
      day: "numeric",  
      month: "long",   
      year: "numeric", 
      hour: "numeric", 
      minute: "numeric", 
      hour12: language === "en", 
    };
  
    const formatter = new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-US", options);
    return formatter.format(date);
  };

  // Update the countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      const activeEvent = eventsData[activeIndex];
      if (activeEvent && activeEvent.event_start_at) {
        setTimeLeft(calculateTimeLeft(activeEvent.event_start_at));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeIndex, eventsData]);

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation, Thumbs]}
        loop={true}
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-nexxt",
          prevEl: ".swiper-previous",
        }}
        thumbs={{ swiper: thumbsSwiper }}
        className="shadow-lg"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {eventsData.map((event, index) => (
          <SwiperSlide key={index} className="relative text-start h-[412px] sm:h-[607px] bg-cover bg-center transition-all duration-500 ease-in-out w-full">
            <div className="relative text-start h-[412px] sm:h-[607px] bg-cover bg-center transition-all duration-500 ease-in-out w-full"></div>
            <img
              src={`${process.env.GATSBY_API_URL}${event?.image}`}
              alt="Affiche 1"
              className="w-full absolute h-full top-0 left-0"
            />
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]"></div>
            <div className="flex flex-col items-center sm:gap-4 gap-3 absolute bottom-[44px] left-1/2 transform -translate-x-1/2 text-white text-lg w-full sm:w-auto py-4 px-10 sm:p-6">
              <div className="sm:text-3xl text-base text-center font-semibold">
                {event?.title_en || event?.title_fr}
              </div>

              {/* Dynamic Countdown Timer */}
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

              <div className="flex flex-col items-center">
                <h2 className="sm:mt-4 mt-0 sm:font-bold font-semibold sm:text-2xl text-lg">Date & Heure</h2>
                <h4 className="font-medium sm:text-lg text-sm">
                    {
                        event?.event_start_at ?
                        formatEventDate(event?.event_start_at, language)
                        :
                        "Date not available"
                    }
                   
                </h4>

                <div className="flex items-center gap-2 mt-5">
                  <LocationIcon />
                  <span className="font-medium sm:text-lg text-sm">{event?.location_en || event?.location_fr}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex sm:gap-5 gap-3 bg-black/50 w-fit sm:px-3 px-2 sm:py-2 py-1 rounded-xl">
            {eventsData.map((_, idx) => (
              <div
                key={idx}
                className={`sm:w-3 w-3 sm:h-3 h-3 rounded-full transition-all duration-500 ease-in-out
                  ${idx === activeIndex ? "bg-[#0270A0] scale-125 opacity-100 shadow-lg" : "bg-white/50 scale-100 opacity-60"}`}
              ></div>
            ))}
          </div>
        </div>

        <div className="w-full h-full top-0 z-10 absolute flex items-center justify-between">
          <button className="swiper-previous absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#0270A0] bg-opacity-70 py-14 px-2 rounded-r-xl hover:bg-opacity-90 transition duration-300">
            <ChevronLeftIcon className="text-white w-6 h-6" />
          </button>

          <button className="swiper-nexxt absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#0270A0] bg-opacity-70 py-14 px-2 rounded-l-xl hover:bg-opacity-90 transition duration-300">
            <ChevronRightIcon className="text-white w-6 h-6" />
          </button>
        </div>
      </Swiper>
    </div>
  );
}