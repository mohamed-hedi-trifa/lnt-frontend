import React from 'react'
import PageTitle from '../../../PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ImageHistoire from '../our-team/ImageHistoire'
import Keyword from './Keyword'
import historyHero from "../../../../images/history-hero.jpg";

export default function OurHistory() {

    return (
        <div className=''>
            <img className='w-full object-cover h-[80vh]' src={historyHero} />
            <PageTitle title='Our History' width='w-[160px]' />
            <section>
                <div className='max-w-6xl mx-auto'>
                    <section className='w-full flex relative gap-8 py-10'>
                    <Sidebar />

                    <section className='w-fit flex flex-col gap-12'>
                        <div className='text-justify leading-10 text-[22px]'>Fondée en 2014, l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) est née d’une volonté commune de protéger et promouvoir l’archipel de Kerkennah. En réponse aux défis environnementaux et économiques rencontrés par les pêcheurs locaux, l’association a pour mission de favoriser une gestion durable des ressources marines, de préserver la culture locale, et de créer des opportunités de loisirs pour la communauté. Dès ses débuts, l’AKDDCL a œuvré pour sensibiliser la population et lutter contre la pêche illégale, posant ainsi les premières pierres d’un développement durable à Kerkennah.</div>
                <img src='/images/team.png'alt="Kerkennah Archipelago" className="w-full  h-auto rounded-lg" />
                <Keyword/>
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
