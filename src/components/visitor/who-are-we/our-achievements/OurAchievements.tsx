// src/components/visitor/who-are-we/our-achievements/OurAchievements.tsx
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

export default function OurAchievements() {
  const { lang } = useTranslation();

  const [themes, setThemes] = useState<any[]>([]);
  const [themesLoading, setThemesLoading] = useState(true);

  const [selectedThemes, setSelectedThemes] = useState<any[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);
  const [isOpened, setIsOpened] = useState(false); /* sidebar */
  const [showAllThemes, setShowAllThemes] = useState(false);

  const [isCustomRangeActive, setIsCustomRangeActive] = useState(false);
  const [isCustomDropdownOpen, setIsCustomDropdownOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedRangeRef = useRef<{ startDate: Date; endDate: Date; key: string }>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const isCustomDateRangeModifiedRef = useRef(false);

  const [appliedFilters, setAppliedFilters] = useState({
    themes: [] as any[],
    dateFilter: null as string | null,
    startDate: null as Date | null,
    endDate: null as Date | null,
    searchQuery: '' as string,
  });

  /* ▸ fetch themes */
  useEffect(() => {
    axios
      .get('/api/theme')
      .then((res) => setThemes(res.data))
      .finally(() => setThemesLoading(false));
  }, []);

  /* ▸ lock body on sidebar open */
  useEffect(() => {
    document.querySelector('body')!.style.overflow = isOpened ? 'hidden' : 'visible';
  }, [isOpened]);

  /* ▸ theme change */
  const handleThemeChange = (themeId: string, checked: boolean) =>
    setSelectedThemes((prev) =>
      checked ? [...prev, themeId] : prev.filter((id) => id !== themeId)
    );

  /* ▸ custom date change */
  const handleDateRangeChange = (range: any) => {
    selectedRangeRef.current = range;
    isCustomDateRangeModifiedRef.current = true;
    setIsCustomRangeActive(true);
  };

  /* ▸ apply / reset */
  const applyFilters = () => {
    const q = searchInputRef.current?.value ?? '';
    setAppliedFilters({
      themes: selectedThemes,
      dateFilter: selectedDateFilter,
      startDate: isCustomDateRangeModifiedRef.current
        ? selectedRangeRef.current.startDate
        : null,
      endDate: isCustomDateRangeModifiedRef.current ? selectedRangeRef.current.endDate : null,
      searchQuery: q,
    });
    setIsOpened(false);
  };
  const resetFilters = () => {
    setSelectedThemes([]);
    setSelectedDateFilter(null);
    setIsCustomRangeActive(false);
    setIsCustomDropdownOpen(false);
    isCustomDateRangeModifiedRef.current = false;
    if (searchInputRef.current) searchInputRef.current.value = '';
  };

  const displayedThemes = showAllThemes ? themes : themes.slice(0, 6);

  /* ▸ sidebar component */
  const LeftSidebar = () => (
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
          <MagnifyingGlassIcon className="size-5" />
          <input type="text" placeholder="Recherche" className="outline-none" ref={searchInputRef} />
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

        {/* dates */}
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
                    setIsCustomRangeActive(false);
                    setIsCustomDropdownOpen(false);
                  } else setSelectedDateFilter(null);
                }}
              />
            ))}

            {/* custom range */}
            <DateDropdown
              onOpen={() => setIsCustomDropdownOpen(true)}
              onClose={() => setIsCustomDropdownOpen(false)}
              item={
                <DateRangeSelector value={selectedRangeRef.current} onDateRangeChange={handleDateRangeChange} />
              }
              position="left"
              renderItem={(i) => <div className="py-1">{i}</div>}
            >
              {(open) => (
                <Checkbox
                  label="Configurer"
                  checked={open || isCustomRangeActive}
                  onChange={() => {
                    if (open || isCustomRangeActive) {
                      setIsCustomRangeActive(false);
                      setIsCustomDropdownOpen(false);
                    } else {
                      setIsCustomDropdownOpen(true);
                      setSelectedDateFilter(null);
                    }
                  }}
                />
              )}
            </DateDropdown>
          </div>
        </div>

        {/* buttons */}
        <div className="flex justify-between">
          <button className="bg-primary text-sm text-white px-[10px] py-2 rounded-xl font-semibold" onClick={applyFilters}>
            Appliquer
          </button>
          <button className="text-white font-semibold px-[10px] py-2 rounded-xl bg-[#858585]" onClick={resetFilters}>
            Réinitialiser
          </button>
        </div>
      </div>
    </aside>
  );

  /* ▸ render */
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
        <section className="w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10">
          <Sidebar />
          <section className="w-fit flex flex-col gap-4">
            <PageParagraph>
            Depuis sa création, l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL)
             s'engage activement pour la préservation et le rayonnement de l'archipel de Kerkennah, en intégrant
              harmonieusement développement durable, protection de l’environnement et valorisation du patrimoine culturel local.
               À travers nos différents projets, nous œuvrons pour créer un impact durable et concret au sein de la communauté. 
               Nous soutenons activement les pratiques de pêche responsables, encourageons les initiatives éducatives et environnementales, 
               et mettons en avant les richesses culturelles uniques de Kerkennah par des événements, des formations et des ateliers participatifs.
            </PageParagraph>
            <PageParagraph>
            Chaque réalisation menée à bien par notre association reflète un engagement collectif et un travail collaboratif avec nos partenaires locaux,
             régionaux et internationaux, ainsi qu’avec les habitants, qui demeurent au cœur de toutes nos actions. 
             Nos projets permettent non seulement de sensibiliser aux défis écologiques contemporains, 
             mais aussi de stimuler l’économie locale de manière responsable, de préserver les traditions ancestrales, et d'améliorer la qualité de vie de la communauté.
            </PageParagraph>
          </section>
        </section>
      </PageBody>

      <section className="max-w-[1400px] mx-auto">
        <hr className="my-6 border-black" />
        <section className="flex flex-col sm:flex-row gap-5">
          <LeftSidebar />

          {/* achievements list */}
          <section className="flex-1 mx-4 sm:mx-0">
            <AchievementsCards filter={appliedFilters} setIsOpened={setIsOpened} />
          </section>

          {/* right widgets */}
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
