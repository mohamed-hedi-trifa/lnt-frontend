// src/components/PopularEventType2.tsx
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { CalendarIcon } from "@heroicons/react/24/outline";
import LocationIcon from "@/assets/icons/LocationIcon";
import NoEventsMessage from "./NoEventsMessage";
import { Link } from "gatsby";

interface Event {
  id: string;
  slug: string;
  image: string;
  title_en: string;
  title_fr: string;
  location_en: string;
  location_fr: string;
  event_start_at: string;
  // add any other fields you need…
}

export default function PopularEventType2({
  events,
  eventTypeTitle,
  language = "fr",
}: {
  events: Event[];
  eventTypeTitle: string;
  language?: "fr" | "en";
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!events || events.length === 0) {
    return <NoEventsMessage eventTypeName={eventTypeTitle} />;
  }

  const nextSlide = () =>
    setCurrentIndex((i) => (i + 1) % events.length);
  const prevSlide = () =>
    setCurrentIndex((i) => (i - 1 + events.length) % events.length);

  const formatDate = (iso: string) => {
    const d = new Date(iso.replace(" ", "T"));
    const opts: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: language === "en",
    };
    return d.toLocaleDateString(
      language === "fr" ? "fr-FR" : "en-US",
      opts
    );
  };

  return (
    <div className="">
      {/* DESKTOP */}
      <div className="hidden sm:flex flex-col w-full mx-auto mt-5 gap-2.5">
        {/* Top row: first 3 */}
        <div className="flex gap-2.5">
          {events.slice(0, 3).map((ev) => (
            <Link
              key={ev.id}
              to={`/event/event-details/${ev.slug}`}
              className="relative w-full h-[330px] rounded-xl overflow-hidden shadow-lg flex items-end p-8"
            >
              <img
                src={`${process.env.GATSBY_API_URL}${ev.image}`}
                alt={language === "fr" ? ev.title_fr : ev.title_en}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.16)_100%)]" />
              <div className="relative bottom-[10px] z-10 flex flex-col gap-2 text-white">
                <div className="text-lg font-bold capitalize text-start">
                  {language === "fr" ? ev.title_fr : ev.title_en}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="w-5" />
                  <span className="font-semibold">
                    {formatDate(ev.event_start_at)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <LocationIcon />
                  <span className="font-semibold">
                    {language === "fr"
                      ? ev.location_fr
                      : ev.location_en}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom row: next 2 */}
        <div className="flex gap-2.5">
          {events.slice(3, 5).map((ev) => (
            <Link
              key={ev.id}
              to={`/event/event-details/${ev.slug}`}
              className="relative flex-1 h-[300px] rounded-xl overflow-hidden"
            >
              <img
                src={`${process.env.GATSBY_API_URL}${ev.image}`}
                alt={language === "fr" ? ev.title_fr : ev.title_en}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.16)_100%)]" />
              <div className="absolute left-8 bottom-[45px] text-white flex flex-col gap-2">
                <div className="text-lg font-bold capitalize text-start">
                  {language === "fr" ? ev.title_fr : ev.title_en}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="w-5" />
                  <span className="font-semibold">
                    {formatDate(ev.event_start_at)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <LocationIcon />
                  <span className="font-semibold">
                    {language === "fr"
                      ? ev.location_fr
                      : ev.location_en}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* MOBILE */}
      <div className="sm:hidden mt-10 px-2">
        <div className="flex items-center justify-between gap-3">
          <button onClick={prevSlide}>
            <ChevronLeftIcon className="w-10 text-[#3E3232] cursor-pointer" />
          </button>

          <Link
            to={`/event/event-details/${events[currentIndex].slug}`}
            className="relative w-full h-[300px] rounded-xl overflow-hidden shadow-lg flex items-end p-4"
          >
            <img
              src={`${process.env.GATSBY_API_URL}${events[currentIndex].image}`}
              alt={
                language === "fr"
                  ? events[currentIndex].title_fr
                  : events[currentIndex].title_en
              }
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/90 to-black/20" />
            <div className="relative z-10 flex flex-col gap-2 text-white">
              <div className="text-lg font-bold capitalize">
                {language === "fr"
                  ? events[currentIndex].title_fr
                  : events[currentIndex].title_en}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="w-5" />
                <span className="font-semibold">
                  {formatDate(events[currentIndex].event_start_at)}
                </span>
              </div>
            </div>
          </Link>

          <button onClick={nextSlide}>
            <ChevronRightIcon className="w-10 text-[#3E3232] cursor-pointer" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-5 gap-3">
          {events.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex ? "bg-[#0270A0]" : "bg-black/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
