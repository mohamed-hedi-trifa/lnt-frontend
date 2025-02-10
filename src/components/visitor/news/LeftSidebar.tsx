import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import FilterTitle from './FilterTitle'
import DateRangeSelector from '../who-are-we/our-achievements/DateRangeSelector'
import ButtonDropdown from '@/components/ButtonDropdown'
import Checkbox from './Checkbox'

export default function LeftSidebar({isOpened, setIsOpened}) {



    // const [isOpened, setIsOpened] = useState(false);
  
    useEffect(() => {
      if (isOpened) {
        document.querySelector("body")!.style.overflow = "hidden";
      } else {
        document.querySelector("body")!.style.overflow = "visible";
      }
    })


  return (
    <aside className={`pointer-events-none h-screen sm:h-fit fixed z-50 lg:z-10 sm:sticky sm:top-[116px] inset-0 p-5 transition duration-300 lg:translate-x-0 ${isOpened ? "translate-x-0" : "translate-x-[-100%]"}`}  onClick={() => setIsOpened(false)}>
      <div className='opacity-90 sm:opacity-100  bg-white flex flex-col p-[10px] gap-4 sm:gap-10 w-full sm:w-[320px] rounded-xl shadow-xl overflow-y-auto pointer-events-auto h-full'>
        <div className="border rounded-lg border-black flex gap-4 p-2">
          <MagnifyingGlassIcon className="size-5" />
          <input type="text" placeholder="Recherche" />
        </div>

        {/* Type d'activité */}
        <div className="flex flex-col gap-5">
          <FilterTitle title="Type d'activité" />
          <div className="flex flex-col gap-3">
            <Checkbox label="Tous les types" nb="10" />
            <Checkbox label="Formation" />
            <Checkbox label="Campement Scientifique" />
          </div>
        </div>

        {/* Thèmes */}
        <div className="flex flex-col gap-5">
          <FilterTitle title="Thèmes" />
          <div className="flex flex-col gap-3">
            <Checkbox label="Tous les Thèmes" nb="120" />
            <Checkbox label="Initiative scientifique" nb="35" />
            <Checkbox label="Suivi scientifique" nb="28" />
            <Checkbox label="Formation" nb="30" />
            <Checkbox label="Événement culturel" nb="18" />
            <Checkbox label="Activités sportives" nb="21" />
            <button className="hover:underline bg-[#EFEFEF] rounded-xl p-[10px] w-fit mt-2 font-medium">
              + Afficher 10 de plus
            </button>
          </div>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-5 relative z-50">
          <FilterTitle title="Date" />
          <div className="flex flex-col gap-3">
            <Checkbox label="Aujourd'hui" />
            <Checkbox label="Cette Semaine" />
            <Checkbox label="Ce Mois" />
            <Checkbox label="Cette Année" />
            <ButtonDropdown
              item={<DateRangeSelector />}
              position="left"
              renderItem={(item) => (
                <div className='py-1'>{item.name}</div>
              )}
            >
              {(isOpen) => (
                <Checkbox label="Configurer" />
              )}
            </ButtonDropdown>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button className="bg-primary text-sm text-white px-[10px] py-2 rounded-xl font-semibold">
            Appliquer les Filtres
          </button>
          <button className="text-white font-semibold px-[10px] py-2 rounded-xl bg-[#858585]">
            Réinitialiser
          </button>
        </div>
      </div>
    </aside>
  )
}
