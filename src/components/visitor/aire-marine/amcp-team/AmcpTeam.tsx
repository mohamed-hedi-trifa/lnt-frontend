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

export default function AmcpTeam() {
  return (
    <main>
        <HeroSection title="Les Gardiens de Nos Écosystèmes Marins" subTitle="Découvrez l’équipe dédiée à la protection et à la gestion durable de l’Aire Marine et Côtière Protégée de Kerkennah" imgSrc={achievementsHero} />
                    <PageTitle
                        title="L’équipe"
                        width="w-[160px]" />
                        <PageBody>
                        <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
                        <AMCPSidebar />
                        <section className='w-fit text-justify text-[20px] sm:text-[22px] flex flex-col gap-8'>
                            <PageParagraph>Derrière chaque initiative de l’Aire Marine et Côtière Protégée de Kerkennah se trouve une équipe passionnée, unie par un engagement commun : préserver les trésors écologiques de l’archipel et soutenir les communautés locales qui en dépendent. Ce collectif rassemble des experts dans divers domaines — biologie marine, gestion environnementale, éducation et sensibilisation — ainsi que des bénévoles animés par la volonté de faire une différence.</PageParagraph>
                            <PageParagraph>Leur travail ne se limite pas à la recherche scientifique : ils collaborent étroitement avec les pêcheurs, les associations locales et les institutions nationales et internationales pour créer un modèle de gestion durable. Ensemble, ils relèvent des défis tels que la protection des espèces menacées, la lutte contre la pêche illégale et l’éducation des générations futures.</PageParagraph>
                        </section>
                    </section>
                       

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
