import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../Pagination';
import EventsCard from '../EventsCard';
import NoEventsMessage from '../NoEventsMessage';

interface TrainingSessionsCardsProps {
  lang: string;
  eventTypeSlug: string;
  eventTypeName: string;
}

export default function TrainingSessionsCards({ lang, eventTypeSlug, eventTypeName }: TrainingSessionsCardsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Nombre d'éléments par page
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState<any[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getEvents = async (query: string, page: number, eventTypeSlug: string) => {
    setLoading(true);
    console.log(eventTypeSlug)
    try {
      const params = { query, page, limit, eventTypeSlug };
      const res = await axios.get('/api/get-active-events/10', { params });
      setItemsList(res.data.data);
      setTotalPages(res.data.last_page);
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data.error) {
        alert(err.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventTypeSlug) {
      getEvents(searchQuery, currentPage, eventTypeSlug);
    }
  }, [searchQuery, currentPage, eventTypeSlug]);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="flex flex-col gap-8 w-full relative z-10 my-5 justify-center items-center">
      {itemsList && itemsList.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-5 ">
          {itemsList.map((event: any) => (
            <EventsCard key={event.id} event={event} custunCss="px-3" lang={lang} />
          ))}
        </div>
      ) : (
        <NoEventsMessage  eventTypeName={eventTypeName}/>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center px-4 sm:px-0">
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      )}
    </section>
  );
}
