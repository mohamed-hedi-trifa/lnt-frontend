import React, { useEffect, useState } from 'react'

import ButtonDropdown from '@/components/ButtonDropdown'
import sortIcon from "@/assets/icons/sort-icon.png"
import FilterIcon from '@/assets/icons/FilterIcon'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon'


import EventsideBar from '../EventsideBar'
import TrainingSessionsCards from './TrainingSessionsCards'

export default function DisplayTrainingSessionsList({ lang = "fr", eventTypeSlug }: { lang : string , eventTypeSlug: string}) {




    const [isOpened, setIsOpened] = useState(false);
  
    useEffect(() => {
      if (isOpened) {
        document.querySelector("body")!.style.overflow = "hidden";
      } else {
        document.querySelector("body")!.style.overflow = "visible";
      }
    })


  const CATEGORIES = [
    {
      id: 1,
      name: "All themes"
    },
    {
      id: 2,
      name: "Conservation Marine"
    },
    {
      id: 3,
      name: "Tourisme Responsable"
    },
    {
      id: 4,
      name: "Peche Durable"
    },
    {
      id: 5,
      name: "Ecologie et Environmenet"
    },
    {
      id: 6,
      name: "Education et Formation"
    }
  ]
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
            <ButtonDropdown
              items={CATEGORIES}
              position="right"
              renderItem={(item) => (
                <div className='py-1 px-4'> {item.name}</div>
              )}
            >
              {(isOpen) => (
                <button className="h-12 rounded-[10px] border-2 border-black justify-center items-center flex w-fit">
                  <div className="px-2 py-1.5 justify-center items-center gap-2 flex">
                    <div className='text-primary'> <img src={sortIcon} className='size-6' /> </div>
                    <div className="text-center text-black text-xl font-medium font-['Montserrat'] leading-tight tracking-tight">Trier</div>
                    <div className={`w-6 h-6 relative transition duration-200 ${isOpen ? "-rotate-180" : ""}`}><ArrowDownIcon /></div>
                  </div>
                </button>
              )}
            </ButtonDropdown>
          </div>
          <div className='sm:hidden px-5 font-semibold leading-[20px] pt-5 text-start'>1 - 12 de 150 Publication</div>
          <TrainingSessionsCards lang={lang} eventTypeSlug={eventTypeSlug}/>

        </section>
      </div>

    </div>
  )
}
