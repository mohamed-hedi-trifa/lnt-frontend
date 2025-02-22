import React from 'react'
import PageTitle from '../../../atoms/titles/PageTitle'
import achievementsHero from "../../../../assets/images/suivi-hero.jpeg";
import ContainerImageMarine from '../ContainerImageMarine';
import AMCPSidebar from '../../../layout/AMCPSidebar'
import Title from '../../../atoms/titles/Title';
import HeroSection from '../../HeroSection';
import Image from '@/components/atoms/Image';

export default function SuiviScientifique() {

    const images = [
        {
            title :'Explorez l’Aire Marine Protégée',
            description : 'Préservons ensemble les Îlots Nord de Kerkennah',
            imageUrl : '/images/marine_images/marine3.jpg'
        },
        {   
            title :'Découvrez nos Partenaires',
            description : 'Engagés pour la Protection des Îles de Kerkennah',
            imageUrl : '/images/marine_images/marine4.jpg'
        }
    ]

    return (
        <div className=''>
           <HeroSection imgSrc={achievementsHero} title="Suivi Scientifique : L'Engagement pour la Conservation de Kerkennah" subTitle="Des études approfondies pour une gestion durable des ressources marines et terrestres" />

                    <div className="flex justify-center sm:justify-center pb-4 ">
                                <PageTitle 
                                    title="Suivi Scientifique"
                                    
                
                                />
                    </div>    

                <section className='px-4'>
                    <div className='max-w-[1252px] mx-auto'>
                        <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
                                <AMCPSidebar />

                                <section className='w-fit flex flex-col gap-6 mt-8 sm:mt-0'>
                                    <div className='text-justify  text-[20px] sm:text-[22px] font-semibold '>
                                        Le suivi scientifique de l'Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) se concentre sur la protection des richesses naturelles des iles Kerkennah. A traves des études réguliéres, nous collectons des données essentielles pour comprendre les changements environnementaux et adapter nos actions de conservation. Cette Approche proactive garantit le durabilité des écosystémes marins et terrestres, tout en soutenant la communauté locale.
                                    </div>

                                    
                                    
                                    <Title size='text-[25px] sm:text-[28px]' variant='pill'>Le suivi Scientifique, Un Engagement pour la Durabilité</Title>
                                    

                                    <div className=' text-justify'>
                                        <p className='text-[20px]'>Le suivi scientifique est un outil essentiel pour évaluer la santé des écosystémes marins et terrestres de Kerkennah.Grace à des recherches rigoureuses,nous collectons des données précieuses qui guident nos actions de conservation. Cette démarche nous permet de protéger les ressources naturelles et de proumevoir un développement durable au bénéfice de la communauté locale.</p>
                                    </div>

                                    <img src='/images/marine_images/marine1.jpg'alt="Aire marine" className="w-full max-w-[600px] mx-auto h-auto rounded-lg" />
                                
                                    <Title size='text-[25px] sm:text-[28px]' variant='pill'>Pourquoi le Suivi Scientifique est-il Crucial ?</Title>

                                    <div className='text-justify  text-[18px] sm:text-[22px] font-semibold'>
                                        Nos efforts de bsuivi nous aident à mieux comprendre les défits envirenmentaux auquels sont confrontés les écosystémes uniques de Kerkennah.Les données colectées permettent de : 
                                    </div>

                                    <div>
                                        <p><span className='px-4 font-bold text-[20px]'>.</span><span className='text-[18px] sm:text-[20px] leading-[50px]'>Identifier les espéces de danger.</span></p>
                                        <p><span className='px-4 font-bold text-[20px]'>.</span><span className='text-[18px] sm:text-[20px] '>Surveiller l'impact des activités humaines.</span></p>
                                        <p><span className='px-4 font-bold text-[20px]'>.</span><span className='text-[18px] sm:text-[20px] leading-[50px]'>Priserver la biodiversité pour les générations futures.</span></p>
                                    </div>

                                    <Image src='/images/marine_images/marine2.jpg' />

                                </section>

                        </section>
                                <hr className='border-2'/>
<section className='mb-20 mt-10 flex flex-col gap-20'>
    <div className='flex flex-col gap-5'>
                                <div className='text-justify  text-[18px] sm:text-[22px] font-semibold'>
                                     <p className='text-center text-[30px] sm:text-[36px]'><span className='text-[#0270A0]'>Découvrir</span> nos Projets de Suivi Détaillés </p>
                                </div>

                                <div className='text-justify  text-[18px] sm:text-[22px] font-bold'>
                                     <p className='text-center text-[17px] sm:text-[20px]'>Nous avons développé des programmes de suivi spécialisés pour </p>
                                     <p className='text-center text-[18px] sm:text-[20px]'>Différetes composantes de l'environnement</p>
                                </div>
    </div>

                                
                                        <ContainerImageMarine images={images}/>
                                
</section>

                    </div>
                </section>
        </div>
    )
}
