// src/components/PopularEventType1.tsx
import React from 'react'
import LocationIcon from '@/assets/icons/LocationIcon'
import NoEventsMessage from './NoEventsMessage'
import { Link } from 'gatsby'

export default function PopularEventType1({
  events,
  eventTypeTitle,
  language = "fr",
}: {
  events: any[],
  eventTypeTitle: string,
  language: string
}) {
  if (!events || events.length === 0) {
    return <NoEventsMessage eventTypeTitle={eventTypeTitle} />
  }

  const eventsData = events.slice(1, 4)

  /**
   * Formats dates exactly like your mockups:
   * FR → "15 FÉVRIER 2025 À 10:30"
   * EN → "WEDNESDAY, FEBRUARY 13, 2025 AT 1:13 PM"
   */
  const formatEventDate = (dateString: string, language: string): string => {
    const date = new Date(dateString.replace(" ", "T"))
    const day = date.getDate()
    const year = date.getFullYear()
    const minutes = String(date.getMinutes()).padStart(2, "0")

    if (language === "fr") {
      const month = date
        .toLocaleString("fr-FR", { month: "long" })
        .toUpperCase()
      const hours = String(date.getHours()).padStart(2, "0")
      return `${day} ${month} ${year} À ${hours}:${minutes}`
    } else {
      const weekday = date
        .toLocaleString("en-US", { weekday: "long" })
        .toUpperCase()
      const month = date
        .toLocaleString("en-US", { month: "long" })
        .toUpperCase()
      let hour12 = date.getHours() % 12
      hour12 = hour12 === 0 ? 12 : hour12
      const ampm = date.getHours() >= 12 ? "PM" : "AM"
      return `${weekday}, ${month} ${day}, ${year} AT ${hour12}:${minutes} ${ampm}`
    }
  }

  return (
    <div className="w-full overflow-visible">
      <div className="flex flex-col sm:flex-row justify-between w-full mt-10 gap-5 overflow-visible font-['Montserrat']">

        {/* ——— Large “hero” event ——— */}
        <Link to={`/event/event-details/${events[0].slug}`}>
          <div
            className={`overflow-visible relative shadow-helmi
                       sm:h-[520px] h-[416px] rounded-xl
                       ${events.length === 1 ? "w-full" : "w-[500px]"}`}
          >
            {/* Inner wrapper for rounding & cropping */}
            <div className="relative rounded-xl overflow-hidden w-full h-full">
              <img
                className="w-full h-full object-cover rounded-xl"
                src={`${process.env.GATSBY_API_URL}${events[0]?.image}`}
                alt={events[0]?.title_en || events[0]?.title_fr}
              />
                <div className="absolute inset-0 bg-gradient-to-b from-[#183354]/0 to-[#183354]" />
            </div>
            {/* Text */}
            <div className="absolute bottom-10 left-10 right-14 text-white flex flex-col gap-5 max-w-3xl">
              <h2 className="font-bold sm:text-2xl text-lg text-start">
                {events[0]?.title_en || events[0]?.title_fr}
              </h2>
              <div className="flex gap-2 items-center text-sm font-light uppercase">
                <img src="/carousel_images/whiteCalendar.svg" className="size-5" />
                <span>
                  {events[0]?.event_start_at
                    ? formatEventDate(events[0]?.event_start_at, language)
                    : "Date not available"}
                </span>
              </div>
              <div className="flex gap-3 items-center text-sm font-light uppercase">
                <LocationIcon />
                <span>{events[0]?.location_en || events[0]?.location_fr}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* ——— Smaller side events ——— */}
        <div className="flex flex-col items-center justify-between w-full gap-5 overflow-visible">
          {eventsData.map((event) => (
            <Link
              to={`/event/event-details/${event.slug}`}
              key={event.id}
              className="flex items-center justify-center overflow-visible w-full h-[160px]"
            >
              {/* Outer box‑shadow wrapper */}
              <div className="shadow-helmi rounded-xl overflow-hidden w-[160px] h-[160px] flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={`${process.env.GATSBY_API_URL}${event.image}`}
                  alt={event.title_en || event.title_fr}
                />
              </div>
              {/* Text */}
              <div className="ml-4 flex-grow flex flex-col justify-between py-2">
                <h3 className="font-bold sm:text-lg leading-6 text-start">
                  {event.title_en || event.title_fr}
                </h3>
                <div className="flex flex-col gap-2 text-[#6D757F] text-xs font-light uppercase">
                  <div className="flex items-center gap-2">
                    <img src="/carousel_images/grayCalendar.png" className="size-4" />
                    <span>
                      {event.event_start_at
                        ? formatEventDate(event.event_start_at, language)
                        : "Date not available"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LocationIcon />
                    <span>{event.location_en || event.location_fr}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
