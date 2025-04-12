import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { useTranslation } from "@/contexts/TranslationContext";
import { Link } from "gatsby";


type UpcomingCardProps = {
  data: any;
  type: string;
};

export default function UpcomingCard({ data, type }: UpcomingCardProps) {


          const { t, lang } = useTranslation();
  
          const formattedDate = data.event_start_at
          ? format(new Date(data.event_start_at),
              lang === "fr" ? "d MMMM yyyy 'à' HH:mm" : "MMMM d, yyyy 'at' HH:mm",
              { locale: lang === "fr" ? fr : enUS }
          )
          : lang === "fr" ? "Date non disponible" : "Date not available";
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const truncateText = (text: string, limit = 120): string => {
    if (!text) return "";
    if (text.length <= limit) return text;
    const lastSpaceIndex = text.lastIndexOf(" ", limit);
    const cutIndex = lastSpaceIndex > 0 ? lastSpaceIndex : limit;
    return text.slice(0, cutIndex) + "...";
  };

  const descriptionText = data.card_description_en || data.card_description_fr || "";
  const truncatedDescription = truncateText(descriptionText, 120);

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

    return () => clearInterval(interval);
  }, [data.date]);

  return (
    <div className="border rounded-lg overflow-hidden h-[480px] w-[380px] flex flex-col shadow-lg">
      {/* Image en hauteur fixe */}
      <div className="w-full h-48 flex-shrink-0">
        <img
          src={`${process.env.GATSBY_API_URL}${data.image}`}
          alt={data.title_en || data.title_fr}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenu de la carte */}
      <div className="px-3 py-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Compteur de temps restant */}
          <div className="flex items-end gap-2">
            <div>
              <div className="grid grid-cols-[40px_40px_40px] w-fit text-[11px]">
                <p className="text-center">Jours</p>
                <p className="text-center">Hr</p>
                <p className="text-center">Min</p>
              </div>
              <div className="grid grid-cols-[40px_40px_40px] w-fit text-sm">
                <p className="flex items-center justify-center w-8 aspect-square mx-auto rounded-lg bg-slate-200">
                  {remainingTime.days}
                </p>
                <p className="flex items-center justify-center w-8 aspect-square mx-auto rounded-lg bg-slate-200">
                  {remainingTime.hours}
                </p>
                <p className="flex items-center justify-center w-8 aspect-square mx-auto rounded-lg bg-slate-200">
                  {remainingTime.minutes}
                </p>
              </div>
            </div>
            <p className="font-bold text-sm mb-1">Restants</p>
          </div>

          {/* Titre */}
          <h4 className="mt-3 text-lg font-bold">{data.title_en || data.title_fr}</h4>

          {/* Description tronquée */}
          <p className="mt-2 text-sm">{truncatedDescription}</p>

          {/* Sous-titre éventuel */}
          <h4 className="mt-2 text-right font-bold text-sm">{data.sub}</h4>
        </div>

        {/* Lieu */}
        <div>
          <div className="h-px bg-slate-300 my-3"></div>
          <p className="text-center text-sm">
            <span className="text-primary font-semibold">Lieu : </span>
            <span>{data.location_en || data.location_fr}</span>
          </p>
          <p className="text-center text-sm">
            <span className="text-primary font-semibold">Date : </span>
            <span>{formattedDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
