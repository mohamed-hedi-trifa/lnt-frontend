import React, { useEffect, useState } from 'react'
import axios from "axios"
import PageTitle from '../../../atoms/titles/PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ImageHistoire from './ImageHistoire'
import historyHero from "../../../../assets/images/history-hero.jpg";
import HeroSection from '../../HeroSection'
import PageParagraph from '../../../atoms/PageParagraph'
import TeamCard from '../../TeamCard'



export default function OurTeam() {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get("/api/team-members-normal")
            .then(res => {
                setTeamMembers(res.data);

                console.log(teamMembers.length)
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching team members:", err);
                setLoading(false);
            });
    }, []);
    return (
        <div className=''>
            <HeroSection imgSrc={historyHero} title="Les Visages de Notre Mission" subTitle="Une équipe dévouée, passionnée par la préservation de Kerkennah et animée par une vision commune" />
            <PageTitle title='Our Team' />
            <section className='px-4 sm:px-0'>
                <div className='max-w-6xl mx-auto'>
                    <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
                        <Sidebar />

                        <section className='w-fit flex flex-col gap-8 pb-10'>
                            <div>
                                <PageParagraph>L’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) est le fruit de la vision et de l'engagement de nombreux passionnés qui, depuis sa création, n'ont cessé de travailler ensemble pour le bien-être et la durabilité de l’archipel de Kerkennah. Notre équipe actuelle rassemble des talents aux parcours variés, tous unis par leur dévouement à la préservation de notre environnement et de notre patrimoine culturel.</PageParagraph>
                                <PageParagraph>Nous rendons également hommage aux membres fondateurs, dont l’engagement et l’enthousiasme ont jeté les bases de notre association et permis de concrétiser ses premiers projets. Leur contribution continue d’inspirer nos efforts, et nous restons fidèles aux valeurs qu’ils ont incarnées.</PageParagraph>
                            </div>
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
                    <section className='border-t border-[#000000] sm:pb-20 pb-20'>
                        <ImageHistoire />
                    </section>
                </div>
            </section>
        </div>
    )
}
