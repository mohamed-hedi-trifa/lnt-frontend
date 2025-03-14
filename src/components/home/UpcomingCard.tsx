import React, { useEffect, useState } from "react";



export default function UpcomingCard({ data, type }:  {data: any , type:string}) {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = new Date(data.date || new Date()).getTime() - now;

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
  }, [data.date]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="w-full aspect-square">
        <img 
        src={`${process.env.GATSBY_API_URL}${data.image}`}
         alt={data.title_en || data.title_fr} className="w-full h-full object-fill" />
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
        <h4 className="mt-3 text-lg font-bold">{data.title_en || data.title_fr}</h4>
        <p className="mt-2 text-sm">{data.card_description_en || data.card_description_fr}</p>
        <h4 className="mt-2 text-right font-bold text-sm">{data.sub}</h4>
        <div className="h-px my-3 bg-slate-300"></div>
        <p className="text-center">
          <span className="text-primary font-semibold">Lieu: </span>
          <span>{data.location_en || data.location_fr}</span>
        </p>
      </div>
    </div>
  );
}
