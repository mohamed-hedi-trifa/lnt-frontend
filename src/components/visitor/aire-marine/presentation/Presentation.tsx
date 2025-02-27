import React from 'react'
import PageTitle from '../../../atoms/titles/PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ContainerImageMarine from '../ContainerImageMarine'
import HeroSection from '../../HeroSection'
import AMCPSidebar from '../../../layout/AMCPSidebar'
import SectionTitle from '../../../atoms/titles/SectionTitle'
import achievementsHero from '../../../../assets/images/achievements-hero.jpg'
import PageParagraph from '../../../atoms/PageParagraph'

export default function Presentation() {

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

    return (

        <div className=''>
            <HeroSection title="Protéger Nos Océans pour Demain" subTitle="Un réseau d’aires marines dédiées à la conservation des écosystèmes et à la préservation des ressources pour les générations futures." imgSrc={achievementsHero} />
            <PageTitle title="Présentation"/>

            <section className='px-4 sm:px-0'>
                <div className='max-w-6xl mx-auto'>
                    <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10 pb-10'>
                        <AMCPSidebar />
                        <section className='w-fit text-justify text-[20px] sm:text-[22px] flex flex-col gap-8'>
                            <div className='flex justify-center sm:justify-start'>
                                <SectionTitle
                                    title="Qu'est ce qu'une AMCP"
                                    width="w-[160px]"
                                    spacing="mt-8 sm:mt-0"
                                    customClassName='!w-auto'
                                />
                            </div>

                            <PageParagraph fontWeight='font-semibold'>Les Aires Marines et Côtière Protégées (ACMP) sont des zones marines et côtières placées sous protection en raison de leur importance écologique.</PageParagraph>
                            <PageParagraph>Les AMCP sont de plus en plus reconnues dans le monde entier comme l'un des outils les plus efficaces pour la conservation et la protection de l'environnement marin lorsqu'elles sont gérées efficacement et disposent des moyens adaptés aux problèmes locaux de gestion.</PageParagraph>
                            <PageParagraph>Outre leur rôle dans la conservation de la biodiversité, les AMP ont prouvé leur efficacité dans le rétablissement des espèces, des habitats et des communautés biologiques en déclin et sont également reconnues pour leur rôle dans le renforcement de la résilience des écosystèmes. Elles peuvent contribuer, dans une approche de gestion partagée (cogestion), au développement durable d'activités socio-économiques telles que la pêche artisanale et l'écotourisme.</PageParagraph>
                            <PageParagraph>Elles représentent l'un des outils de gestion disponibles que le secteur de la pêche commence à utiliser sous forme de réserves de pêche ou d’AMP. Elles contribuent au bien-être des populations et à l'attractivité des territoires et stimulent ainsi le développement durable des économies locales.</PageParagraph>
                            <PageParagraph>Les bénéfices et les services offerts par la conservation de la biodiversité, les enjeux liés à la gestion des AMP et des ressources naturelles marines (pêche en particulier) permettent aujourd'hui de rassembler les défenseurs de la conservation, ceux du secteur de la pêche et les acteurs de la gouvernance de la biodiversité dans un processus intégré avec les autres politiques sectorielles.</PageParagraph>




                            <img src='/images/aire_marines/aire_marine.png' alt="Aire marine" className="w-full  h-auto rounded-lg shadow-lg" />
                        </section>


                    </section>
                    <section className='border-t border-[#000000] mb-10'/>
                    <section className='flex items-start justify-center '>

                        <div className='w-full flex items-center justify-center mb-20 '>
                            <ContainerImageMarine images={images} />
                        </div>

                    </section>
                </div>



            </section>


        </div>
    )
}
