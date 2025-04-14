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
  // État pour le temps restant
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  // Calcul du format de date à afficher
  const formattedDate = data.event_start_at
    ? format(
        new Date(data.event_start_at),
        lang === "fr" ? "d MMMM yyyy 'à' HH:mm" : "MMMM d, yyyy 'at' HH:mm",
        { locale: lang === "fr" ? fr : enUS }
      )
    : lang === "fr"
    ? "Date non disponible"
    : "Date not available";

  // Fonction qui calcule le temps restant
  const calculateTimeLeft = (eventDate: string) => {
    const now = new Date().getTime();
    // Remplacer l'espace par 'T' pour être sûr d'avoir un format date valide
    const eventTime = new Date(eventDate.replace(" ", "T")).getTime();
    const timeDifference = eventTime - now;

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      return { days, hours, minutes };
    } else {
      return { days: 0, hours: 0, minutes: 0 };
    }
  };

  // Mettre à jour le compteur à chaque rendu et à intervalles réguliers
  useEffect(() => {
    // Mise à jour immédiate
    setTimeLeft(calculateTimeLeft(data.event_start_at));

    // Mise à jour à chaque minute (ou seconde)
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(data.event_start_at));
    }, 60000); // toutes les 60s

    // Nettoyage de l'intervalle au démontage
    return () => clearInterval(timer);
  }, [data.event_start_at]);

  // Fonction utilitaire pour tronquer la description
  const truncateText = (text: string, limit = 120): string => {
    if (!text) return "";
    if (text.length <= limit) return text;
    const lastSpaceIndex = text.lastIndexOf(" ", limit);
    const cutIndex = lastSpaceIndex > 0 ? lastSpaceIndex : limit;
    return text.slice(0, cutIndex) + "...";
  };

  const descriptionText =
    data.card_description_en || data.card_description_fr || "";
  const truncatedDescription = truncateText(descriptionText, 120);

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
                  {timeLeft.days}
                </p>
                <p className="flex items-center justify-center w-8 aspect-square mx-auto rounded-lg bg-slate-200">
                  {timeLeft.hours}
                </p>
                <p className="flex items-center justify-center w-8 aspect-square mx-auto rounded-lg bg-slate-200">
                  {timeLeft.minutes}
                </p>
              </div>
            </div>
            <p className="font-bold text-sm mb-1">Restants</p>
          </div>

          {/* Titre */}
          <h4 className="mt-3 text-lg font-bold">
            {data.title_en || data.title_fr}
          </h4>

          {/* Description tronquée */}
          <p className="mt-2 text-sm">{truncatedDescription}</p>

          {/* Sous-titre éventuel */}
          <h4 className="mt-2 text-right font-bold text-sm">{data.sub}</h4>
        </div>

        {/* Lieu / Date */}
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
