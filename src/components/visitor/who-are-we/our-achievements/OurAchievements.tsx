// src/components/visitor/who-are-we/our-achievements/OurAchievements.tsx
import React, {
  useEffect,
  useState,
  useRef,
} from 'react';
import ImageHistoire from '../our-team/ImageHistoire';
import AchievementsCards from './AchievementsCards';
import Sidebar from '../../../layout/Sidebar';
import HeroSection from '../../HeroSection';
import achievementsHero from '../../../../assets/images/achievements-hero.jpg';
import PageTitle from '../../../atoms/titles/PageTitle';
import PageParagraph from '../../../atoms/PageParagraph';
import PageBody from '@/components/PageBody';
import axios from 'axios';
import FollowUsAchivement from './FollowUsAchivement';
import { useTranslation } from '@/contexts/TranslationContext';
import Question from '@/components/atoms/Question';
import SidebarFilters from './SidebarFilters';

export default function OurAchievements() {
  const { lang } = useTranslation();

  // data + loading
  const [themes, setThemes] = useState<any[]>([]);
  const [themesLoading, setThemesLoading] = useState(true);

  // ---- NEW: All‑themes + individual themes state ----
  const [selectedAllThemes, setSelectedAllThemes] = useState(true);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  const handleAllThemesChange = (checked: boolean) => {
    setSelectedAllThemes(checked);
    if (checked) {
      // deselect all individual themes
      setSelectedThemes([]);
    }
  };

  const handleThemeChange = (id: string, checked: boolean) => {
    // if user starts picking individual themes, clear "All Themes"
    if (checked && selectedAllThemes) {
      setSelectedAllThemes(false);
    }
    setSelectedThemes((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  // filters
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
  const handleDateRangeChange = (range: any) => {
    selectedRangeRef.current = range;
    isCustomDateRangeModifiedRef.current = true;
    setIsCustomRangeActive(true);
  };

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

  const resetFilters = () => {
    setSelectedAllThemes(false);
    setSelectedThemes([]);
    setSelectedDateFilter(null);
    setIsCustomRangeActive(false);
    setIsCustomDropdownOpen(false);
    isCustomDateRangeModifiedRef.current = false;
    setSearchQuery('');
  };

  // derive filters dynamically
  const filters = {
    themes: selectedAllThemes ? [] : selectedThemes,
    dateFilter: selectedDateFilter,
    startDate: isCustomDateRangeModifiedRef.current ? selectedRangeRef.current.startDate : null,
    endDate: isCustomDateRangeModifiedRef.current ? selectedRangeRef.current.endDate : null,
    searchQuery,
  };

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
            Depuis sa création, l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) s'engage activement pour la préservation et le rayonnement de l'archipel de Kerkennah, en intégrant harmonieusement développement durable, protection de l’environnement et valorisation du patrimoine culturel local. À travers nos différents projets, nous œuvrons pour créer un impact durable et concret au sein de la communauté. Nous soutenons activement les pratiques de pêche responsables, encourageons les initiatives éducatives et environnementales, et mettons en avant les richesses culturelles uniques de Kerkennah par des événements, des formations et des ateliers participatifs
            </PageParagraph>
            <PageParagraph>
            Chaque réalisation menée à bien par notre association reflète un engagement collectif et un travail collaboratif avec nos partenaires locaux, régionaux et internationaux, ainsi qu’avec les habitants, qui demeurent au cœur de toutes nos actions. Nos projets permettent non seulement de sensibiliser aux défis écologiques contemporains, mais aussi de stimuler l’économie locale de manière responsable, de préserver les traditions ancestrales, et d'améliorer la qualité de vie de la communauté.
            </PageParagraph>
          </section>
        </section>
      </PageBody>

      <section className="max-w-[1400px] mx-auto">
        <hr className="my-6 border-black" />
        <div className="flex flex-col sm:flex-row gap-5">
          <SidebarFilters
            isSticky={false}
            lang={lang}
            themes={themes}
            themesLoading={themesLoading}

            // themes props
            selectedAllThemes={selectedAllThemes}
            handleAllThemesChange={handleAllThemesChange}
            selectedThemes={selectedThemes}
            handleThemeChange={handleThemeChange}
            showAllThemes={showAllThemes}
            setShowAllThemes={setShowAllThemes}

            // date props
            selectedDateFilter={selectedDateFilter}
            setSelectedDateFilter={setSelectedDateFilter}
            isCustomRangeActive={isCustomRangeActive}
            isCustomDropdownOpen={isCustomDropdownOpen}
            setIsCustomDropdownOpen={setIsCustomDropdownOpen}
            handleDateRangeChange={handleDateRangeChange}

            // common
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
