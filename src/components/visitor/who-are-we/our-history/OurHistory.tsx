import React from 'react'
import PageTitle from '../../../atoms/titles/PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ImageHistoire from '../our-team/ImageHistoire'
import KeyMoments from './KeyMoments'
import historyHero from "../../../../assets/images/history-hero.jpg";
import PageParagraph from '../../../atoms/PageParagraph'
import HeroSection from '../../HeroSection'

export default function OurHistory() {

    return (
        <div className=''>
            <HeroSection imgSrc={historyHero} title="Une Décennie d'Engagement Durable" subTitle="Depuis 2014, L'Association Kratten écrit une histoire de préservation environnementale, de valorisation culturelle, et de développement durable à Kerkennah" />
            <PageTitle title='Our History' />
            <section className='px-4 sm:px-0'>
                <div className='max-w-[1134px] mx-auto'>
                    <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
                        <Sidebar />

                        <section className='w-fit flex flex-col gap-12'>
                            <PageParagraph>Fondée en 2014, l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) est née d’une volonté commune de protéger et promouvoir l’archipel de Kerkennah. En réponse aux défis environnementaux et économiques rencontrés par les pêcheurs locaux, l’association a pour mission de favoriser une gestion durable des ressources marines, de préserver la culture locale, et de créer des opportunités de loisirs pour la communauté. Dès ses débuts, l’AKDDCL a œuvré pour sensibiliser la population et lutter contre la pêche illégale, posant ainsi les premières pierres d’un développement durable à Kerkennah.</PageParagraph>
                            <div className=''><img src='/images/team.png' alt="Kerkennah Archipelago" className="w-full  h-auto rounded-lg" /></div>
                            <KeyMoments />
                        </section>

                    </section>
                    <section className='border-t border-[#ADA5A5] mb-[100px]'>
                        <ImageHistoire />
                    </section>
                </div>
            </section>
        </div>
    )
}
