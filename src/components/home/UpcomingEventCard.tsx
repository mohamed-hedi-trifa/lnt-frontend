import { ArrowLeftCircleIcon, ArrowRightCircleIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

type Event = {
  image?: string;
  title?: string;
  content?: string;
  date?: Date;
  location?: string;
  sub?: string;
};

type Props = {
  event: Event;
};

export default function UpcomingEventCard({ event }: Props) {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = new Date(event.date || new Date()).getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);

        setRemainingTime({ days, hours, minutes });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [event.date]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="w-full aspect-square">
        <img src={event.image || ""} alt="" className="w-full h-full object-fill" />
      </div>
      <div className="mx-3 pb-14 md:pb-4">
        <div className="flex items-end">
          <div className="">
            <div className="grid grid-cols-[40px_40px_40px] w-fit text-xs">
              <p className="text-center">Jours</p>
              <p className="text-center">Hr</p>
              <p className="text-center">Min</p>
            </div>
            <div className="grid grid-cols-[40px_40px_40px] w-fit text-sm">
              <p className="flex items-center justify-center w-8 aspect-square mx-auto rounded-lg bg-slate-200">{remainingTime.days}</p>
              <p className="flex items-center justify-center w-8 aspect-square mx-auto rounded-lg bg-slate-200">{remainingTime.hours}</p>
              <p className="flex items-center justify-center w-8 aspect-square mx-auto rounded-lg bg-slate-200">{remainingTime.minutes}</p>
            </div>
          </div>
          <p className="font-bold text-sm">Restants</p>
        </div>
        <h4 className="mt-3 text-sm font-bold">{event.title}</h4>
        <p className="mt-2 text-xs">{event.content}</p>
        <h4 className="mt-2 text-right font-bold text-xs">{event.sub}</h4>
        <div className="h-px my-3 bg-slate-300"></div>
        <p className="text-center text-sm">
          <span className="text-primary">Lieu: </span>
          <span>{event.location}</span>
        </p>
      </div>
    </div>
  );
}
