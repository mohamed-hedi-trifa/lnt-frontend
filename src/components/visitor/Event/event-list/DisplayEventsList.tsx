import React, { useEffect, useState } from 'react'

import ButtonDropdown from '@/components/ButtonDropdown'
import sortIcon from "@/assets/icons/sort-icon.png"
import FilterIcon from '@/assets/icons/FilterIcon'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon'


import EventsideBar from '../EventsideBar'
import TrainingSessionsCards from './TrainingSessionsCards'
import NoEventsMessage from '../NoEventsMessage'

export default function DisplayEventsList({ lang = "fr", eventTypeSlug , eventTypeName}: { lang: string, eventTypeSlug: string , eventTypeName: string}) {




  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpened) {
      document.querySelector("body")!.style.overflow = "hidden";
    } else {
      document.querySelector("body")!.style.overflow = "visible";
    }
  })



  return (
    <div className='w-full '>



      <div className='flex justify-between gap-5 '>
        <EventsideBar isOpened={isOpened} setIsOpened={setIsOpened} />

        <section className="flex-1">
          <div className='sm:hidden flex justify-between  relative z-20'>
            <button type='button' onClick={() => setIsOpened(true)} className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl justify-start items-center gap-2.5 inline-flex">
              <FilterIcon />
              <div className="text-center text-white text-sm font-bold font-['Montserrat']">Filtres</div>
            </button>

          </div>

          {/* {
            eventTypeSlug && eventTypeSlug.length > 0 ? (
              <TrainingSessionsCards lang={lang} eventTypeSlug={eventTypeSlug} />
            ) : (
              <NoEventsMessage eventTypeTitle={eventTypeName} />
            )
          } */}
                  <TrainingSessionsCards lang={lang} eventTypeSlug={eventTypeSlug} />




        </section>
      </div>

    </div>
  )
}
