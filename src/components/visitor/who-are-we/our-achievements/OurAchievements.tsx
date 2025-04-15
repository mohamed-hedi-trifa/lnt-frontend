import React, { useEffect, useState, useRef } from 'react';
import ImageHistoire from '../our-team/ImageHistoire';
import AchievementsCards from './AchievementsCards';
import Sidebar from '../../../layout/Sidebar';
import HeroSection from '../../HeroSection';
import achievementsHero from '../../../../assets/images/achievements-hero.jpg';
import PageTitle from '../../../atoms/titles/PageTitle';
import PageParagraph from '../../../atoms/PageParagraph';
import PageBody from '@/components/PageBody';
import DateRangeSelector from '../../who-are-we/our-achievements/DateRangeSelector';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Checkbox from '../../posts/Checkbox';
import FilterTitle from '../../posts/FilterTitle';
import axios from "axios";
import FollowUsAchivement from './FollowUsAchivement';
import { useTranslation } from '@/contexts/TranslationContext';
import Question from '@/components/atoms/Question';
import DateDropdown from '../../DateDropdown';

export default function OurAchievements() {
  const { t, lang } = useTranslation();

  const [themes, setThemes] = useState<any[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<any[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);
  const [isOpened, setIsOpened] = useState(false); // For the sidebar
  const [showAllThemes, setShowAllThemes] = useState(false);

  // New state variables to track custom date range activation and dropdown open state
  const [isCustomRangeActive, setIsCustomRangeActive] = useState(false);
  const [isCustomDropdownOpen, setIsCustomDropdownOpen] = useState(false);

  // Ref for the search input
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Use a ref for the selected date range (for tracking only)
  const selectedRangeRef = useRef<{ startDate: Date; endDate: Date; key: string }>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // isCustomDateRangeModified stored as a ref
  const isCustomDateRangeModifiedRef = useRef(false);

  // Applied filters (updated only on "Appliquer")
  const [appliedFilters, setAppliedFilters] = useState({
    themes: [] as any[],
    dateFilter: null as string | null,
    startDate: null as Date | null,
    endDate: null as Date | null,
    searchQuery: '' as string,
  });

  // Fetch themes on mount
  useEffect(() => {
    axios.get("/api/theme").then((res) => {
      setThemes(res.data);
    });
  }, []);

  // Body scrolling toggling
  useEffect(() => {
    document.querySelector("body")!.style.overflow = isOpened ? "hidden" : "visible";
  }, [isOpened]);

  // Handle theme changes
  const handleThemeChange = (themeId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedThemes((prev) => [...prev, themeId]);
    } else {
      setSelectedThemes((prev) => prev.filter((id) => id !== themeId));
    }
  };

  // Callback passed to DateRangeSelector: update the ref and mark that it has been modified
  const handleDateRangeChange = (range: any) => {
    selectedRangeRef.current = range;
    isCustomDateRangeModifiedRef.current = true;
    setIsCustomRangeActive(true);
  };

  // Apply filters—read the current date range from the ref
  const applyFilters = () => {
    const searchQueryValue = searchInputRef.current ? searchInputRef.current.value : '';
    setAppliedFilters({
      themes: selectedThemes,
      dateFilter: selectedDateFilter,
      startDate: isCustomDateRangeModifiedRef.current ? selectedRangeRef.current.startDate : null,
      endDate: isCustomDateRangeModifiedRef.current ? selectedRangeRef.current.endDate : null,
      searchQuery: searchQueryValue,
    });
    setIsOpened(false);
  };

  // Reset filters and clear the search field
  const resetFilters = () => {
    setSelectedThemes([]);
    setSelectedDateFilter(null);
    setIsCustomRangeActive(false);
    setIsCustomDropdownOpen(false);
    isCustomDateRangeModifiedRef.current = false;
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  const displayedThemes = showAllThemes ? themes : themes.slice(0, 6);

  // Sidebar sub-component
  const LeftSidebar = () => (
    <aside
      className={`pointer-events-none h-screen sm:h-fit fixed z-50 lg:z-10 sm:sticky sm:top-[116px] inset-0 p-5
        transition duration-300 lg:translate-x-0
        ${isOpened ? 'translate-x-0' : 'translate-x-[-100%]'} 
      `}
    >
      <div
        className="opacity-90 sm:opacity-100 bg-white flex flex-col p-[10px] gap-4 sm:gap-10 w-full sm:w-[320px] rounded-xl shadow-xl overflow-y-auto pointer-events-auto h-full"
        style={{
          boxShadow:
            "0px -8px 80px 0px rgba(0,0,0,0.07), 0px -2.92px 29.2px 0px rgba(0,0,0,0.05), 0px -1.42px 14.18px 0px rgba(0,0,0,0.04), 0px -0.69px 6.95px 0px rgba(0,0,0,0.03), 0px -0.27px 2.75px 0px rgba(0,0,0,0.02)"
        }}
      >
        {/* --- Search Input --- */}
        <div className="border rounded-lg border-black flex gap-4 p-2">
          <MagnifyingGlassIcon className="size-5" />
          <input
            type="text"
            placeholder="Recherche"
            className="outline-none"
            ref={searchInputRef}
          />
        </div>
        
        {/* --- Themes --- */}
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
              !showAllThemes ? (
                <button
                  className="hover:underline bg-[#EFEFEF] rounded-xl p-[10px] w-fit mt-2 font-medium"
                  onClick={() => setShowAllThemes(true)}
                >
                  Afficher {themes.length - 6} de plus
                </button>
              ) : (
                <button
                  className="hover:underline bg-[#EFEFEF] rounded-xl p-[10px] w-fit mt-2 font-medium"
                  onClick={() => setShowAllThemes(false)}
                >
                  Afficher moins
                </button>
              )
            )}
          </div>
        </div>

        {/* --- Dates --- */}
        <div className="flex flex-col gap-5 relative z-50">
          <FilterTitle title="Date" />
          <div className="flex flex-col gap-3">
            <Checkbox 
              label="Aujourd'hui" 
              checked={selectedDateFilter === 'today'}
              onChange={(checked) => {
                if (checked) {
                  setSelectedDateFilter('today');
                  setIsCustomRangeActive(false);
                  setIsCustomDropdownOpen(false);
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
                  setIsCustomRangeActive(false);
                  setIsCustomDropdownOpen(false);
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
                  setIsCustomRangeActive(false);
                  setIsCustomDropdownOpen(false);
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
                  setIsCustomRangeActive(false);
                  setIsCustomDropdownOpen(false);
                } else {
                  setSelectedDateFilter(null);
                }
              }}
            />

            {/* "Configurer" date range using DateDropdown */}
            <DateDropdown
              onOpen={() => setIsCustomDropdownOpen(true)}
              onClose={() => setIsCustomDropdownOpen(false)}
              item={
                <DateRangeSelector
                  value={selectedRangeRef.current}
                  onDateRangeChange={handleDateRangeChange}
                />
              }
              position="left"
              renderItem={(item) => <div className="py-1">{item}</div>}
            >
              {(isOpen) => (
                <Checkbox 
                  label="Configurer" 
                  checked={isOpen || isCustomRangeActive} 
                  onChange={(checked) => {
                    if (isOpen || isCustomRangeActive) {
                      // Uncheck only when explicitly toggling the custom range off
                      setIsCustomRangeActive(false);
                      setIsCustomDropdownOpen(false);
                    } else {
                      // Open the dropdown for custom range selection
                      setIsCustomDropdownOpen(true);
                      setSelectedDateFilter(null);
                    }
                  }}
                />
              )}
            </DateDropdown>
          </div>
        </div>

        {/* --- Apply & Reset --- */}
        <div className="flex justify-between">
          <button
            className="bg-primary text-sm text-white px-[10px] py-2 rounded-xl font-semibold"
            onClick={applyFilters}
          >
            Appliquer
          </button>
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

  return (
    <main className="relative">
      {/* Overlay for the sidebar in mobile */}
      <div
        className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${
          isOpened ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpened(false)}
      />

      {/* Hero */}
      <HeroSection
        imgSrc={achievementsHero}
        title="Nos Actions, Notre Impact"
        subTitle={
          <div>
            <div>Découvrez les projets qui transforment Kerkennah :</div> 
            des initiatives locales qui protègent, valorisent et inspirent
          </div>
        }
      />

      <PageTitle title="Our Achievements" />

      <PageBody>
        <section className="w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10">
          <Sidebar />
          <section className="w-fit flex flex-col gap-4">
            <PageParagraph>
              Depuis sa création, l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) s'engage activement pour la préservation de l'archipel de Kerkennah...
            </PageParagraph>
            <PageParagraph>
              Chaque projet est réalisé en étroite collaboration avec nos partenaires...
            </PageParagraph>
          </section>
        </section>
      </PageBody>

      <section className="max-w-[1400px] mx-auto">
        <hr className="my-6 border-black" />
        <section className="flex flex-col sm:flex-row gap-5">
          <LeftSidebar />
          
          {/* Main content */}
          <section className="flex-1 mx-4 sm:mx-0">
            <AchievementsCards 
              filter={appliedFilters}
              setIsOpened={setIsOpened}
            />
          </section>

          {/* Right side items */}
          <section className="flex flex-col mx-4 gap-8">
            <FollowUsAchivement />
            <Question />
          </section>
        </section>
      </section>

      <section className="max-w-6xl mx-auto my-10">
        <hr className="border-black max-w-7xl sm:mx-auto mx-4" />
        <section className="flex items-start justify-center mb-20">
          <div className="w-full flex items-center justify-center sm:mx-0 mx-4">
            <ImageHistoire />
          </div>
        </section>
      </section>
    </main>
  );
}
