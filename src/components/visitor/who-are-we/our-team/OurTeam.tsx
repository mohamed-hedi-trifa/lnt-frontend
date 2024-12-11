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
import ImageHistoire from './ImageHistoire'
import historyHero from "../../../../images/history-hero.jpg";
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

export default function OurTeam() {

    return (
        <div className=''>
            <HeroSection imgSrc={historyHero} title="Les Visages de Notre Mission" subTitle="Une équipe dévouée, passionnée par la préservation de Kerkennah et animée par une vision commune" />
            <PageTitle title='Our Team' width='w-[160px]' />
            <section className='px-4 sm:px-0'>
                <div className='max-w-6xl mx-auto'>
                    <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
                    <Sidebar />

                    <section className='w-fit text-justify text-[22px] flex flex-col gap-8'>
                        <div>
                        <PageParagraph>L’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) est le fruit de la vision et de l'engagement de nombreux passionnés qui, depuis sa création, n'ont cessé de travailler ensemble pour le bien-être et la durabilité de l’archipel de Kerkennah. Notre équipe actuelle rassemble des talents aux parcours variés, tous unis par leur dévouement à la préservation de notre environnement et de notre patrimoine culturel.</PageParagraph>
                        <PageParagraph>Nous rendons également hommage aux membres fondateurs, dont l’engagement et l’enthousiasme ont jeté les bases de notre association et permis de concrétiser ses premiers projets. Leur contribution continue d’inspirer nos efforts, et nous restons fidèles aux valeurs qu’ils ont incarnées.</PageParagraph>
                        </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
{IMAGES.map((src)=><img src={src} className='w-full' />)}
                    </div>
                    </section>

                    </section>
                <section className='border-t border-[#ADA5A5] mt-10'>
                    <ImageHistoire />
                </section>
                </div>
            </section>
        </div>
    )
}
