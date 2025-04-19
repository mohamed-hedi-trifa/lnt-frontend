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
  themes: any[];
  themesLoading: boolean;

  selectedAllThemes: boolean;
  handleAllThemesChange: (checked: boolean) => void;
  selectedThemes: string[];
  handleThemeChange: (id: string, checked: boolean) => void;
  showAllThemes: boolean;
  setShowAllThemes: Dispatch<SetStateAction<boolean>>;

  selectedDateFilter: string | null;
  setSelectedDateFilter: Dispatch<SetStateAction<string | null>>;
  isCustomRangeActive: boolean;
  isCustomDropdownOpen: boolean;
  setIsCustomDropdownOpen: Dispatch<SetStateAction<boolean>>;
  handleDateRangeChange: (range: any) => void;

  resetFilters: () => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  selectedRangeRef: React.MutableRefObject<{ startDate: Date; endDate: Date; key: string }>;
  isCustomDateRangeModifiedRef: React.MutableRefObject<boolean>;
};

const SidebarFilters = memo(function LeftSidebar({
  isSticky = true,
  lang,
  themes,
  themesLoading,
  selectedAllThemes,
  handleAllThemesChange,
  selectedThemes,
  handleThemeChange,
  showAllThemes,
  setShowAllThemes,
  selectedDateFilter,
  setSelectedDateFilter,
  isCustomRangeActive,
  isCustomDropdownOpen,
  setIsCustomDropdownOpen,
  handleDateRangeChange,
  resetFilters,
  searchQuery,
  setSearchQuery,
  isOpened,
  setIsOpened,
  selectedRangeRef,
  isCustomDateRangeModifiedRef,
}: LeftSidebarProps) {
  const displayedThemes = showAllThemes ? themes : themes.slice(0, 6);

  return (
    <aside
      className={`pointer-events-none h-screen sm:h-fit fixed z-50 lg:z-10 ${
        isSticky ? 'sm:sticky sm:top-[116px]' : 'sm:relative'
      } inset-0 p-5 transition duration-300 lg:translate-x-0 ${
        isOpened ? 'translate-x-0' : 'translate-x-[-100%]'
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

        {/* themes */}
        <div className="flex flex-col gap-5">
          <FilterTitle title="Thèmes" />
          <div className="flex flex-col gap-3">
            {/* All Themes */}
            <Checkbox
              name="all-themes"
              label="Tous les thèmes"
              checked={selectedAllThemes}
              onChange={handleAllThemesChange}
            />

            {themesLoading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCheckbox key={i} />)
              : displayedThemes.map((t) => (
                  <Checkbox
                    key={t.id}
                    name={`theme-${t.id}`}
                    label={t[`name_${lang}`]}
                    checked={selectedThemes.includes(t.id)}
                    onChange={(c) => handleThemeChange(t.id, c)}
                  />
                ))}

            {!themesLoading && themes.length > 6 && (
              <button
                className="hover:underline bg-[#EFEFEF] rounded-xl p-[10px] w-fit mt-2 font-medium"
                onClick={() => setShowAllThemes(!showAllThemes)}
              >
                {showAllThemes ? 'Afficher moins' : `Afficher ${themes.length - 6} de plus`}
              </button>
            )}
          </div>
        </div>

        {/* date filters (exclusive) */}
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

export default SidebarFilters;
