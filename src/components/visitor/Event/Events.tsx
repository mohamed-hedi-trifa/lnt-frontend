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
import { useTranslation } from "@/contexts/TranslationContext";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Question from '@/components/atoms/Question';


export default function Events() {
  const { t, lang } = useTranslation();
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState<IEventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEventTypes = async () => {
    try {
      const response = await axios.get('/api/active-event-type');
      setEventTypes(response.data);
    } catch (error) {
      console.error('Error fetching event types:', error);
      setError('Failed to load event types. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await Promise.all([fetchEvents(), fetchEventTypes()]);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const renderEventSection = (displayPlace: string, defaultTitle: string) => {
    if (isLoading) {
      return (
        <div className="w-full">
          <Skeleton height={40} width={200} className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton height={200} />
                <Skeleton height={20} width="80%" />
                <Skeleton height={15} width="60%" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    const eventType = eventTypes.find(eventType => eventType.display_place === displayPlace);

    
    return (
      <div>
        <TitleSectionEvent
          headerName={eventType ? (eventType.name_en || eventType.name_fr) : defaultTitle}
          showButton={eventType ? (eventType?.events?.length > 0 ? true : false) : false}
          eventTypeSlug={eventType ? eventType?.slug : ""}
        />
        {eventType ? (
          displayPlace === 'card3' ? (
            <PopularEventType2 
              events={eventType.events} 
              eventTypeTitle={eventType ? (eventType.name_en || eventType.name_fr) : defaultTitle} 
              language={lang} 
            />
          ) : (
            <PopularEventType1 
              events={eventType.events} 
              eventTypeTitle={eventType ? (eventType.name_en || eventType.name_fr) : defaultTitle} 
              language={lang} 
            />
          )
        ) : (
          displayPlace === 'card3' ? (
            <LeisureAndSportsActivities  
              event_title={eventType ? (eventType.name_en || eventType.name_fr) : defaultTitle} 
            />
          ) : (
            <EmptyEvent1 event_title={eventType?.[`name_${lang}`] || ""} />
          )
        )}
      </div>
    );
  };


  if (isLoading) {
    return (
      <main className="relative">
        {/* Loading skeleton for the hero image */}
        <div className="w-full h-96">
          <Skeleton height="100%" />
        </div>

        {/* Loading skeleton for the title section */}
        <section className="my-5 text-center max-w-7xl mx-auto w-full mt-20 px-5">
          <Skeleton height={40} width={200} className="mx-auto" />
          <Skeleton count={3} className="mt-4" />
        </section>

        {/* Loading skeleton for the main content */}
        <section className="flex gap-20 flex-col sm:flex-row my-5 text-center max-w-7xl w-full mx-auto justify-between mt-20 px-5 h-fit">
          <div className="h-full w-full space-y-20">
            {[...Array(2)].map((_, index) => (
              <div key={index}>
                <Skeleton height={40} width={300} className="mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton height={200} />
                      <Skeleton height={20} width="80%" />
                      <Skeleton height={15} width="60%" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col h-full w-full md:col-span-1 col-span-2 gap-10 sm:w-[300px]">
            <Skeleton height={300} />
            <Skeleton height={200} />
          </div>
        </section>

        {/* Loading skeleton for the bottom section */}
        <section className="rounded-xl shadow-helmi mb-10 bg-[rgba(255, 255, 255, 0.40)]">
          <div className='my-5 py-10 text-center max-w-7xl w-full mx-auto justify-between mt-20 px-5 h-fit'>
            <Skeleton height={40} width={400} className="mx-auto mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton height={150} />
                  <Skeleton height={20} width="80%" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!events || events.length === 0) {
    return <NoEvents />;
  }

  return (
    <main className="relative">
      <EventImage events={events} language={lang} />

      <section className="my-5 text-center max-w-7xl mx-auto w-full mt-20 px-5">
        <PageTitle title="Événements" />
        <PageParagraph fontWeight="font-semibold" spacing="leading-[1.4]">
          Bienvenue dans notre espace dédié aux événements qui rythment la vie culturelle, éducative et sportive de l'archipel de Kerkennah. Qu'il s'agisse d'ateliers inspirants, de festivals mémorables ou d'activités sportives, chaque événement est une opportunité de célébrer la diversité et la richesse de notre communauté.
        </PageParagraph>
      </section>

      <section className="flex gap-[35px] flex-col sm:flex-row my-5 text-center max-w-[1442px] w-full mx-auto justify-between mt-20 px-5 h-fit">
        <div className="h-full w-full flex flex-col gap-[72px]">
          {renderEventSection('card1', 'Ateliers et Formations')}
          {renderEventSection('card2', 'Événements culturels')}
        </div>

        <div className="flex flex-col h-full w-full md:col-span-1 col-span-2 gap-10 sm:w-[300px] mt-[51px]">
          <FollowUsEvent />
          <Question />
        </div>
      </section>

      <section className="rounded-xl shadow-helmi mb-10 bg-[rgba(255, 255, 255, 0.40)]">
        <div className='my-5 py-10 text-center max-w-7xl w-full mx-auto justify-between mt-20 px-5 h-fit'>
          {renderEventSection('card3', 'Loisirs et Activités Sportives')}
        </div>
      </section>
    </main>
  );
}