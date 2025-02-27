import HeroSection from '@/components/visitor/HeroSection'
import React from 'react'
import festivalHero from '@/assets/images/festival-hero.jpeg'
import PageParagraph from '@/components/atoms/PageParagraph'
import works from "@/assets/images/works.png";
import Title from '@/components/atoms/titles/Title';
import ContainerImageMarine from '@/components/visitor/aire-marine/ContainerImageMarine';

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

export default function OurFestivalPage() {
    return (
        <main className='flex flex-col pb-[80px]'>

            <HeroSection title='Festival de La Culture des Îles Méditerranéennes' subTitle='' imgSrc={festivalHero} />
            <div className='relative flex my-[80px]'>
                <div className='bg-[#0270A0] absolute top-0 left-0 h-full w-[40vw] z-0 hidden lg:block'></div>
                <div className='flex flex-col lg:flex-row max-w-7xl mx-auto w-full gap-[65px] relatiev z-10'>
                    <div className='lg:w-[55%] flex items-center justify-center lg:justify-end '>
                        <div className='bg-white p-[21px] w-[320px] h-[402px] lg:w-full lg:h-full max-h-[832px] max-w-[661px] shadow-helmi'>
                            <img src={works} />
                        </div>
                    </div>
                    <div className='lg:w-[45%] flex flex-col gap-5 px-3 lg:px-0'>
                        <Title size='text-[30px] lg:text-[40px]' customClassName='!block text-center lg:text-start'><span className='text-primary'>Un Festival</span> au Cœur de la Culture et de la Nature Méditerranéennes</Title>
                        <PageParagraph>
                            Le Festival de la Culture des Îles Méditerranéennes est un événement annuel emblématique qui célèbre la richesse et la diversité du patrimoine culturel et naturel de l’archipel de Kerkennah. Depuis sa création, il rassemble chaque été des passionnés, des artistes, des habitants et des visiteurs venus des quatre coins du pays et d’ailleurs, autour d’activités culturelles, artistiques et écologiques uniques.
                        </PageParagraph>
                        <PageParagraph>
                            À travers ses différentes éditions, ce festival est devenu un véritable rendez-vous incontournable pour la préservation et la promotion des traditions locales : les arts, la musique, la pêche traditionnelle, et l’artisanat y occupent une place centrale. Les visiteurs y découvrent des moments forts comme les régates de barques à voile, les expositions d’art, les soirées culturelles animées par des troupes traditionnelles, ou encore des sorties immersives pour explorer les îlots préservés et les merveilles naturelles de l’archipel.
                        </PageParagraph>
                        <PageParagraph>
                            Mais le Festival ne s’arrête pas là. Il incarne également une démarche écologique et durable, en sensibilisant les visiteurs et les habitants à la préservation de l’environnement marin et côtier, grâce à des collaborations avec des acteurs locaux et des projets comme ceux de l’Aire Marine Protégée des îlots nord de Kerkennah. Ainsi, les activités culturelles s’entrelacent avec des initiatives de protection de la biodiversité, faisant du festival un modèle de tourisme responsable et respectueux.
                        </PageParagraph>
                        <PageParagraph>
                            Plongez avec nous dans cette aventure unique où tradition, nature et avenir s’unissent pour écrire une histoire commune.
                        </PageParagraph>
                    </div>
                </div>
            </div>
<div className='max-w-7xl mx-auto '>
            <ContainerImageMarine images={images} />
</div>
        </main>
    )
}
