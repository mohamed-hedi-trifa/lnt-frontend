import React, { useEffect, useState } from 'react'

import ButtonDropdown from '@/components/ButtonDropdown'
import sortIcon from "@/assets/icons/sort-icon.png"
import FilterIcon from '@/assets/icons/FilterIcon'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon'
import OpportunitySidebar from './OpportunitySidebar'
import OpportunityCards from './OpportunityCards'
import FollowUsOpportunity from './FollowUsOpportunity'
import Question from '@/components/atoms/Question'




export default function DisplayOpportinitiesList({opportunities} : {opportunities:any}) {




    const [isOpened, setIsOpened] = useState(false);
  
    useEffect(() => {
      if (isOpened) {
        document.querySelector("body")!.style.overflow = "hidden";
      } else {
        document.querySelector("body")!.style.overflow = "visible";
      }
    })

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className='flex flex-col sm:flex-row gap-5'>
        <OpportunitySidebar isOpened={isOpened} setIsOpened={setIsOpened} />
        <section className="flex-1 mx-4 sm:mx-0">
          <div className='sm:hidden flex justify-between  relative z-20'>
            <button type='button' onClick={() => setIsOpened(true)} className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl justify-start items-center gap-2.5 inline-flex">
              <FilterIcon />
              <div className="text-center text-white text-sm font-bold font-['Montserrat']">Filtres</div>
            </button>
          </div>
          <OpportunityCards />
        </section>
        <div className='flex flex-col mx-4 gap-8'>
          <FollowUsOpportunity />
          <Question />

        </div>
      </div>

    </div>
  )
}
