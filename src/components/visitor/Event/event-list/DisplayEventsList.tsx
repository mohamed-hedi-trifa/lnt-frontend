import React, { useEffect, useState } from 'react';
import FilterIcon from '@/assets/icons/FilterIcon';
import EventsideBar from '../EventsideBar';
import TrainingSessionsCards from './TrainingSessionsCards';
import FollowUsEvent from '../FollowUsEvent';
import Question from '@/components/atoms/Question';

interface DisplayEventsListProps {
  lang: string;
  eventTypeSlug: string;
  eventTypeName: string;
}

export default function DisplayEventsList({ lang, eventTypeSlug, eventTypeName }: DisplayEventsListProps) {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpened ? 'hidden' : 'visible';
  }, [isOpened]);

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row gap-5">
        <EventsideBar isOpened={isOpened} setIsOpened={setIsOpened} />
        <section className="flex-1 mx-4 sm:mx-0">
          <div className="sm:hidden flex justify-between relative z-20">
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl inline-flex items-center gap-2.5"
            >
              <FilterIcon />
              <div className="text-center text-white text-sm font-bold">Filtres</div>
            </button>
          </div>
          <TrainingSessionsCards lang={lang} eventTypeSlug={eventTypeSlug} eventTypeName={eventTypeName} />
        </section>
        <div className="flex flex-col mx-4 gap-8">
          <FollowUsEvent />
          <Question />
        </div>
      </div>
    </div>
  );
}
