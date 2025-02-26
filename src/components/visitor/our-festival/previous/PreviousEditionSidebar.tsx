import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import FilterTitle from '../../posts/FilterTitle';
import Checkbox from '../../posts/Checkbox';
import { PlusIcon } from '@heroicons/react/24/solid';





export default function PreviousEditionSidebar({ isOpened, setIsOpened }: { isOpened: boolean, setIsOpened: any }) {



  // const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpened) {
      document.querySelector("body")!.style.overflow = "hidden";
    } else {
      document.querySelector("body")!.style.overflow = "visible";
    }
  })


  return (
    <aside className={`pointer-events-none h-screen sm:h-fit fixed z-50 lg:z-10 sm:sticky sm:top-[116px] inset-0 p-5 transition duration-300 lg:translate-x-0 ${isOpened ? "translate-x-0" : "translate-x-[-100%]"}`} onClick={() => setIsOpened(false)}>
      <div className='opacity-90 sm:opacity-100  bg-white flex flex-col p-[10px] gap-4 sm:gap-10 w-full sm:w-[320px] rounded-xl shadow-xl overflow-y-auto pointer-events-auto h-full'
        style={{
          boxShadow: "0px -8px 80px 0px rgba(0, 0, 0, 0.07), 0px -2.92px 29.2px 0px rgba(0, 0, 0, 0.05), 0px -1.42px 14.18px 0px rgba(0, 0, 0, 0.04), 0px -0.69px 6.95px 0px rgba(0, 0, 0, 0.03), 0px -0.27px 2.75px 0px rgba(0, 0, 0, 0.02)"
        }}>
        <div className="border rounded-lg border-black flex gap-4 p-2">
          <MagnifyingGlassIcon className="size-5" />
          <input type="text" placeholder="Recherche" />
        </div>


        {/* Date */}
        <div className="flex flex-col gap-5 relative z-50">
          <FilterTitle title="Éditions" />
          <div className="flex flex-col gap-3">
            <div className="flex gap-4
            ">
            <Checkbox checked={true} label="Tous les Éditions " /> <span >  (8)</span>
            </div>
            
            <Checkbox label="Éditions 2024" />
            <Checkbox label="Éditions 2023" />
            <Checkbox label="Éditions 2022" />
            <Checkbox label="Éditions 2021" />


            <div className='flex gap-2 bg-[#EFEFEF] rounded-lg w-fit px-2 py-1 mt-2 cursor-pointer' >
            <PlusIcon  className='w-[18px]'/> Afficher 3 de plus
            </div>
           

          </div>
        </div>


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
