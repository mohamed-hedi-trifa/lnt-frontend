import React from 'react'

import PageTitle from '@/components/atoms/titles/PageTitle'
import PageParagraph from '@/components/atoms/PageParagraph'
import EventDetailslImage from './EventDetailslImage'
import eventImage1 from "../../../../assets/images/eventImage2.jpg";
import LocationMap from '../../LocationMap';
import EventDetailsContent from './EventDetailsContent';
import LeftSideNewsDetails from '../../news/NewsDetails/LeftSideNewsDetails';
import RightSideEventDetails from './RightSideEventDetails';
import MoreEvent from './MoreEvent';
import EventImage from '../EventImage';

export default function EventDetails() {
  const event = {
    image: eventImage1,
    title: "Atelier de Pêche Durable",
    description: "Redécouverte des Techniques Traditionnelles",
    date: "8 AOÛT 2025 à 16:00",
    location: "Plage de Sidi Fredj, Kerkennah"
  };

  return (
    <main className={`relative`}>
  
              <EventDetailslImage event={event} />




      <section className='flex sm:gap-20 gap-12 flex-col sm:grid sm:grid-cols-3    my-5 text-center max-w-7xl w-full mx-auto justify-between  sm:mt-20 mt-10 px-5 h-fit   '>

        <div className='h-full w-full sm:col-span-2' >
          <EventDetailsContent />

        </div>

        <div className='flex flex-col h-full w-full sm:col-span-1  gap-10'>
          <RightSideEventDetails />



        </div>
    
      </section>

      <section className=' flex-col  text-center max-w-7xl w-full mx-auto justify-between   px-5 h-fit  my-10 '>

        <hr className="border-black mb-8" />
        <MoreEvent/>
      </section>
    </main>
  )
}
