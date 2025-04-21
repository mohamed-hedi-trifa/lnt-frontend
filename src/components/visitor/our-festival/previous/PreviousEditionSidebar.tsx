// src/components/visitor/who-are-we/our-achievements/SidebarFilters.tsx
import React, { Dispatch, SetStateAction, memo } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Checkbox from '../../posts/Checkbox';
import FilterTitle from '../../posts/FilterTitle';

const ShimmerBar = ({ className = '' }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
);
const SkeletonCheckbox = () => <ShimmerBar className="h-4 w-40" />;

type LeftSidebarProps = {
  isSticky?: boolean;
  lang: string;
  editions: any[];
  editionsLoading: boolean;

  selectedAllEditions: boolean;
  handleAllEditionsChange: (checked: boolean) => void;
  selectedEditions: string[];
  handleEditionChange: (id: string, checked: boolean) => void;
  showAllEditions: boolean;
  setShowAllEditions: Dispatch<SetStateAction<boolean>>;



  resetFilters: () => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  isOpened: boolean;

};

const PreviousEditionSidebar = memo(function LeftSidebar({
  isSticky = true,
  lang,
  editions,
  editionsLoading,
  selectedAllEditions,
  handleAllEditionsChange,
  selectedEditions,
  handleEditionChange,
  showAllEditions,
  setShowAllEditions,
  resetFilters,
  searchQuery,
  setSearchQuery,
  isOpened,

}: LeftSidebarProps) {
  const displayedEditions = showAllEditions ? editions : editions.slice(0, 6);

  return (
    <aside
      className={`pointer-events-none h-screen sm:h-fit fixed z-50 lg:z-10 ${isSticky ? 'sm:sticky sm:top-[116px]' : 'sm:relative'
        } inset-0  transition duration-300 lg:translate-x-0 ${isOpened ? 'translate-x-0' : 'translate-x-[-100%]'
        }`}
    >
      <div
        className="opacity-90 sm:opacity-100 bg-white flex flex-col p-[10px] gap-4 sm:gap-10 w-full sm:w-[320px] rounded-xl shadow-xl overflow-y-auto pointer-events-auto h-full"
        style={{
          boxShadow:
            '0px -8px 80px 0px rgba(0,0,0,0.07), 0px -2.92px 29.2px 0px rgba(0,0,0,0.05), 0px -1.42px 14.18px 0px rgba(0,0,0,0.04), 0px -0.69px 6.95px 0px rgba(0,0,0,0.03), 0px -0.27px 2.75px 0px rgba(0,0,0,0.02)',
        }}
      >
        {/* search */}
        <div className="border rounded-lg border-black flex gap-4 p-2">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <input
            type="text"
            placeholder="Recherche"
            className="outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* editions */}
        <div className="flex flex-col gap-5">
          <FilterTitle title="Thèmes" />
          <div className="flex flex-col gap-3">
            {/* All Editions */}
            <Checkbox
              name="all-editions"
              label="Tous les Éditions"
              checked={selectedAllEditions}
              onChange={handleAllEditionsChange}
            />

            {editionsLoading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCheckbox key={i} />)
              : displayedEditions.map((t) => (
                <Checkbox
                  key={t.year}
                  name={`theme-${t.id}`}
                  label={"Édition " + t.year}
                  checked={selectedEditions.includes(t.year)}
                  onChange={(c) => handleEditionChange(t.year, c)}
                />
              ))}

            {!editionsLoading && editions.length > 6 && (
              <button
                className="hover:underline bg-[#EFEFEF] rounded-xl p-[10px] w-fit mt-2 font-medium"
                onClick={() => setShowAllEditions(!showAllEditions)}
              >
                {showAllEditions ? 'Afficher moins' : `Afficher ${editions.length - 6} de plus`}
              </button>
            )}
          </div>
        </div>



        {/* reset */}
        <div className="flex justify-end mt-4">
          <button
            className="text-white font-semibold px-[10px] py-2 rounded-xl bg-[#858585]"
            onClick={resetFilters}
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </aside>
  );
});

export default PreviousEditionSidebar;
