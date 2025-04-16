import React, { useEffect, useState, useRef } from 'react'

import ButtonDropdown from '@/components/ButtonDropdown'
import sortIcon from "@/assets/icons/sort-icon.png"
import FilterIcon from '@/assets/icons/FilterIcon'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon'
import OpportunitySidebar from './OpportunitySidebar'
import OpportunityCards from './OpportunityCards'
import FollowUsOpportunity from './FollowUsOpportunity'
import Question from '@/components/atoms/Question'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import FilterTitle from '../posts/FilterTitle'
import Checkbox from '../posts/Checkbox'



export default function DisplayOpportinitiesList({ opportunities }: { opportunities: any }) {

  const searchInputRef = useRef<HTMLInputElement>(null);



  const [opportunityTypes, setOpportunityTypes] = useState<any[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);

  const [isOpened, setIsOpened] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    opportunityTypes: [] as any[],
    dateFilter: null as string | null,
    searchQuery: '' as string,
  });

  useEffect(() => {
    if (isOpened) {
      document.querySelector("body")!.style.overflow = "hidden";
    } else {
      document.querySelector("body")!.style.overflow = "visible";
    }
  })



  const resetFilters = () => {
    setOpportunityTypes([]);
    setSelectedDateFilter(null);
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };
  const applyFilters = () => {
    const searchQueryValue = searchInputRef.current ? searchInputRef.current.value : '';
    setAppliedFilters({
      opportunityTypes: opportunityTypes,
      dateFilter: selectedDateFilter,
      searchQuery: searchQueryValue,
    });
    setIsOpened(false);
  };
  const handleOpporturnityTypeChange = (themeId: string, isChecked: boolean) => {
    if (isChecked) {
      setOpportunityTypes((prev) => [...prev, themeId]);

    } else {
      setOpportunityTypes((prev) => prev.filter((id) => id !== themeId));
    }

  };
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className='flex flex-col sm:flex-row gap-5'>
        <aside className={`pointer-events-none h-screen sm:h-fit fixed z-50 lg:z-10 sm:sticky sm:top-[116px] inset-0 p-5 transition duration-300 lg:translate-x-0 ${isOpened ? "translate-x-0" : "translate-x-[-100%]"}`} onClick={() => setIsOpened(false)}>
          <div className='opacity-90 sm:opacity-100  bg-white flex flex-col p-[10px] gap-4 sm:gap-10 w-full sm:w-[320px] rounded-xl shadow-xl overflow-y-auto pointer-events-auto h-full'
            style={{
              boxShadow: "0px -8px 80px 0px rgba(0, 0, 0, 0.07), 0px -2.92px 29.2px 0px rgba(0, 0, 0, 0.05), 0px -1.42px 14.18px 0px rgba(0, 0, 0, 0.04), 0px -0.69px 6.95px 0px rgba(0, 0, 0, 0.03), 0px -0.27px 2.75px 0px rgba(0, 0, 0, 0.02)"
            }}>
            <div className="border rounded-lg border-black flex gap-4 p-2">
              <MagnifyingGlassIcon className="size-5" />
              <input
                type="text"
                placeholder="Recherche"
                className="outline-none"
                ref={searchInputRef}
              />
            </div>


            {/* Date */}
            <div className="flex flex-col gap-5 relative z-50">
              <FilterTitle title="Types d'Opportunités" />
              <div className="flex flex-col gap-3">
                <Checkbox label="Tous les Types"
                  checked={opportunityTypes.length == 0} />
                <Checkbox label="Offres d'Emploi"
                  checked={opportunityTypes.includes("job-offer")}
                  onChange={(checked) => handleOpporturnityTypeChange("job-offer", checked)}
                />
                <Checkbox label="Appels d'Offres"
                  checked={opportunityTypes.includes("call-for-tender")}
                  onChange={(checked) => handleOpporturnityTypeChange("call-for-tender", checked)}
                />
                <Checkbox label="Stages"
                  checked={opportunityTypes.includes("internship")}
                  onChange={(checked) => handleOpporturnityTypeChange("internship", checked)} />

              </div>
            </div>


            {/* Date */}
            <div className="flex flex-col gap-5 relative z-50">
              <FilterTitle title="Date" />
              <div className="flex flex-col gap-3">
                <Checkbox
                  label="Aujourd'hui"
                  checked={selectedDateFilter === 'today'}
                  onChange={(checked) => {
                    if (checked) {
                      setSelectedDateFilter('today');

                    } else {
                      setSelectedDateFilter(null);
                    }
                  }}
                />
                <Checkbox
                  label="Cette Semaine"
                  checked={selectedDateFilter === 'week'}
                  onChange={(checked) => {
                    if (checked) {
                      setSelectedDateFilter('week');

                    } else {
                      setSelectedDateFilter(null);
                    }
                  }}
                />
                <Checkbox
                  label="Ce Mois"
                  checked={selectedDateFilter === 'month'}
                  onChange={(checked) => {
                    if (checked) {
                      setSelectedDateFilter('month');
                    } else {
                      setSelectedDateFilter(null);
                    }
                  }}
                />
                <Checkbox
                  label="Cette Année"
                  checked={selectedDateFilter === 'year'}
                  onChange={(checked) => {
                    if (checked) {
                      setSelectedDateFilter('year');
                    } else {
                      setSelectedDateFilter(null);
                    }
                  }}
                />

              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between">
              <button
                className="bg-primary text-sm text-white px-[10px] py-2 rounded-xl font-semibold"
                onClick={applyFilters}
              >
                Appliquer les Filtres
              </button>
              <button
                className="text-white font-semibold px-[10px] py-2 rounded-xl bg-[#858585]"
                onClick={resetFilters}>
                Réinitialiser
              </button>
            </div>
          </div>
        </aside>
        <section className="flex-1 mx-4 sm:mx-0">
          <div className='sm:hidden flex justify-between  relative z-20'>
            <button type='button' onClick={() => setIsOpened(true)} className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl justify-start items-center gap-2.5 inline-flex">
              <FilterIcon />
              <div className="text-center text-white text-sm font-bold font-['Montserrat']">Filtres</div>
            </button>
          </div>
          <OpportunityCards
            filter={appliedFilters}
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
