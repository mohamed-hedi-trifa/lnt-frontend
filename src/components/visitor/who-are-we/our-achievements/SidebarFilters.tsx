import React, { useEffect, useState } from 'react';
import axios from "axios";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ButtonDropdown from '@/components/ButtonDropdown';
import DateRangeSelector from '../../who-are-we/our-achievements/DateRangeSelector';
import Checkbox from '../../posts/Checkbox';
import FilterTitle from '../../posts/FilterTitle';
import { useTranslation } from '@/contexts/TranslationContext';

interface SidebarFiltersProps {
  onApply: (filters: {
    themes: any[];
    dateFilter: string | null;
    startDate: Date | null;
    endDate: Date | null;
    searchQuery: string;
  }) => void;
  onReset: () => void;
}

const SidebarFilters = React.memo(function SidebarFilters({ onApply, onReset }: SidebarFiltersProps) {
  const { t, lang } = useTranslation();
  const [themes, setThemes] = useState<any[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<any[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);
  const [showAllThemes, setShowAllThemes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Initial calendar value for display only
  const [selectedRange, setSelectedRange] = useState<{ startDate: Date; endDate: Date; key: string }>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  });
  // Flag to indicate whether the user has changed the date range.
  const [isCustomDateRangeModified, setIsCustomDateRangeModified] = useState(false);

  useEffect(() => {
    axios.get("/api/theme").then((res) => {
      setThemes(res.data);
    });
  }, []);

  function handleThemeChange(themeId: string, isChecked: boolean) {
    if (isChecked) {
      setSelectedThemes((prev) => [...prev, themeId]);
    } else {
      setSelectedThemes((prev) => prev.filter((id) => id !== themeId));
    }
  }

  const handleDateRangeChange = (range: any) => {
    setSelectedRange(range);
    setIsCustomDateRangeModified(true);
  };

  const displayedThemes = showAllThemes ? themes : themes.slice(0, 6);

  return (
    <aside
      className="sm:hidden pointer-events-auto fixed z-50 inset-0 p-5 transition duration-300"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="opacity-90 bg-white flex flex-col p-[10px] gap-4 sm:gap-10 w-full rounded-xl shadow-xl overflow-y-auto h-full"
        style={{
          boxShadow:
            "0px -8px 80px 0px rgba(0,0,0,0.07), 0px -2.92px 29.2px 0px rgba(0,0,0,0.05), 0px -1.42px 14.18px 0px rgba(0,0,0,0.04), 0px -0.69px 6.95px 0px rgba(0,0,0,0.03), 0px -0.27px 2.75px 0px rgba(0,0,0,0.02)"
        }}
      >
        <div className="border rounded-lg border-black flex gap-4 p-2">
          <MagnifyingGlassIcon className="size-5" />
          <input
            type="text"
            placeholder="Recherche"
            className="outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-5">
          <FilterTitle title="Thèmes" />
          <div className="flex flex-col gap-3">
            {displayedThemes.map((theme: any) => (
              <Checkbox
                key={theme.id}
                label={theme[`name_${lang}`]}
                checked={selectedThemes.includes(theme.id)}
                onChange={(checked) => handleThemeChange(theme.id, checked)}
              />
            ))}
            {themes.length > 6 && (
              <>
                {!showAllThemes && (
                  <button
                    className="hover:underline bg-[#EFEFEF] rounded-xl p-[10px] w-fit mt-2 font-medium"
                    onClick={() => setShowAllThemes(true)}
                  >
                    Afficher {themes.length - 6} de plus
                  </button>
                )}
                {showAllThemes && (
                  <button
                    className="hover:underline bg-[#EFEFEF] rounded-xl p-[10px] w-fit mt-2 font-medium"
                    onClick={() => setShowAllThemes(false)}
                  >
                    Afficher moins
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5 relative z-50">
          <FilterTitle title="Date" />
          <div className="flex flex-col gap-3">
            <Checkbox 
              label="Aujourd'hui" 
              checked={selectedDateFilter === 'today'}
              onChange={(checked) => setSelectedDateFilter(checked ? 'today' : null)}
            />
            <Checkbox 
              label="Cette Semaine" 
              checked={selectedDateFilter === 'week'}
              onChange={(checked) => setSelectedDateFilter(checked ? 'week' : null)}
            />
            <Checkbox 
              label="Ce Mois" 
              checked={selectedDateFilter === 'month'}
              onChange={(checked) => setSelectedDateFilter(checked ? 'month' : null)}
            />
            <Checkbox 
              label="Cette Année" 
              checked={selectedDateFilter === 'year'}
              onChange={(checked) => setSelectedDateFilter(checked ? 'year' : null)}
            />
          {/*  <ButtonDropdown
              customDropdown={true}
              item={
                <DateRangeSelector
                  value={selectedRange}
                  onDateRangeChange={handleDateRangeChange}
                />
              }
              position="left"
              renderItem={(item) => <div className="py-1">{item}</div>}
            >
              {(isOpen) => <Checkbox label="Configurer" />}
            </ButtonDropdown> */}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-primary text-sm text-white px-[10px] py-2 rounded-xl font-semibold"
            onClick={() => {
              onApply({
                themes: selectedThemes,
                dateFilter: selectedDateFilter,
                startDate: isCustomDateRangeModified ? selectedRange.startDate : null,
                endDate: isCustomDateRangeModified ? selectedRange.endDate : null,
                searchQuery
              });
            }}
          >
            Appliquer
          </button>
          <button
            className="text-white font-semibold px-[10px] py-2 rounded-xl bg-[#858585]"
            onClick={() => {
              setSelectedThemes([]);
              setSelectedDateFilter(null);
              setIsCustomDateRangeModified(false);
              setSearchQuery("");
              if (onReset) onReset();
            }}
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </aside>
  );
});

export { SidebarFilters };
