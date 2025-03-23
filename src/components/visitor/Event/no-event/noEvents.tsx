import React from 'react'

import PageTitle from '@/components/atoms/titles/PageTitle'
import PageParagraph from '@/components/atoms/PageParagraph'

import QuestionEvent from '../QuestionEvent'
import FollowUsEvent from '../FollowUsEvent'
import EventImage from '../EventImage'
// import WorkshopsAndTrainings from './WorkshopsAndTrainings'
import LeisureAndSportsActivities from './LeisureAndSportsActivities'
import CulturalEvents from './CulturalEvents'
import Question from '@/components/atoms/Question'


export default function NoEvents() {
  return (
    <main className={`relative`}>
      <EventImage />

      <section className="my-5 text-center max-w-7xl mx-auto w-full  mt-20 px-5 ">
        <PageTitle title='Événements' />
        <PageParagraph fontWeight="font-semibold" spacing="leading-[1.4]">
          Bienvenue dans notre espace dédié aux événements qui rythment la vie culturelle, éducative et sportive de l’archipel de Kerkennah. Qu’il s’agisse d’ateliers inspirants, de festivals mémorables ou d’activités sportives, chaque événement est une opportunité de célébrer la diversité et la richesse de notre communauté.</PageParagraph>

      </section>

      <section className='flex gap-20 flex-col sm:flex-row   my-5 text-center max-w-7xl w-full mx-auto justify-between  mt-20 px-5 h-fit   '>

        <div className='h-full w-full ' >
    {/* <WorkshopsAndTrainings/> */}
    <CulturalEvents/>
        </div>

        <div className='flex flex-col h-full w-full md:col-span-1 col-span-2 gap-10  sm:w-[300px]'>
          <FollowUsEvent />
          <Question />

        </div>

      </section>


      <section className='rounded-xl shadow-lg mb-10'

        style={{
          backgroundImage: "linear-gradient(30deg, rgba(135, 208, 228, 1) 0%, rgba(135, 208, 228, 1) 15%, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 1) 65%, rgba(135, 208, 228, 1) 100%)"
        }}
      >
      <LeisureAndSportsActivities/>
      </section>
    </main>
  )
}
