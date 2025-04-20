import React, { useEffect, Dispatch, SetStateAction, memo } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'


import FilterTitle from '../posts/FilterTitle'
import Checkbox from '../posts/Checkbox'

type EventsideBarProps = {
  isOpened: boolean;
  setIsOpened: any;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  resetFilters: () => void;
  setSelectedDateFilter: Dispatch<SetStateAction<string | null>>;
  setIsCustomDropdownOpen: Dispatch<SetStateAction<boolean>>;
  selectedDateFilter: string | null;
}


const EventsideBar = memo(function LeftSidebar({
  isOpened,
  setIsOpened,
  searchQuery,
  setSearchQuery,
  resetFilters,
  setSelectedDateFilter,
  selectedDateFilter,
  setIsCustomDropdownOpen,
}: EventsideBarProps) {



  // const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpened) {
      document.querySelector("body")!.style.overflow = "hidden";
    } else {
      document.querySelector("body")!.style.overflow = "visible";
    }
  })


  return (
    <aside className={`pointer-events-none h-screen sm:h-fit fixed z-50 lg:z-10 sm:sticky sm:top-[116px] inset-0 p-5 transition duration-300 lg:translate-x-0 ${isOpened ? "translate-x-0" : "translate-x-[-100%]"}`} onClick={() => setIsOpened(false)} >
      <div className='opacity-90 sm:opacity-100  bg-white flex flex-col p-[10px] gap-4 sm:gap-10 w-full sm:w-[320px] rounded-xl shadow-xl overflow-y-auto pointer-events-auto h-full'
        style={{
          boxShadow: "0px -8px 80px 0px rgba(0, 0, 0, 0.07), 0px -2.92px 29.2px 0px rgba(0, 0, 0, 0.05), 0px -1.42px 14.18px 0px rgba(0, 0, 0, 0.04), 0px -0.69px 6.95px 0px rgba(0, 0, 0, 0.03), 0px -0.27px 2.75px 0px rgba(0, 0, 0, 0.02)"
        }}>
        <div className="border rounded-lg border-black flex gap-4 p-2">
          <MagnifyingGlassIcon className="size-5" />
          <input
            type="text"
            placeholder="Recherche"
            className="outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>





        {/* Date */}
        <div className="flex flex-col gap-5 relative z-50">
          <FilterTitle title="Date" />
          <div className="flex flex-col gap-3">
            {['today', 'week', 'month', 'year'].map((key) => (
              <Checkbox
                key={key}
                name={`date-${key}`}
                label={
                  key === 'today'
                    ? "Aujourd'hui"
                    : key === 'week'
                      ? 'Cette Semaine'
                      : key === 'month'
                        ? 'Ce Mois'
                        : 'Cette Année'
                }
                checked={selectedDateFilter === key}
                onChange={(c) => {
                  if (c) {
                    setSelectedDateFilter(key);
                    setIsCustomDropdownOpen(false);
                  } else {
                    setSelectedDateFilter(null);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end">

          <button
            className="text-white font-semibold px-[10px] py-2 rounded-xl bg-[#858585]"
            onClick={resetFilters}
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </aside>
  )
})
export default EventsideBar;