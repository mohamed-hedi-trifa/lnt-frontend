import React, { useEffect, useState } from 'react'
import PageTitle from '@/components/atoms/titles/PageTitle'
import PageParagraph from '@/components/atoms/PageParagraph'
import EventImage from './EventImage'

import CulturalEvents from './CulturalEvents'
import FollowUsEvent from './FollowUsEvent'
import QuestionEvent from './QuestionEvent'
import LeisureSportsActivities from './PopularEventType2'
import axios from "axios";
import NoEvents from './no-event/noEvents'

import EmptyEvent1 from './EmptyEvent1'
import PopularEventType1 from './PopularEventType1'
import TitleSectionEvent from './TitleSectionEvent'
import PopularEventType2 from './PopularEventType2'
import LeisureAndSportsActivities from './no-event/LeisureAndSportsActivities'
export default function Events() {
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    try {
      const response = await axios.get(`/api/events`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching event types:", error);
    }
  };

  const [eventTypes, setEventTypes] = useState([]);

  const getEventType = async () => {
    try {
      const response = await axios.get("/api/event-type/");
      setEventTypes(response.data);
    } catch (error) {
      console.error("Error fetching event types:", error);
    }
  };



  useEffect(() => {
    getEvents();
    getEventType();

  }, [location]);
  return events ? (
    <main className={`relative`}>
      <EventImage events={events} />

      <section className="my-5 text-center max-w-7xl mx-auto w-full mt-20 px-5">
        <PageTitle title="Événements" />
        <PageParagraph fontWeight="font-semibold" spacing="leading-[1.4]">
          Bienvenue dans notre espace dédié aux événements qui rythment la vie culturelle, éducative et sportive de l'archipel de Kerkennah. Qu’il s’agisse d’ateliers inspirants, de festivals mémorables ou d’activités sportives, chaque événement est une opportunité de célébrer la diversité et la richesse de notre communauté.
        </PageParagraph>
      </section>

      <section className="flex gap-20 flex-col sm:flex-row my-5 text-center max-w-7xl w-full mx-auto justify-between mt-20 px-5 h-fit">
        <div className="h-full w-full">
          {
            eventTypes.length > 0 ?
              (
                <>
                  <TitleSectionEvent headerName={eventTypes[0].name_en || eventTypes[0].name_fr} showButton={true} />
                  <PopularEventType1 events={eventTypes[0].events} />
                </>
              )
              :
              (
                <>
                  <TitleSectionEvent headerName="Ateliers et Formations" showButton={true} />
                  <EmptyEvent1 />
                </>
              )
          }

          {
            eventTypes.length > 1 ?
              (
                <>
                  <TitleSectionEvent headerName={eventTypes[1].name_en || eventTypes[1].name_fr} showButton={true} />
                  <PopularEventType1 events={eventTypes[1].events} />
                </>
              )
              :
              (
                <div className='mt-10'>
                  <TitleSectionEvent headerName="Événements culturels" showButton={true} />
                  <EmptyEvent1 />
                </div>
              )
          }


        </div>

        <div className="flex flex-col h-full w-full md:col-span-1 col-span-2 gap-10 sm:w-[300px]">
          <FollowUsEvent />
          <QuestionEvent />
        </div>
      </section>


      {
        eventTypes.length > 2 ?
          (
            <section
              className="rounded-xl shadow-lg"
              style={{
                backgroundImage:
                  "linear-gradient(30deg, rgba(135, 208, 228, 1) 0%, rgba(135, 208, 228, 1) 15%, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 1) 65%, rgba(135, 208, 228, 1) 100%)",
              }}
            >
              <div className='my-5 py-10  text-center max-w-7xl w-full mx-auto justify-between mt-20 px-5  h-fit'>

                <TitleSectionEvent headerName={eventTypes[2].name_en || eventTypes[2].name_fr} showButton={true} />
                <PopularEventType2 events={eventTypes[2].events} />
              </div>
            </section>
          )
          :
          (

            <section className='rounded-xl shadow-lg mb-10'

              style={{
                backgroundImage: "linear-gradient(30deg, rgba(135, 208, 228, 1) 0%, rgba(135, 208, 228, 1) 15%, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 1) 65%, rgba(135, 208, 228, 1) 100%)"
              }}
            >
              <LeisureAndSportsActivities />
            </section>

          )
      }


    </main>
  ) : (
    <NoEvents />
  );
}
