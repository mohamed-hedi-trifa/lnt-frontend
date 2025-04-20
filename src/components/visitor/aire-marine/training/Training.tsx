import React, { useEffect, useState, useRef, } from 'react';
import axios from 'axios'
import HeroSection from '../../HeroSection'
import PageTitle from '@/components/atoms/titles/PageTitle'
import PageBody from '@/components/PageBody'
import formationHero from '../../../../assets/images/formation-hero.jpeg'
import AMCPSidebar from '@/components/layout/AMCPSidebar'
import PageParagraph from '@/components/atoms/PageParagraph'
import ContainerImageMarine from '../ContainerImageMarine'
import TrainingCards from './TrainingCards'
import Question from '@/components/atoms/Question'
import FollowUsTraining from './FollowUsTraining'
import { useTranslation } from '@/contexts/TranslationContext'
import TrainingSideBar from './TrainingSideBar'

const ShimmerBar = ({ className = '' }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
)

const images = [
  { title: 'Explorez l’Aire Marine Protégée', description: 'Préservons ensemble les Îlots Nord de Kerkennah', imageUrl: '/images/aire_marines/marine1.jfif', path: '/protected-air-marine-coastal-areas/monitoring/marin' },
  { title: "Rencontrez l'Équipe de l'AMCP", description: 'Les acteurs engagés pour la préservation des écosystèmes marins', imageUrl: '/images/aire_marines/marine3.jpg', path: '/protected-air-marine-coastal-areas/team' },
]

export default function Training() {
  // const [isOpened, setIsOpened] = useState(false)
  // const { t, lang } = useTranslation()
  // const [themes, setThemes] = useState<any[]>([])
  // const [loadingThemes, setLoadingThemes] = useState(true)
  // const [selectedThemes, setSelectedThemes] = useState<any[]>([])
  // const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null)
  // const [showAllThemes, setShowAllThemes] = useState(false)

  // useEffect(() => {
  //   axios.get('/api/theme').then(res => {
  //     setThemes(res.data)
  //     setLoadingThemes(false)
  //   })
  // }, [])

  // useEffect(() => {
  //   document.querySelector('body')!.style.overflow = isOpened ? 'hidden' : 'visible'
  // }, [isOpened])

  // const handleThemeChange = (id: string, checked: boolean) =>
  //   setSelectedThemes(p => (checked ? [...p, id] : p.filter(i => i !== id)))

  // const displayedThemes = showAllThemes ? themes : themes.slice(0, 6)


  const { lang } = useTranslation();

  // data + loading
  const [themes, setThemes] = useState<any[]>([]);
  const [themesLoading, setThemesLoading] = useState(true);

  // ---- NEW: All‑themes + individual themes state ----
 


  // const [selectedType, setSelectedType] = useState<string[]>([]);
  // const [selectedAllTypes, setSelectedAllTypes] = useState(true);
    // const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
 // const [selectedAllThemes, setSelectedAllThemes] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null); // 'formation', 'campement' or null
const [selectedAllTypes, setSelectedAllTypes] = useState<boolean>(true);

const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
const [selectedAllThemes, setSelectedAllThemes] = useState<boolean>(true);

  const handleAllTypesChange = (checked: boolean) => {
    setSelectedAllTypes(checked);
    if (checked) {
      setSelectedType(null); // Clear specific type selection
    }
  };
  
  const handleTypeChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedAllTypes(false);
      setSelectedType(id); // Only one type selected
    } else {
      setSelectedType(null); // Uncheck
    }
  };
  
  const handleAllThemesChange = (checked: boolean) => {
    setSelectedAllThemes(checked);
    if (checked) {
      setSelectedThemes([]);
    }
  };
  
  const handleThemeChange = (id: string, checked: boolean) => {
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

  const filters = {
    themes: selectedAllThemes ? [] : selectedThemes,
    type: selectedAllTypes ? '' : selectedType,
    dateFilter: selectedDateFilter,
    startDate: isCustomDateRangeModifiedRef.current ? selectedRangeRef.current.startDate : null,
    endDate: isCustomDateRangeModifiedRef.current ? selectedRangeRef.current.endDate : null,
    searchQuery,
  };






  return (
    <main className="relative">
      <div className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${isOpened ? 'opacity-50' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpened(false)} />
      <HeroSection title="Formation et Campement Scientifiques :" subTitle="Connaitre et Agir

        Plonger dans des expériences

        éducatives et scientifiques uniques pour
        
        préserver notre environnement marin " imgSrc={formationHero} />
      <PageTitle title="Formations et Campements Scientifiques" />
      <PageBody>
        <section className="w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10">
          <AMCPSidebar />
          <section className="w-fit text-justify text-[20px] sm:text-[22px] flex flex-col gap-5 py-10 sm:py-0">
            <PageParagraph>
              Dans le cadre de sa mission de préservation et de valorisation des écosystèmes marins, notre association organise des formations et des campements scientifiques qui offrent des expériences éducatives enrichissantes. Ces initiatives visent à transmettre des connaissances scientifiques, sensibiliser à l’importance de la biodiversité, et impliquer divers publics dans des actions concrètes en faveur de l’environnement. Les participants, qu’ils soient étudiants, chercheurs ou amateurs passionnés, ont l’opportunité de contribuer activement à des projets de recherche tout en développant leurs compétences.
            </PageParagraph>
            <PageParagraph>
              Qu’il s’agisse d’une formation spécialisée ou d’un campement scientifique immersif, chaque activité est conçue pour allier théorie et pratique, dans un cadre exceptionnel : les îles de Kerkennah.
            </PageParagraph>
          </section>
        </section>
      </PageBody>

      <section className="max-w-[1400px] mx-auto">
        <hr className="my-6 border-black" />
        <section className="flex flex-col sm:flex-row gap-5">
          <TrainingSideBar

            isSticky={false}
            lang={lang}
            themes={themes}
            themesLoading={themesLoading}
            selectedType={selectedType}
            selectedAllTypes={selectedAllTypes}
            handleAllTypesChange={handleAllTypesChange}
            //TYPE
            handleTypeChange={handleTypeChange}

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
          <TrainingCards filter={filters} setIsOpened={setIsOpened} />
          <section className="flex flex-col mx-4 gap-8">
            <FollowUsTraining />
            <Question />
          </section>
        </section>
      </section>

      <section className="max-w-[1400px] mx-auto my-10">
        <hr className="border-black mx-4" />
        <section className="flex items-start justify-center mb-20 mt-10">
          <div className="w-full flex items-center justify-center">
            <ContainerImageMarine images={images} />
          </div>
        </section>
      </section>
    </main>
  )
}
