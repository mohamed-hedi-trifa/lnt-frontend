import React, { useEffect, useState } from 'react';
import ImageHistoire from '../our-team/ImageHistoire';
import AchievementsCards from './AchievementsCards';
import Sidebar from '../../../layout/Sidebar';
import HeroSection from '../../HeroSection';
import achievementsHero from '../../../../assets/images/achievements-hero.jpg';
import PageTitle from '../../../atoms/titles/PageTitle';
import PageParagraph from '../../../atoms/PageParagraph';
import PageBody from '@/components/PageBody';
import ButtonDropdown from '@/components/ButtonDropdown';
import DateRangeSelector from '../../who-are-we/our-achievements/DateRangeSelector';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Checkbox from '../../posts/Checkbox';
import FilterTitle from '../../posts/FilterTitle';
import axios from "axios";
import FollowUsAchivement from './FollowUsAchivement';
import QuestionAchivement from './QuestionAchivement';
import { useTranslation } from '@/contexts/TranslationContext';

export default function OurAchievements() {
  const { t, lang } = useTranslation();
  const [themes, setThemes] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState<any[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [showAllThemes, setShowAllThemes] = useState(false);
  
  // Initial calendar value; note that this value is only used for displaying the calendar.
  const [selectedRange, setSelectedRange] = useState<{ startDate: Date; endDate: Date; key: string }>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  });
  // Flag to indicate whether the user has changed the date range.
  const [isCustomDateRangeModified, setIsCustomDateRangeModified] = useState(false);

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

  const LeftSidebar = () => (
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
  );

  return (
    <main className="relative">
      <div
        className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${
          isOpened ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpened(false)}
      />
      <HeroSection
        imgSrc={achievementsHero}
        title="Nos Actions, Notre Impact"
        subTitle={
          <div>
            <div>Découvrez les projets qui transforment Kerkennah :</div> des initiatives locales qui protègent, valorisent et inspirent
          </div>
        }
      />
      <PageTitle title="Our Achievements" />
      <PageBody>
        <section className="w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10">
          <Sidebar />
          <section className="w-fit flex flex-col gap-4">
            <PageParagraph>
              Depuis sa création, l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) s'engage activement pour la préservation de l'archipel de Kerkennah, en alliant le développement durable, la protection de l’environnement et la valorisation de la culture locale. Nous menons des initiatives variées, allant du soutien aux pratiques de pêche durable aux projets éducatifs et culturels, afin de créer un impact positif et pérenne pour notre communauté.
            </PageParagraph>
            <PageParagraph>
              Chaque projet est réalisé en étroite collaboration avec nos partenaires locaux et internationaux, ainsi qu’avec la communauté, qui est au cœur de notre démarche. Leur héritage continue de guider nos actions pour la pérennité et le dynamisme de Kerkennah.
            </PageParagraph>
          </section>
        </section>
      </PageBody>
      <section className="max-w-[1400px] mx-auto">
        <hr className="my-6 border-black" />
        <section className="flex flex-col sm:flex-row gap-5">
          <LeftSidebar />
          <section className="flex-1 mx-4 sm:mx-0">
            <AchievementsCards 
              filter={{ 
                themes: selectedThemes, 
                dateFilter: selectedDateFilter,
                startDate: isCustomDateRangeModified ? selectedRange.startDate : null,
                endDate: isCustomDateRangeModified ? selectedRange.endDate : null
              }} 
              setIsOpened={setIsOpened} 
            />
          </section>
          <section className="flex flex-col mx-4 gap-8">
            <FollowUsAchivement />
            <QuestionAchivement />
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
