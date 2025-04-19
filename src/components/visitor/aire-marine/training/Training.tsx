import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
import TrainingCards from './TrainingCards'
import Question from '@/components/atoms/Question'
import FollowUsTraining from './FollowUsTraining'
import { useTranslation } from '@/contexts/TranslationContext'

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
  const [isOpened, setIsOpened] = useState(false)
  const { t, lang } = useTranslation()
  const [themes, setThemes] = useState<any[]>([])
  const [loadingThemes, setLoadingThemes] = useState(true)
  const [selectedThemes, setSelectedThemes] = useState<any[]>([])
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null)
  const [showAllThemes, setShowAllThemes] = useState(false)

  useEffect(() => {
    axios.get('/api/theme').then(res => {
      setThemes(res.data)
      setLoadingThemes(false)
    })
  }, [])

  useEffect(() => {
    document.querySelector('body')!.style.overflow = isOpened ? 'hidden' : 'visible'
  }, [isOpened])

  const handleThemeChange = (id: string, checked: boolean) =>
    setSelectedThemes(p => (checked ? [...p, id] : p.filter(i => i !== id)))

  const displayedThemes = showAllThemes ? themes : themes.slice(0, 6)

  const LeftSidebar = () => (
    <aside
      className={`pointer-events-none h-screen sm:h-fit fixed z-50 lg:z-10 sm:sticky sm:top-[116px] inset-0 p-5 transition duration-300 lg:translate-x-0 ${isOpened ? 'translate-x-0' : 'translate-x-[-100%]'}`}
    >
      <div
        className="opacity-90 sm:opacity-100 bg-white flex flex-col p-[10px] gap-4 sm:gap-10 w-full sm:w-[320px] rounded-xl shadow-xl overflow-y-auto pointer-events-auto h-full"
        style={{ boxShadow: '0px -8px 80px 0px rgba(0,0,0,0.07),0px -2.92px 29.2px 0px rgba(0,0,0,0.05),0px -1.42px 14.18px 0px rgba(0,0,0,0.04),0px -0.69px 6.95px 0px rgba(0,0,0,0.03),0px -0.27px 2.75px 0px rgba(0,0,0,0.02)' }}
      >
        <div className="border rounded-lg border-black flex gap-4 p-2">
          <MagnifyingGlassIcon className="size-5" />
          <input type="text" placeholder="Recherche" />
        </div>

        <div className="flex flex-col gap-5">
          <FilterTitle title="Type d'activité" />
          <div className="flex flex-col gap-3">
            <Checkbox label="Tous les types" nb={10} />
            <Checkbox label="Formation" />
            <Checkbox label="Campement Scientifique" />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <FilterTitle title="Thèmes" />
          <div className="flex flex-col gap-3">
            {loadingThemes
              ? Array.from({ length: 6 }).map((_, i) => <ShimmerBar key={i} className="h-6 w-full" />)
              : displayedThemes.map(th => (
                  <Checkbox key={th.id} label={th[`name_${lang}`]} checked={selectedThemes.includes(th.id)} onChange={c => handleThemeChange(th.id, c)} />
                ))}
            {!loadingThemes && themes.length > 6 && (
              <button
                className="hover:underline bg-[#EFEFEF] rounded-xl p-[10px] w-fit mt-2 font-medium"
                onClick={() => setShowAllThemes(p => !p)}
              >
                {showAllThemes ? 'Afficher moins' : `Afficher ${themes.length - 6} de plus`}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 relative z-50">
          <FilterTitle title="Date" />
          <div className="flex flex-col gap-3">
            {['today', 'week', 'month', 'year'].map(k => (
              <Checkbox key={k} label={k === 'today' ? "Aujourd'hui" : k === 'week' ? 'Cette Semaine' : k === 'month' ? 'Ce Mois' : 'Cette Année'} checked={selectedDateFilter === k} onChange={c => setSelectedDateFilter(c ? k : null)} />
            ))}
            <ButtonDropdown customDropdown item={<DateRangeSelector />} position="left" renderItem={i => <div className="py-1">{i}</div>}>
              {open => <Checkbox label="Configurer" />}
            </ButtonDropdown>
          </div>
        </div>

        <div className="flex justify-between">
          <button className="bg-primary text-sm text-white px-[10px] py-2 rounded-xl font-semibold" onClick={() => setIsOpened(false)}>
            Appliquer
          </button>
          <button className="text-white font-semibold px-[10px] py-2 rounded-xl bg-[#858585]" onClick={() => { setSelectedThemes([]); setSelectedDateFilter(null) }}>
            Réinitialiser
          </button>
        </div>
      </div>
    </aside>
  )

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
          <LeftSidebar />
          <TrainingCards filter={{ themes: selectedThemes, dateFilter: selectedDateFilter }} setIsOpened={setIsOpened} />
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
