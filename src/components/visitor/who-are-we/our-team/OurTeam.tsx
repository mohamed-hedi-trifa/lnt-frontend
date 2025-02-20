import React, { useEffect, useState } from 'react'
import axios from "axios"
import PageTitle from '../../../atoms/titles/PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ahmedYellow from "../../../../assets/images/ahmed-yellow.png"
import fatmaB from "../../../../assets/images/FatmaB.png"
import habibK from "../../../../assets/images/HabibK.png"
import hakimS from "../../../../assets/images/HakimS.png"
import jamilK from "../../../../assets/images/JamilK.png"
import karimB from "../../../../assets/images/KarimB.png"
import najahH from "../../../../assets/images/NajahH.png"
import ImageHistoire from './ImageHistoire'
import historyHero from "../../../../assets/images/history-hero.jpg";
import HeroSection from '../../HeroSection'
import PageParagraph from '../../../atoms/PageParagraph'



export default function OurTeam() {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true); // Define loading state


    useEffect(() => {
        axios.get("/api/team-members-normal")
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
        <div className=''>
            <HeroSection imgSrc={historyHero} title="Les Visages de Notre Mission" subTitle="Une équipe dévouée, passionnée par la préservation de Kerkennah et animée par une vision commune" />
            <PageTitle title='Our Team' width='w-[160px]' />
            <section className='px-4 sm:px-0'>
                <div className='max-w-6xl mx-auto'>
                    <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
                        <Sidebar />

                        <section className='w-fit flex flex-col gap-8'>
                            <div>
                                <PageParagraph>L’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) est le fruit de la vision et de l'engagement de nombreux passionnés qui, depuis sa création, n'ont cessé de travailler ensemble pour le bien-être et la durabilité de l’archipel de Kerkennah. Notre équipe actuelle rassemble des talents aux parcours variés, tous unis par leur dévouement à la préservation de notre environnement et de notre patrimoine culturel.</PageParagraph>
                                <PageParagraph>Nous rendons également hommage aux membres fondateurs, dont l’engagement et l’enthousiasme ont jeté les bases de notre association et permis de concrétiser ses premiers projets. Leur contribution continue d’inspirer nos efforts, et nous restons fidèles aux valeurs qu’ils ont incarnées.</PageParagraph>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                        
                                {teamMembers.map((member) =>
                                    <div  className='group relative z-10 hover:scale-110 transition duration-200 overflow-hidden' >
                                        <img src={`${process.env.GATSBY_API_URL}${member.image}`} className='w-full' />
                                        <div className='sm:translate-x-[-110%] transition duration-500 group-hover:translate-x-0 absolute bottom-2 right-2 left-2 p-2 flex flex-col gap-3 rounded-[15px] bg-[linear-gradient(90deg,rgba(81,173,198,0.8)_0%,rgba(0,110,159,0.8)_100%)]'>
                                            <div className='font-semibold text-2xl opacity-0'>{member.name}</div>
                                            <div className='font-semibold text-xl opacity-0'>{member.position_en || member.position_fr}</div>
                                            <div className='font-medium  opacity-0'>{member.job_en || member.job_fr}</div>
                                        </div>
                                        <div className='sm:translate-x-[110%] transition duration-500 group-hover:translate-x-0 absolute bottom-2 right-2 left-2 flex flex-col gap-3 rounded-[15px] p-2'>
                                            <div className='font-semibold text-white text-2xl'>{member.name}</div>
                                            <div className='font-semibold text-xl'>{member.position_en || member.position_fr}</div>
                                            <div className='font-medium text-white'>{member.job_en || member.job_fr}</div>
                                        </div>
                                    </div>
                                )}
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
