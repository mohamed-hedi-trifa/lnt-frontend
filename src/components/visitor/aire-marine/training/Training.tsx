import React, { useEffect, useState } from 'react'
import HeroSection from '../../HeroSection'
import PageTitle from '@/components/atoms/titles/PageTitle'
import PageBody from '@/components/PageBody'
import formationHero from '../../../../assets/images/formation-hero.jpeg'
import AMCPSidebar from '@/components/layout/AMCPSidebar'
import PageParagraph from '@/components/atoms/PageParagraph'
import ContainerImageMarine from '../ContainerImageMarine'
import ButtonDropdown from '@/components/ButtonDropdown'
import DateRangeSelector from '../../who-are-we/our-achievements/DateRangeSelector'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Checkbox from '../../posts/Checkbox'
import FilterTitle from '../../posts/FilterTitle'
import { Link } from 'gatsby'
import TrainingCards from './TrainingCards'
import Question from '@/components/atoms/Question'
import FollowUsTraining from './FollowUsTraining'
import axios from "axios";
import { useTranslation } from '@/contexts/TranslationContext'



const images = [
  {
    title: 'Explorez l’Aire Marine Protégée',
    description: 'Préservons ensemble les Îlots Nord de Kerkennah',
    imageUrl: '/images/aire_marines/marine1.jfif',
    path: '/protected-air-marine-coastal-areas/monitoring/marin'
  },
  {
    title: "Rencontrez l'Équipe de l'AMCP",
    description: 'Les acteurs engagés pour la préservation des écosystèmes marins',
    imageUrl: '/images/aire_marines/marine3.jpg',
    path: '/protected-air-marine-coastal-areas/team'
  }
]

export default function Training() {
  const [isOpened, setIsOpened] = useState(false);
  const { t, lang } = useTranslation();
  const [themes, setThemes] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState<any[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);
  const [showAllThemes, setShowAllThemes] = useState(false);

  useEffect(() => {
    console.log(selectedThemes);
  }, [selectedThemes]);

  function getThemes() {
    axios.get("/api/theme").then((res) => {
      setThemes(res.data);
    });
  }

  useEffect(() => {
    if (isOpened) {
      document.querySelector("body")!.style.overflow = "hidden";
    } else {
      document.querySelector("body")!.style.overflow = "visible";
    }
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

  // Decide how many to display
  const displayedThemes = showAllThemes ? themes : themes.slice(0, 6);



  const LeftSidebar = () => (
  <aside 
    className={`pointer-events-none h-screen sm:h-fit fixed z-50 lg:z-10 sm:sticky sm:top-[116px] inset-0 p-5 transition duration-300 lg:translate-x-0 
    ${isOpened ? "translate-x-0" : "translate-x-[-100%]"
    }`} 
  >
    <div className='opacity-90 sm:opacity-100  bg-white flex flex-col p-[10px] gap-4 sm:gap-10 w-full sm:w-[320px] rounded-xl shadow-xl overflow-y-auto pointer-events-auto h-full'
      style={{
        boxShadow: "0px -8px 80px 0px rgba(0, 0, 0, 0.07), 0px -2.92px 29.2px 0px rgba(0, 0, 0, 0.05), 0px -1.42px 14.18px 0px rgba(0, 0, 0, 0.04), 0px -0.69px 6.95px 0px rgba(0, 0, 0, 0.03), 0px -0.27px 2.75px 0px rgba(0, 0, 0, 0.02)"
      }}>
      <div className="border rounded-lg border-black flex gap-4 p-2">
        <MagnifyingGlassIcon className="size-5" />
        <input type="text" placeholder="Recherche" />
      </div>

      {/* Type d'activité */}
      <div className="flex flex-col gap-5">
        <FilterTitle title="Type d'activité" />
        <div className="flex flex-col gap-3">
          <Checkbox label="Tous les types" nb={10} />
          <Checkbox label="Formation" />
          <Checkbox label="Campement Scientifique" />
        </div>
      </div>

      {/* Thèmes */}
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

        {/* Date Filter Section */}
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
              item={<DateRangeSelector />}
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
              // Reset filters
              setSelectedThemes([]);
              setSelectedDateFilter(null);
            }}
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <main className={`relative`}>
      <div className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${isOpened ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpened(false)}></div>
      <HeroSection title="Formation et Campement Scientifiques :" subTitle="Connaitre et Agir

        Plonger dans des expériences

        éducatives et scientifiques uniques pour
        
        préserver notre environnement marin " imgSrc={formationHero} />
      <PageTitle
        title="Formations et Campements Scientifiques"
      />
      <PageBody >
        <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
          <AMCPSidebar />
          <section className='w-fit text-justify text-[20px] sm:text-[22px] flex flex-col gap-5 py-10 sm:py-0'>
            <PageParagraph>Dans le cadre de sa mission de préservation et de valorisation des écosystèmes marins, notre association organise des formations et des campements scientifiques qui offrent des expériences éducatives enrichissantes. Ces initiatives visent à transmettre des connaissances scientifiques, sensibiliser à l’importance de la biodiversité, et impliquer divers publics dans des actions concrètes en faveur de l’environnement. Les participants, qu’ils soient étudiants, chercheurs ou amateurs passionnés, ont l’opportunité de contribuer activement à des projets de recherche tout en développant leurs compétences.</PageParagraph>
            <PageParagraph>Qu’il s’agisse d’une formation spécialisée ou d’un campement scientifique immersif, chaque activité est conçue pour allier théorie et pratique, dans un cadre exceptionnel : les îles de Kerkennah.</PageParagraph>
          </section>
        </section>
      </PageBody>
      <section className='max-w-[1400px] mx-auto'>
        <hr className='my-6  border-black' />

        <section className="flex flex-col sm:flex-row gap-5">
          {/* Sidebar */}
          <LeftSidebar />
          <TrainingCards
            filter={{ themes: selectedThemes, dateFilter: selectedDateFilter }} 
            setIsOpened={setIsOpened}
          />
          <section className="flex flex-col mx-4 gap-8" >
            <FollowUsTraining />
            <Question />
          </section>
        </section>

      </section>
      <section className='max-w-6xl mx-auto my-10'>
        <hr className='border-black'></hr>
        <section className='flex items-start justify-center mb-20 mt-10'>

          <div className='w-full flex items-center justify-center '>
            <ContainerImageMarine images={images} />
          </div>

        </section>
      </section>
    </main>
  )
}
