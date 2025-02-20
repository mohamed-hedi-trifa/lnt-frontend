import React, { useEffect, useState } from 'react'
import axios from "axios"
import HeroSection from '../../HeroSection'
import PageTitle from '@/components/atoms/titles/PageTitle'
import PageBody from '@/components/PageBody'
import achievementsHero from '../../../../assets/images/training.jpeg'
import AMCPSidebar from '@/components/layout/AMCPSidebar'
import PageParagraph from '@/components/atoms/PageParagraph'
import ContainerImageMarine from '../ContainerImageMarine'
import fatmaB from "../../../../assets/images/FatmaB.png"
import habibK from "../../../../assets/images/HabibK.png"
import hakimS from "../../../../assets/images/HakimS.png"
import jamilK from "../../../../assets/images/JamilK.png"
import karimB from "../../../../assets/images/KarimB.png"
import najahH from "../../../../assets/images/NajahH.png"
import ahmedYellow from "../../../../assets/images/ahmed-yellow.png"
import TeamCard from '../../TeamCard'



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
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true); // Define loading state


    useEffect(() => {
        axios.get("/api/team-members/")
            .then(res => {
                setTeamMembers(res.data);

                console.log(teamMembers.length)
                setLoading(false); // Set loading to false after fetching
            })
            .catch(err => {
                console.error("Error fetching team members:", err);
                setLoading(false);
            });
    }, []);
    return (
        <main>
            <HeroSection title="Les Gardiens de Nos Écosystèmes Marins" subTitle="Découvrez l’équipe dédiée à la protection et à la gestion durable de l’Aire Marine et Côtière Protégée de Kerkennah" imgSrc={achievementsHero} />
            <PageTitle
                title="L’équipe"
            />
            <PageBody>
                <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
                    <AMCPSidebar />
                    <section className='w-fit flex flex-col gap-8 mt-5 sm:mt-0'>
                        <PageParagraph>Derrière chaque initiative de l’Aire Marine et Côtière Protégée de Kerkennah se trouve une équipe passionnée, unie par un engagement commun : préserver les trésors écologiques de l’archipel et soutenir les communautés locales qui en dépendent. Ce collectif rassemble des experts dans divers domaines — biologie marine, gestion environnementale, éducation et sensibilisation — ainsi que des bénévoles animés par la volonté de faire une différence.</PageParagraph>
                        <PageParagraph>Leur travail ne se limite pas à la recherche scientifique : ils collaborent étroitement avec les pêcheurs, les associations locales et les institutions nationales et internationales pour créer un modèle de gestion durable. Ensemble, ils relèvent des défis tels que la protection des espèces menacées, la lutte contre la pêche illégale et l’éducation des générations futures.</PageParagraph>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                            <>
                                {/* Show loading state if data is still being fetched */}
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <>

                                  
                                        {/* Display fetched team members */}
                                        {teamMembers.map((member) => <TeamCard  member={member} />)}
                                    </>
                                )}
                            </>
                        </div>

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
