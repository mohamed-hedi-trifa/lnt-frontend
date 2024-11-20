import React from 'react'
import PageTitle from '../../../PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ImageHistoire from '../our-team/ImageHistoire'
import KeyMoments from './KeyMoments'
import historyHero from "../../../../images/history-hero.jpg";
import PageParagraph from '../../../PageParagraph'

export default function OurHistory() {

    return (
        <div className=''>
            <img className='w-full object-cover h-[80vh]' src={historyHero} />
            <PageTitle title='Our History' width='w-[160px]' />
            <section className='px-4 sm:px-0'>
                <div className='max-w-6xl mx-auto'>
                    <section className='w-full flex flex-col sm:flex-row relative gap-8 py-10'>
                    <Sidebar />

                    <section className='w-fit flex flex-col gap-12'>
                        <PageParagraph>Fondée en 2014, l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) est née d’une volonté commune de protéger et promouvoir l’archipel de Kerkennah. En réponse aux défis environnementaux et économiques rencontrés par les pêcheurs locaux, l’association a pour mission de favoriser une gestion durable des ressources marines, de préserver la culture locale, et de créer des opportunités de loisirs pour la communauté. Dès ses débuts, l’AKDDCL a œuvré pour sensibiliser la population et lutter contre la pêche illégale, posant ainsi les premières pierres d’un développement durable à Kerkennah.</PageParagraph> 
                <div className=''><img src='/images/team.png'alt="Kerkennah Archipelago" className="w-full  h-auto rounded-lg" /></div> 
                <KeyMoments/>
                    </section>

                    </section>
                <section className='border-t border-[#ADA5A5]'>
                    <ImageHistoire />
                </section>
                </div>
            </section>
        </div>
    )
}
