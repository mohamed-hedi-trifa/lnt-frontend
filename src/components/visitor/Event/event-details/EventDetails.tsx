import React, { useEffect, useState } from 'react'

import EventDetailslImage from './EventDetailslImage'
import axios from "axios";
import EventDetailsContent from './EventDetailsContent';
import RightSideEventDetails from './RightSideEventDetails';
import MoreEvent from './MoreEvent';
import { IEvent } from '@/models/IEvent';

export default function EventDetails({ location, params }: { location: any; params: any }) {
  
  const [event, setEvent] = useState<IEvent>();
  const [moreEvents, setMoreEvents] = useState([]);
  
  const getEvent = async (slugEvent:any) => {
    try {
      const response = await axios.get(`/api/events/${slugEvent}`);
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event types:", error);
    }
  };

  const getMoreEvents = async (slugEvent:any) => {
    try {
      const response = await axios.get(`/api/more-events/${slugEvent}`);
      setMoreEvents(response.data);
      

    } catch (error) {
      console.error("Error fetching event types:", error);
    }
  };

  useEffect(() => {
    const slugEvent = params.slug;
    getEvent(slugEvent);
    getMoreEvents(slugEvent);

  }, [location]);


  return (
    <main className={`relative`}>

      <EventDetailslImage event={event} />

      <section className='flex sm:gap-20 gap-12 flex-col sm:grid sm:grid-cols-3    my-5 text-center max-w-7xl w-full mx-auto justify-between  sm:mt-20 mt-10 px-5 h-fit   '>

        <div className='h-full w-full sm:col-span-2' >
          <EventDetailsContent params={params} location={location} />

        </div>

        <div className='flex flex-col h-full w-full sm:col-span-1  gap-10'>
          <RightSideEventDetails location={location} event={event}/>
        </div>

      </section>

      <section className=' flex-col  text-center max-w-7xl w-full mx-auto justify-between   px-5 h-fit  my-10 '>

        <hr className="border-black mb-8" />
        <MoreEvent moreEvents={moreEvents}/>
      </section>
    </main>
  )
}
