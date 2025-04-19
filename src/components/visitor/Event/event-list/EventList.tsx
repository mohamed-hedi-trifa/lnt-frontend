import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventImage from '../EventImage';
import PageTitle from '@/components/atoms/titles/PageTitle';
import DisplayEventsList from './DisplayEventsList';

interface EventType {
  id: string;
  name_en?: string;
  name_fr?: string;
}

interface EventListProps {
  location: Location;
  params: { slug: string };
}

export default function EventList({ location, params }: EventListProps) {
  const searchParams = new URLSearchParams(location?.search);
  const paramLang = searchParams.get("lang");
  const [language] = useState<string>(paramLang === "fr" ? "fr" : "en");
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [isOpened, setIsOpened] = useState(false);

  // Gestion de l'overflow du body
  useEffect(() => {
    document.body.style.overflow = isOpened ? 'hidden' : 'visible';
  }, [isOpened]);

  useEffect(() => {
    const slugEventType = params.slug;
    getEvents(slugEventType);
    getEventType(slugEventType);
  }, [location.search, params.slug]);

  const getEvents = async (slugEventType: string) => {
    try {
      const response = await axios.get(`/api/events-by-eventtype/${slugEventType}`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const getEventType = async (slugEventType: string) => {
    try {
      const response = await axios.get(`/api/event-type/${slugEventType}`);
      setEventType(response.data);
    } catch (error) {
      console.error("Error fetching event type:", error);
    }
  };

  return (
    <main className="relative">
      <div
        className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${isOpened ? "opacity-50" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpened(false)}
      ></div>

      <EventImage events={events} language={language} />

      <section className="my-5 text-center max-w-7xl mx-auto w-full mt-20 px-5">
        <PageTitle title={eventType ? (language === "fr" ? eventType.name_fr : eventType.name_en) : ''} />
      </section>

      <div className="w-full mb-20">
        {eventType && (
          <DisplayEventsList
            lang={language}
            eventTypeSlug={eventType.slug }
            eventTypeName={language === "fr" ? eventType.name_fr : eventType.name_en}
          />
        )}
      </div>
    </main>
  );
}
