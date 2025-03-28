import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import FilterTitle from './FilterTitle'
import DateRangeSelector from '../who-are-we/our-achievements/DateRangeSelector'
import ButtonDropdown from '@/components/ButtonDropdown'
import Checkbox from './Checkbox'
import axios from 'axios'
import { useTranslation } from '@/contexts/TranslationContext'


export default function LeftSidebar() {
  const [selectedThemes, setSelectedThemes] = useState<any[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [showAllThemes, setShowAllThemes] = useState(false);
  const [isCustomDateRangeModified, setIsCustomDateRangeModified] = useState(false);
  const [themes, setThemes] = useState([]);
  const { t, lang } = useTranslation();

  const [selectedRange, setSelectedRange] = useState<{ startDate: Date; endDate: Date; key: string }>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  });

  function getThemes() {
    axios.get("/api/theme").then((res) => {
      setThemes(res.data);
    });
  }

  useEffect(() => {
    document.querySelector("body")!.style.overflow = isOpened ? "hidden" : "visible";
  }, [isOpened]);

  useEffect(() => {
    getThemes();
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
      className={`pointer-events-none h-screen sm:h-fit fixed z-50 lg:z-10 sm:sticky sm:top-[116px] inset-0 p-5 transition duration-300 lg:translate-x-0 ${
        isOpened ? "translate-x-0" : "translate-x-[-100%]"
      }`}
    >
      <div
        className="opacity-90 sm:opacity-100 bg-white flex flex-col p-[10px] gap-4 sm:gap-10 w-full sm:w-[320px] rounded-xl shadow-xl overflow-y-auto pointer-events-auto h-full"
        style={{
          boxShadow:
            "0px -8px 80px 0px rgba(0, 0, 0, 0.07), 0px -2.92px 29.2px 0px rgba(0, 0, 0, 0.05), 0px -1.42px 14.18px 0px rgba(0, 0, 0, 0.04), 0px -0.69px 6.95px 0px rgba(0, 0, 0, 0.03), 0px -0.27px 2.75px 0px rgba(0, 0, 0, 0.02)"
        }}
      >
        <div className="border rounded-lg border-black flex gap-4 p-2">
          <MagnifyingGlassIcon className="size-5" />
          <input type="text" placeholder="Recherche" />
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
            <ButtonDropdown
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
            </ButtonDropdown>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-primary text-sm text-white px-[10px] py-2 rounded-xl font-semibold"
            onClick={() => setIsOpened(false)}
          >
            Appliquer
          </button>
          <button
            className="text-white font-semibold px-[10px] py-2 rounded-xl bg-[#858585]"
            onClick={() => {
              setSelectedThemes([]);
              setSelectedDateFilter(null);
              setIsCustomDateRangeModified(false);
            }}
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </aside>
  )
}
