import React from 'react'
import PageTitle from '../../../PageTitle'
import achievementsHero from "../../../../assets/images/achievements-hero.jpg";
import AMCPSidebar from '../../../layout/AMCPSidebar'
import SectionTitle from '../../../SectionTitle';

export default function SuiviScientifique3() {

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

    const slides = [
        {
            image : '/images/marine_images/marine7.jpg',
            title : 'Posidonie'
        },
        {
            image : '/images/marine_images/marine8.jpg',
            title : 'Grande Nacre'
        },
        {
            image : '/images/marine_images/marine10.jpg',
            title : 'Eponge Marine'
        },
        {
            image : '/images/marine_images/marine8.jpg',
            title : 'Avifaune'
        },
        {
            image : '/images/marine_images/marine5.jpg',
            title : 'Tortue Marine'
        }
    ]

    return (
        <div className=''>
            <img className='w-full object-cover h-[80vh]' src={achievementsHero} />
                    <div className="flex justify-center sm:justify-center pb-4 ">
                    <div className="flex justify-center sm:justify-center pb-4 ">
                                <PageTitle 
                                    title="Suivi Scientifique"
                                    width="w-[160px]"
                                />
                    </div> 
                    </div>            
                <section>
                    <div className='max-w-6xl mx-auto '>
                    <section className='w-ful   l flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
                                <AMCPSidebar />

                                <section className='w-fit flex flex-col gap-6'>
                                
                                    <SectionTitle
                                    title="Suivi Marin"
                                        width='w-[160px]'
                                    />   


                                    <div className=''>
                                        <div className=''><p className='font-semibold text-[32px] italic'>Une analyse de Nos Ecosystémes Sous-Marins</p></div>
                                    </div>

                                    <div className='text-justify  text-[20px] font-semibold'>
                                        Le suivi marin joue un role crucial dans la préservation des écosystémes marins uniques des iles de Kerkennah.il permet de surveiller la santé des habitats sous-marins, d'étudier les espéces emblématiques et de comprendre l'impact des activités humaines sur le milieu marin. Ce suivi scientifique guide nos efforts pour assurer une gestion durable et responsable de ces ressssources précieuses.
                                    </div>

                                    <div className='flex items-center '>
                                        <div><img src="/images/marine_images/rectangle.png" alt="" /></div>
                                        <div className='ml-2'><p className='font-bold text-[28px]'>Objectifs du suivi Marin</p></div>
                                    </div>

                                    <div>
                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Comprendre et documenter l'évolution des habitats marins comme les herbiers de Posidonie.</span>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Protéger les espéces en danger telles que la Grande Nacre et les Tortues Marines.</span>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Evaluer l'impact des pratiques de peche sur les populations marines, notament le Poule.</span>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>EMesurer les effets des changements climatiques sur les écosystémes locaux.</span>
                                            </div>
                                        </div>



                                        
                                        
                                        

                                    </div>
                                    <img src='/images/marine_images/marine5.jpg'alt="Aire marine" className="w-full  h-auto rounded-lg" />
                                    
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
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Plongées scientifiques :</b> Réalisation de relevés sous-marins pour collecter des données sur les espéces et habitats.</span>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Outils technologiques : </b>Utilisation de drones marins et de capteurs pour des analyses approfondies.</span>
                                             </div>  
                                        </div>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Collaboration locale :</b> Implication des pecheurs dans la collecte de données pour renforcer l'efficasité du suivi.</span>
                                            </div>
                                        </div>


                                        
                                        
                                        

                                    </div>
                                    <img src='/images/marine_images/marine6.jpg' alt="" className="w-full  h-auto rounded-lg" />

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
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Restauration des habitats marins :</b>Mise en évidence de la santé des herbies de posidonies et de leur role dans la séquestration du carbone.</span>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Etat des populations : </b>Données sur l'abondance et la diversité des esp"ces suivies(grande nacre, poulpes, tortues marins, etc.)</span>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Indicateur d'impact : </b> Identification des impacts des activités humaines sur les écosystémes marins grace à des analyses réguliers.</span>
                                                </div>
                                            </div>

                                        <span className='text-[20px] font-bold'>Importance</span>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Gestion durable : </b>Les résultats permettent de mieux orienter les politiques de gestion des ressources naturelles.</span>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Préservation de la biodiversité : </b>Le suivi aide à protéger les espéces en danger en proposant des actions ciblées.</span>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Education et Sensibilisation : </b>Ces résultats servent à informer et mobiliser les communautés locales et les décideurs.</span>
                                                </div>
                                            </div>
                                       
                                    </div>
                                    <img src='/images/marine_images/marine7.jpg' alt="" className="w-full  h-auto rounded-lg" />

                                </section>
                                <hr className='border-2'/>  
                             

                            </section>
                                <div className='text-justify  text-[18px] sm:text-[22px] font-semibold'>
                                     <p className='text-center text-[30px] sm:text-[36px]'><span className='text-[#0270A0]'>Explorer</span> Les espéces de Notre Suivi Scientifique Marin </p>
                                </div>

                                <div className='text-justify  text-[18px] sm:text-[22px] font-bold'>
                                     <p className='text-center text-[18px] sm:text-[20px]'>Découvrez les trésors terrestres que nous surveillons pour</p>
                                </div>

                                <section className='mt-10 '>


                                </section>

                            <section className='border-t border-[#ADA5A5] '>
                                {/* <ImageHistoire /> */}
                            </section>
                    </div>
                </section>
        </div>
    )
}
