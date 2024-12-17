import React from 'react'
import PageTitle from '../../../PageTitle'
import Sidebar from '../../../layout/Sidebar'
import achievementsHero from "../../../../assets/images/achievements-hero.jpg";
import ContainerImageMarine from '../CotainerImageMarine';
import SectionTitle from '../../../SectionTitle';
import AMCPSidebar from '../../../layout/AMCPSidebar'

export default function SuiviScientifique2() {

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
            <img className='w-full object-cover h-[80vh]' src={achievementsHero} />
            <div className="flex justify-center sm:justify-center pb-4 ">
                                <PageTitle 
                                    title="Suivi Scientifique"
                                    width="w-[160px]"
                                    
                
                                />
                    </div>           
                <section>
                    <div className='max-w-6xl mx-auto'>
                    <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
                                <AMCPSidebar />

                                <section className='w-fit flex flex-col gap-6'>

                                <SectionTitle 
                                        title="Suivi terrestre"
                                        width='w-[160px]'
                                />   

                                    <div className=''>
                                        <div className=''><p className='font-semibold text-[32px] italic'>Protéger et comprendre les écosystèmes terrestres</p></div>
                                    </div>

                                    <div className='text-justify  text-[20px] font-semibold'>
                                        Le suivi terrestre est une composante essentielle de la conservation environnementale.il s'agit d'observer, d'analyser et de protéger les écosystémes terrestres et les espéces qui y vivent afin d'assurer leur durabilité pour les générations futures.
                                    </div>

                                    <div className='flex items-center '>
                                        <div><img src="/images/marine_images/rectangle.png" alt="" /></div>
                                        <div className='ml-2'><p className='font-bold text-[28px]'>Objectifs du suivi Terrestre</p></div>
                                    </div>

                                    <div>
                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Surveiller l'état des habitats terrestres(zones littorales, dunes, etc.)</span>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Etudier les espéces fauniques et floristiques spécifiques aux ilots nord de Kerkennah.</span>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Identifier les impacts bdes activités humaines et proposer des solutions pour limiter la dégradation.</span>
                                            </div>
                                        </div>


                                        
                                        
                                        

                                    </div>
                                    <img src='/images/marine_images/marine11.jpg'alt="Aire marine" className="w-full  h-auto rounded-lg" />
                                    
                                    <div className='flex items-center '>
                                        <div><img src="/images/marine_images/rectangle.png" alt="" /></div>
                                        <div className='ml-2'><p className='font-bold text-[28px]'>Méthodologie Utilisée</p></div>
                                    </div>

 
                                     


                                    <div>


                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Observation sur le terrain :</b> Recueil de données grace à des outils comme les dronnes, les GPS, et les piéges photographiques</span>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Analyse des échantillons : </b>Etudes de la flore et de la faune pour comprendre l'impact des conditions environnementales</span>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Suivi à long terme :</b> Comparaison des données pour observer les tendances</span>
                                            </div>
                                        </div>


                                        
                                        
                                        

                                    </div>
                                    <img src='/images/marine_images/marine12.jpg' alt="" className="w-full  h-auto rounded-lg" />

                                    <div className='flex items-center '>
                                        <div><img src="/images/marine_images/rectangle.png" alt="" /></div>
                                        <div className='ml-2'><p className='font-bold text-[28px]'>Résultat et Importance</p></div>
                                    </div>

                                    <div className='ml-10'>
                                        <span className='text-[20px] font-bold'>Résultats</span>

                                            
                                            <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Cartographie des habitats terrestres : </b>Identification des zones critiques comme les dunes cotiéres ou les habitats d'espéces endémiques</span>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Suivi des espéces clés : </b>Analyse des populations d'oiseaux nicheurs et des espéces végétales locales, mettant en évidence leur role écologiques</span>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Données sur l'impact humain : </b> Etudes des pressions liées aux activités humaines, comme l'érosion et l'urbanisation, pour proposer des solutions adaptées</span>
                                                </div>
                                            </div>

                                        <span className='text-[20px] font-bold'>Importance</span>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Peéservation des habitats terrestres : </b>Les résultats orientent les efforts pour protéger les écosystémes uniques des ilots nord Kerkennah</span>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Soutien à la biodiversité : </b>Identification des espéces vulnérables et mis en place de mesures de convention</span>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Sensibilisation communautaire : </b>Les données permettent d'informer et de mobiliser les habitats pour aménagement durable</span>
                                                </div>
                                            </div>
                                       
                                    </div>
                                    <img src='/images/marine_images/marine13.png' alt="" className="w-full  h-auto rounded-lg" />

                                </section>
                                <hr className='border-2'/>  
                             

                            </section>
                                <div className='text-justify  text-[18px] sm:text-[22px] font-semibold'>
                                     <p className='text-center text-[30px] sm:text-[36px]'><span className='text-[#0270A0]'>Explorer</span> Les espéces de Notre Suivi Terrestre </p>
                                </div>

                                <div className='text-justify  text-[18px] sm:text-[22px] font-bold'>
                                     <p className='text-center text-[18px] sm:text-[20px]'>Découvrez les trésors terrestres que nous surveillons pour</p>
                                     <p className='text-center text-[18px] sm:text-[20px]'>préserver l'équilibre écologique.</p>
                                </div>

                                <section className='mt-10'>
                                        <ContainerImageMarine images={images}/>

                                </section>

                            <section className='border-t border-[#ADA5A5] '>
                                {/* <ImageHistoire /> */}
                            </section>
                    </div>
                </section>
        </div>
    )
}
