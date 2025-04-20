import React, { useEffect, useState, useRef } from 'react'

import ButtonDropdown from '@/components/ButtonDropdown'
import sortIcon from "@/assets/icons/sort-icon.png"
import FilterIcon from '@/assets/icons/FilterIcon'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon'
import OpportunitySidebar from './OpportunitySidebar'
import OpportunityCards from './OpportunityCards'
import FollowUsOpportunity from './FollowUsOpportunity'
import Question from '@/components/atoms/Question'
import SidebarFiltersOpportunity from './SidebarFiltersOpportunity'
import { useTranslation } from '@/contexts/TranslationContext';


export default function DisplayOpportinitiesList({ opportunities }: { opportunities: any }) {
  const { lang } = useTranslation();




  const [opportunityTypes, setOpportunityTypes] = useState<any[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);

  const [isOpened, setIsOpened] = useState(false);


  useEffect(() => {
    if (isOpened) {
      document.querySelector("body")!.style.overflow = "hidden";
    } else {
      document.querySelector("body")!.style.overflow = "visible";
    }
  })






  const [searchQuery, setSearchQuery] = useState('');

  const [selectedAllTypes, setSelectedAllTypes] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isCustomDropdownOpen, setIsCustomDropdownOpen] = useState(false);

  const handleTypeChange = (id: string, checked: boolean) => {
    if (checked && selectedAllTypes) {
      setSelectedAllTypes(false);
    }
    setSelectedTypes((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };


  const resetFilters = () => {
    setSelectedAllTypes(false);
    setSelectedTypes([]);
    setSelectedDateFilter(null);
    setIsCustomDropdownOpen(false);
    setSearchQuery('');
  };


  const filters = {
    opportunityTypes: selectedAllTypes ? [] : selectedTypes,
    dateFilter: selectedDateFilter,
    searchQuery,
  };

  const handleAllTypesChange = (checked: boolean) => {
    setSelectedAllTypes(checked);
    if (checked) {
      // deselect all individual themes
      setSelectedTypes([]);
    }
  };
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className='flex flex-col sm:flex-row gap-5'>




        <SidebarFiltersOpportunity
          setIsCustomDropdownOpen={setIsCustomDropdownOpen}

          selectedAllTypes={selectedAllTypes}
          handleAllTypesChange={handleAllTypesChange}
          selectedTypes={selectedTypes}
          handleTypeChange={handleTypeChange}
          // date props
          selectedDateFilter={selectedDateFilter}
          setSelectedDateFilter={setSelectedDateFilter}

          // common
          resetFilters={resetFilters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isOpened={isOpened}
          setIsOpened={setIsOpened}

        />
        <section className="flex-1 mx-4 sm:mx-0">
          <div className='sm:hidden flex justify-between  relative z-20'>
            <button type='button' onClick={() => setIsOpened(true)} className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl justify-start items-center gap-2.5 inline-flex">
              <FilterIcon />
              <div className="text-center text-white text-sm font-bold font-['Montserrat']">Filtres</div>
            </button>
          </div>
          <OpportunityCards
            filter={filters}
            setIsOpened={setIsOpened}
          />
        </section>
        <div className='flex flex-col mx-4 gap-8'>
          <FollowUsOpportunity />
          <Question />

        </div>
      </div>

    </div>
  )
}
