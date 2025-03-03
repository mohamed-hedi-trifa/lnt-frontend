import React, { useEffect, useState } from 'react'
import EventImage from '../EventImage'
import PageTitle from '@/components/atoms/titles/PageTitle'
import axios from "axios";


import FollowUsEvent from '../FollowUsEvent';
import QuestionEvent from '../QuestionEvent';
import DisplayTrainingSessionsList from './DisplayEventsList';
import DisplayEventsList from './DisplayEventsList';

export default function EventList({ location, params }: { location: any; params: any }) {

  const searchParams = new URLSearchParams(location?.search);
  const paramLang = searchParams.get("lang");
  const [language, setLanguage] = useState<string>(paramLang === "fr" ? "fr" : "en");
  const [eventType, setEventType] = useState([]);
  const [events, setEvents] = useState([]);


  const getEvents = async (slugEventType) => {
    try {
      const response = await axios.get(`/api/events-by-eventtype/${slugEventType}`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching event types:", error);
    }
  };

  const getEventType = async (slugEventType) => {
    try {
      const response = await axios.get(`/api/event-type/${slugEventType}`);
      setEventType(response.data);

      console.log(eventType)
    
    } catch (error) {
      console.error("Error fetching event types:", error);
    }
  }


  useEffect(() => {



    const slugEventType = params.slug;
    getEvents(slugEventType);
    getEventType(slugEventType);



  }, [location]);


  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpened) {
      document.querySelector("body")!.style.overflow = "hidden";
    } else {
      document.querySelector("body")!.style.overflow = "visible";
    }
  })

  return (
    <main className={`relative`}>

      <div className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${isOpened ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpened(false)}></div>
      <EventImage events={events} language={language}/>
      <section className="my-5 text-center max-w-7xl mx-auto w-full  mt-20 px-5 ">
        <PageTitle title={eventType.name_en || eventType.name_fr} />

      </section>


      <section className='flex gap-20 flex-col sm:flex-row   text-center max-w-7xl w-full mx-auto justify-start items-start  mt-20 px-5 h-fit   '>

        <div className='h-full w-full ' >
          <DisplayEventsList lang={language} eventTypeSlug={eventType.id} />
        </div>

        <div className='flex flex-col h-full w-full md:col-span-1 col-span-2 gap-10  sm:w-[300px] mb-6'>
          <FollowUsEvent />
          <QuestionEvent />

        </div>

      </section>


    </main>
  )
}
