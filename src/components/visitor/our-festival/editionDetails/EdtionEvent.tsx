import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import SquareIcon from '@/assets/icons/SquareIcon';
import EditionEventImages from './EditionEventImages';
import PageParagraph from '@/components/atoms/PageParagraph';

interface EventProps {
  slug: string;
  id: number;
  name_en?: string;
  name_fr?: string;
  description_en?: string;
  description_fr?: string;
  place_en?: string;
  place_fr?: string;
  date?: string;
}

interface EdtionEventProps {
  event: EventProps;
}

const EdtionEvent: React.FC<EdtionEventProps> = ({ event }) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`/api/previous-event/${event.slug}`);
        setMedia(res.data.media);
      } catch (err: any) {
        setError(err.message);
        console.error('Erreur lors de la récupération de la galerie :', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [event.slug]);

  const formatFrenchDate = (dateString?: string): string => {
    if (!dateString) return 'Date non disponible';

    const date = new Date(dateString.replace(' ', 'T'));
    if (isNaN(date.getTime())) return 'Date invalide';

    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];

    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const daySuffix = dayOfMonth === 1 ? 'er' : '';

    return `${dayOfWeek} ${dayOfMonth}${daySuffix} ${month} ${year}, ${hours}:${minutes}`;
  };

  const uniqueId = useMemo(() => Math.floor(Math.random() * 10000000) + 1, []);

  return (
    <div className="w-full ">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-3">
            <SquareIcon />
            <h1 className="text-lg font-bold">
              {event.name_en || event.name_fr}
            </h1>
          </div>
          <PageParagraph>
            <p className="text-base ">
              {event.description_en || event.description_fr}
            </p>
          </PageParagraph>
          <div className="flex items-center gap-2 text-[14] font-normal">
            <span className="text-[#0270A0] font-bold text-[16px]">Lieu:</span>
            <span>{event.place_en || event.place_fr}</span>
          </div>
          <div className="flex items-center gap-2 text-[14] font-normal">
            <span className="text-[#0270A0] font-bold text-[16px]">Date:</span>
            <span>{formatFrenchDate(event.date)}</span>
          </div>
        </div>
        <div className="sm:flex-1 flex justify-center">
          {loading && <p>Chargement de la galerie...</p>}
          {error && <p className="text-red-500">Erreur lors du chargement de la galerie.</p>}
          {!loading && !error && media.length > 0 && (
            <EditionEventImages media={media} id={`swiper-${uniqueId}`} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EdtionEvent;
