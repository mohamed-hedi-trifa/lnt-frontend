// src/components/visitor/who-are-we/our-achievements/OurAchievements.tsx
import React, {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  memo,
} from 'react';
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
import axios from 'axios';
import FollowUsAchivement from './FollowUsAchivement';
import { useTranslation } from '@/contexts/TranslationContext';
import Question from '@/components/atoms/Question';
import DateDropdown from '../../DateDropdown';

const ShimmerBar = ({ className = '' }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
);
const SkeletonCheckbox = () => <ShimmerBar className="h-4 w-40" />;

// -- Extracted & memoized sidebar -------------------------------------------------

type LeftSidebarProps = {
  lang: string;
  themes: any[];
  themesLoading: boolean;
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

const LeftSidebar = memo(function LeftSidebar({
  lang,
  themes,
  themesLoading,
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
      className={`pointer-events-none h-screen sm:h-fit fixed z-50 lg:z-10 sm:sticky sm:top-[116px] inset-0 p-5 transition duration-300 lg:translate-x-0 ${
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
            {themesLoading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCheckbox key={i} />)
              : displayedThemes.map((t) => (
                  <Checkbox
                    key={t.id}
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

        {/* date filters */}
        <div className="flex flex-col gap-5 relative z-50">
          <FilterTitle title="Date" />
          <div className="flex flex-col gap-3">
            {['today', 'week', 'month', 'year'].map((key) => (
              <Checkbox
                key={key}
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

            {/* custom range (optional) */}
            {/* <DateDropdown ...> */}
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

// -- Main component ---------------------------------------------------------------

export default function OurAchievements() {
  const { lang } = useTranslation();

  // data + loading
  const [themes, setThemes] = useState<any[]>([]);
  const [themesLoading, setThemesLoading] = useState(true);

  // filters
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);
  const [showAllThemes, setShowAllThemes] = useState(false);

  // custom range
  const [isCustomRangeActive, setIsCustomRangeActive] = useState(false);
  const [isCustomDropdownOpen, setIsCustomDropdownOpen] = useState(false);
  const selectedRangeRef = useRef<{ startDate: Date; endDate: Date; key: string }>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const isCustomDateRangeModifiedRef = useRef(false);

  // search
  const [searchQuery, setSearchQuery] = useState('');

  // sidebar open
  const [isOpened, setIsOpened] = useState(false);

  // fetch themes once
  useEffect(() => {
    axios.get('/api/theme').then((res) => setThemes(res.data)).finally(() => setThemesLoading(false));
  }, []);

  // lock scroll when sidebar opens
  useEffect(() => {
    document.body.style.overflow = isOpened ? 'hidden' : 'visible';
  }, [isOpened]);

  const handleThemeChange = (id: string, checked: boolean) =>
    setSelectedThemes((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));

  const handleDateRangeChange = (range: any) => {
    selectedRangeRef.current = range;
    isCustomDateRangeModifiedRef.current = true;
    setIsCustomRangeActive(true);
  };

  const resetFilters = () => {
    setSelectedThemes([]);
    setSelectedDateFilter(null);
    setIsCustomRangeActive(false);
    setIsCustomDropdownOpen(false);
    isCustomDateRangeModifiedRef.current = false;
    setSearchQuery('');
  };

  // derive filters dynamically
  const filters = {
    themes: selectedThemes,
    dateFilter: selectedDateFilter,
    startDate: isCustomDateRangeModifiedRef.current ? selectedRangeRef.current.startDate : null,
    endDate: isCustomDateRangeModifiedRef.current ? selectedRangeRef.current.endDate : null,
    searchQuery,
  };

  return (
    <main className="relative">
      {/* overlay */}
      <div
        className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${
          isOpened ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpened(false)}
      />

      {/* hero */}
      <HeroSection
        imgSrc={achievementsHero}
        title="Nos Actions, Notre Impact"
        subTitle={
          <>
            Découvrez les projets qui transforment Kerkennah : des initiatives locales
            qui protègent, valorisent et inspirent
          </>
        }
      />

      <PageTitle title="Our Achievements" />

      <PageBody>
        {/* intro paragraphs... */}
      </PageBody>

      <section className="max-w-[1400px] mx-auto">
        <hr className="my-6 border-black" />
        <div className="flex flex-col sm:flex-row gap-5">
          <LeftSidebar
            lang={lang}
            themes={themes}
            themesLoading={themesLoading}
            selectedThemes={selectedThemes}
            handleThemeChange={handleThemeChange}
            showAllThemes={showAllThemes}
            setShowAllThemes={setShowAllThemes}
            selectedDateFilter={selectedDateFilter}
            setSelectedDateFilter={setSelectedDateFilter}
            isCustomRangeActive={isCustomRangeActive}
            isCustomDropdownOpen={isCustomDropdownOpen}
            setIsCustomDropdownOpen={setIsCustomDropdownOpen}
            handleDateRangeChange={handleDateRangeChange}
            resetFilters={resetFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isOpened={isOpened}
            setIsOpened={setIsOpened}
            selectedRangeRef={selectedRangeRef}
            isCustomDateRangeModifiedRef={isCustomDateRangeModifiedRef}
          />

          {/* achievements list */}
          <section className="flex-1 mx-4 sm:mx-0">
            <AchievementsCards filter={filters} setIsOpened={setIsOpened} />
          </section>

          {/* right widgets */}
          <aside className="flex flex-col mx-4 gap-8">
            <FollowUsAchivement />
            <Question />
          </aside>
        </div>
      </section>

      {/* bottom image */}
      <section className="max-w-6xl mx-auto my-10">
        <hr className="border-black max-w-7xl sm:mx-auto mx-4" />
        <div className="flex items-start justify-center mb-20">
          <ImageHistoire />
        </div>
      </section>
    </main>
  );
}
