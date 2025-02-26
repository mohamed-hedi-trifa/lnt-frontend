import React, { useEffect, useState } from 'react'
import EventImage from '../EventImage'
import PageTitle from '@/components/atoms/titles/PageTitle'

import DisplayCulturelEventsList from './DisplayCulturelEventsList';
import FollowUsEvent from '../FollowUsEvent';
import QuestionEvent from '../QuestionEvent';

export default function CulturelEvents() {
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
                <EventImage />
            <section className="my-5 text-center max-w-7xl mx-auto w-full  mt-20 px-5 ">
                <PageTitle title='Événements culturels' />

            </section>


      <section className='flex gap-20 flex-col sm:flex-row   text-center max-w-7xl w-full mx-auto justify-start items-start  mt-20 px-5 h-fit   '>

        <div className='h-full w-full ' >
        <DisplayCulturelEventsList />
        </div>

        <div className='flex flex-col h-full w-full md:col-span-1 col-span-2 gap-10  sm:w-[300px] mb-6'>
          <FollowUsEvent />
          <QuestionEvent />

        </div>

      </section>


        </main>
  )
}
