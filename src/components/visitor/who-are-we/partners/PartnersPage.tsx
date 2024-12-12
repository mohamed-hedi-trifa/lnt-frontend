import React from 'react'
import PageTitle from '../../../PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ahmedYellow from "../../../../images/ahmed-yellow.png"
import fatmaB from "../../../../images/FatmaB.png"
import habibK from "../../../../images/HabibK.png"
import hakimS from "../../../../images/HakimS.png"
import jamilK from "../../../../images/JamilK.png"
import karimB from "../../../../images/KarimB.png"
import najahH from "../../../../images/NajahH.png"
import partnersHero from "../../../../images/partners-hero.jpg";
import ImageHistoire from '../our-team/ImageHistoire'
import Partners from './Partners'
import HeroSection from '../../HeroSection'
import PageParagraph from '../../../PageParagraph'

const IMAGES = [
    ahmedYellow,
    fatmaB,
    habibK,
    hakimS,
    jamilK,
    karimB,
    najahH
]

export default function PartnersPage() {

    return (
        <div className=''>
            <HeroSection imgSrc={partnersHero} title="Des Alliances pour un Futur Meilleur" subTitle="Nos partenaires locaux et internationaux sont au cœur de nos succès : ensemble, nous façonnons un avenir durable" />
            <PageTitle title='Partners' width='w-[160px]' />
            <section className='max-w-6xl mx-auto flex flex-col gap-12'>
                    <section className='w-full flex relative gap-8 py-10'>
                    <Sidebar />

                    <section className='w-fit text-justify text-[22px]'>
                        <PageParagraph>Le succès des projets de l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) repose en grande partie sur la collaboration et le soutien de nos partenaires. Grâce à eux, nous avons pu concrétiser des initiatives environnementales, culturelles et éducatives au service de l’archipel de Kerkennah et de sa communauté. Nos partenaires incluent des organisations locales et internationales, des institutions académiques, des ONG, et des entreprises privées qui partagent notre engagement pour la durabilité, la préservation de la culture et la promotion de la biodiversité. Chaque partenariat enrichit nos projets par l’échange de savoir-faire, de ressources et de perspectives, renforçant ainsi notre mission.</PageParagraph>
                    
                    </section>
                    </section>
                    <section>
                    <Partners />
                    </section>
                    <section className='border-t border-[#ADA5A5]'>
                        <ImageHistoire />
                    </section>
            </section>
        </div>
    )
}
