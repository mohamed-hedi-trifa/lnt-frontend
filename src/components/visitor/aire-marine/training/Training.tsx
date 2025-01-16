import React from 'react'
import HeroSection from '../../HeroSection'
import PageTitle from '@/components/atoms/titles/PageTitle'
import PageBody from '@/components/PageBody'
import achievementsHero from '../../../../assets/images/training.jpeg'
import AMCPSidebar from '@/components/layout/AMCPSidebar'
import SectionTitle from '@/components/atoms/titles/SectionTitle'
import PageParagraph from '@/components/atoms/PageParagraph'
import ContainerImageMarine from '../CotainerImageMarine'
import ButtonDropdown from '@/components/ButtonDropdown'
import DateRangeSelector from '../../who-are-we/our-achievements/DateRangeSelector'
import ClockIcon from '@/assets/icons/ClockIcon'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import ColorPaletteIcon from '@/assets/icons/ColorPaletteIcon'

const CATEGORIES = [
  {
      id:1,
      name: "All themes"
  },
  {
      id:2,
      name: "Conservation Marine"
  },
  {
      id:3,
      name: "Tourisme Responsable"
  },
  {
      id:4,
      name: "Peche Durable"
  },
  {
      id:5,
      name: "Ecologie et Environmenet"
  },
  {
      id:6,
      name: "Education et Formation"
  }
]

const images = [
    {
        title: 'Explorez l’Aire Marine Protégée',
        description: 'Préservons ensemble les Îlots Nord de Kerkennah',
        imageUrl: '/images/aire_marines/marine1.jfif'
    },
    {
        title: 'Découvrez nos Partenaires',
        description: 'Engagés pour la Protection des Îles de Kerkennah',
        imageUrl: '/images/aire_marines/marine2.jfif'
    }
]

export default function Training() {
  return (
    <main>
        <HeroSection title="Formation et Campement Scientifiques :" subTitle="Connaitre et Agir

Plonger dans des expériences

éducatives et scientifiques uniques pour

préserver notre environnement marin " imgSrc={achievementsHero} />
                    <PageTitle
                        title="Formations et Campements
Scientifiques"
                        width="w-[160px]" />
                        <PageBody>
                        <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
                        <AMCPSidebar />
                        <section className='w-fit text-justify text-[20px] sm:text-[22px] flex flex-col gap-8'>
                            <PageParagraph>Dans le cadre de sa mission de préservation et de valorisation des écosystèmes marins, notre association organise des formations et des campements scientifiques qui offrent des expériences éducatives enrichissantes. Ces initiatives visent à transmettre des connaissances scientifiques, sensibiliser à l’importance de la biodiversité, et impliquer divers publics dans des actions concrètes en faveur de l’environnement. Les participants, qu’ils soient étudiants, chercheurs ou amateurs passionnés, ont l’opportunité de contribuer activement à des projets de recherche tout en développant leurs compétences. Qu’il s’agisse d’une formation spécialisée ou d’un campement scientifique immersif, chaque activité est conçue pour allier théorie et pratique, dans un cadre exceptionnel : les îles de Kerkennah.</PageParagraph>

                        </section>
                    </section>
                        <div className='flex gap-8 justify-center'>  

<ButtonDropdown
  item={<DateRangeSelector />}
  position="left"
  renderItem={(item) => (
      <div className='py-1'>{item.name}</div>
  )}
>
  {(isOpen) => (
    <div className={`flex items-center gap-2  underline-offset-4 border-black border-2 rounded-[10px] px-6 py-2`}>
      <ClockIcon />
      Published at
      <ChevronDownIcon className={`w-6 h-6 duration-200 ${isOpen ? "-rotate-180" : ""}`} />
    </div>
  )}
</ButtonDropdown> 

  <ButtonDropdown
  items={CATEGORIES}
  position="left"
  renderItem={(item) => (
      <div className='py-1 px-4'> {item.name}</div>
  )}
>
  {(isOpen) => (
    <button className={`flex items-center gap-2  underline-offset-4 border-black border-2 rounded-[10px] px-6 py-2`}>
      <ColorPaletteIcon />
      Theme
      <ChevronDownIcon className={`w-6 h-6 duration-200 ${isOpen ? "-rotate-180" : ""}`} />
    </button>
  )}
</ButtonDropdown> 
 </div>

                    <hr className='my-6 border-[2px] text-custom-gray' />
                    <section className='flex items-start justify-center '>

                        <div className='w-full flex items-center justify-center '>
                            <ContainerImageMarine images={images} />
                        </div>

                    </section>

                    <div className='mt-20'></div>
                        </PageBody>
    </main>
  )
}
