import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '@/components/atoms/titles/PageTitle';
import PageParagraph from '@/components/atoms/PageParagraph';
import EventImage from './EventImage';
import FollowUsEvent from './FollowUsEvent';
import QuestionEvent from './QuestionEvent';
import NoEvents from './no-event/noEvents';
import EmptyEvent1 from './EmptyEvent1';
import PopularEventType1 from './PopularEventType1';
import TitleSectionEvent from './TitleSectionEvent';
import PopularEventType2 from './PopularEventType2';
import LeisureAndSportsActivities from './no-event/LeisureAndSportsActivities';
import IEventType from '@/models/IEventType';
import Question from '@/components/atoms/Question'
import { useTranslation } from '@/contexts/TranslationContext';


export default function Events() {
  const { t, lang } = useTranslation();
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState<IEventType[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchEventTypes = async () => {
    try {
      const response = await axios.get('/api/active-event-type');
      setEventTypes(response.data);
    } catch (error) {
      console.error('Error fetching event types:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchEventTypes();
  }, []);

  const renderEventSection = (displayPlace:string, defaultTitle:string) => {
    const eventType:IEventType|undefined = eventTypes.find(et => et.display_place === displayPlace);

    return (
      <div>
        <TitleSectionEvent
          headerName={eventType ? (eventType.name_en || eventType.name_fr) : defaultTitle}
          showButton={eventType ? (eventType?.events?.length > 0 ? true : false) : false}
        />
        {eventType ? (
          displayPlace === 'card3' ? (
            <PopularEventType2 events={eventType.events} eventTypeTitle={eventType ? (eventType.name_en || eventType.name_fr) : defaultTitle} language={lang} />
          ) : (
            <PopularEventType1 events={eventType.events} eventTypeTitle={eventType ? (eventType.name_en || eventType.name_fr) : defaultTitle} language={lang} />
          )
        ) : (
          displayPlace === 'card3' ? (
            //@ts-ignore
            <LeisureAndSportsActivities event_title={eventType ? (eventType.name_en || eventType.name_fr) : defaultTitle} />
          ) : (
            <EmptyEvent1 event_title={eventType?.[`name_${lang}`] || ""} />
          )


        )}
      </div>
    );
  };

  if (!events) {
    return <NoEvents />;
  }

  return (
    <main className="relative">
      <EventImage events={events} language={lang} />

      <section className="my-5 text-center max-w-7xl mx-auto w-full mt-20 px-5">
        <PageTitle title="Événements" />
        <PageParagraph fontWeight="font-semibold" spacing="leading-[1.4]">
          Bienvenue dans notre espace dédié aux événements qui rythment la vie culturelle, éducative et sportive de l'archipel de Kerkennah. Qu’il s’agisse d’ateliers inspirants, de festivals mémorables ou d’activités sportives, chaque événement est une opportunité de célébrer la diversité et la richesse de notre communauté.
        </PageParagraph>
      </section>

      <section className="flex gap-20 flex-col sm:flex-row my-5 text-center max-w-7xl w-full mx-auto justify-between mt-20 px-5 h-fit">
        <div className="h-full w-full">
          {renderEventSection('card1', 'Ateliers et Formations')}
          {renderEventSection('card2', 'Événements culturels')}
        </div>

        <div className="flex flex-col h-full w-full md:col-span-1 col-span-2 gap-10 sm:w-[300px] mt-[51px]">
          <FollowUsEvent />
          <Question />
        </div>
      </section>

      <section
        className="rounded-xl shadow-helmi mb-10 bg-[rgba(255, 255, 255, 0.40)]"


      >

        <div className='my-5 py-10  text-center max-w-7xl w-full mx-auto justify-between mt-20 px-5  h-fit'>

          {renderEventSection('card3', 'Loisirs et Activités Sportives')}
        </div>
      </section>
    </main>
  );
}