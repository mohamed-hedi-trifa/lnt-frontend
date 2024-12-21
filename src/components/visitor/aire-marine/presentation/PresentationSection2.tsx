import React from 'react'
import PageTitle from '../../../atoms/titles/PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ContainerImageMarine from '../CotainerImageMarine'
import TitleParagraphPrersentation from '../présentation-section2/TitleParagraphPresentation'
import { title } from 'process'
import SectionTitle from '../../../atoms/titles/SectionTitle'
import AMCPSidebar from '../../../layout/AMCPSidebar'
import PageParagraph from '../../../atoms/PageParagraph'
import presentationHero from "../../../../assets/images/presentation2-hero.jpg"
import HeroSection from '../../HeroSection'

export default function PresentationSection2() {

    const images = [
        {
            title :'Découvrir nos partenaires',
            description : 'Egagés pour la protection des iles de Kerkennah',
            imageUrl : '/images/aire_marines/marine2.jfif'
        },
        {   
            title :'Explorer le suivi scientifique',
            description : 'Protégeons ensemble la biodiversité de kerkennah',
            imageUrl : '/images/aire_marines/presentation/img6.jpg'
        }
    ]
    const tab = [
        {
            title : <h3 className='font-bold text-[24px] sm:text-[28px]'>Objectif de conservation</h3>,
            description : [
                <PageParagraph fontWeight='font-semibold'>L'AMCP se concentre sur plusieurs objectifs clés pour la conservation de l'écosystème marin :</PageParagraph>,
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4 '/>
                    <p className='ml-4'><span className='font-semibold'>Protection des habitats sensibles :</span> Sauvegarder les herbiers de posidonie, essentiels pour la reproduction de nombreuses espèces marines.</p>
                </div>,
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4 '/>
                    <p className='ml-4'><span className='font-semibold'>Préservation des espèces menacées :</span> Protéger des espèces comme la grande nacre (Pinna nobilis), les tortues marines, et diverses espèces d'oiseaux migrateurs.</p>
                </div>,
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4 '/>
                    <p className='ml-4'><span className='font-semibold'>Réduction de la pêche illégale :</span> Collaborer avec les autorités locales pour limiter la pêche destructrice et promouvoir des pratiques durables.</p>
                </div>,
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><span className='font-semibold'>Sensibilisation et éducation :</span> Engager la communauté locale dans des initiatives de conservation, tout en offrant des formations et des ateliers sur l'importance de la biodiversité marine.</p>
                </div>
            ],
            image :<img src='/images/aire_marines/presentation/img2.jpg'alt="Aire marine" className="w-full  h-auto rounded-lg" />
        },
        
        {
            title : <h3 className='font-bold text-[24px] sm:text-[28px]'>Biodiversité</h3>,
            description : [
                <PageParagraph fontWeight='font-semibold'>L'AMCP abrite une richesse écologique remarquable avec des espèces rares et endémiques. Parmi les espèces protégées, on trouve :</PageParagraph>,
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><span className='font-semibold'>Herbiers de Posidonie :</span> Ces prairies marines jouent un rôle crucial dans la purification de l'eau, la stabilisation des fonds marins, et la protection contre l'érosion.</p>
                </div>,
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><span className='font-semibold'>Grande Nacre (Pinna nobilis) :</span> Un mollusque emblématique de la Méditerranée, aujourd'hui menacé par la surpêche et la pollution.</p>
                </div>,
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><span className='font-semibold'>Espèces de Tortues Marines :</span> Les îlots de Kerkennah servent de refuge à plusieurs espèces de tortues marines, dont la tortue caouanne (Caretta caretta).</p>
                </div>,
                <div className='relative'>
                <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                <p className='ml-4'><span className='font-semibold'>Avifaune :</span> La région est un point de passage important pour les oiseaux migrateurs, offrant des habitats pour la reproduction et le repos.</p>
            </div>
            ],
            image :<img src='/images/aire_marines/presentation/img3.png'alt="Aire marine" className="w-full  h-auto rounded-lg" />
           
        },
        {
            title : <h3 className='font-bold text-[24px] sm:text-[28px]'>Importance Écologique de l'AMCP</h3>,
            description : [
                <PageParagraph fontWeight='font-semibold'>L'AMCP joue un rôle fondamental dans le maintien de l'équilibre écologique de la Méditerranée. En protégeant les écosystèmes côtiers et marins, cette aire contribue à :</PageParagraph>,
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><span className='font-semibold'>La régulation du climat :</span> Les herbiers marins stockent le carbone, aidant ainsi à réduire les effets du changement climatique.</p>
                </div>,
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><span className='font-semibold'>La productivité des pêcheries locales :</span> En protégeant les zones de reproduction, l'AMCP garantit des ressources halieutiques durables pour les pêcheurs de Kerkennah.</p>
                </div>,
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><span className='font-semibold'>La résilience des écosystèmes :</span> En limitant l'impact des activités humaines, l'AMCP aide à préserver la diversité génétique et à renforcer la résilience face aux menaces environnementales telles que la pollution et le changement climatique.</p>
                </div>,
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><span className='font-semibold'>Le développement d’un écotourisme responsable :</span> En valorisant les richesses naturelles de la région, l'AMCP encourage un tourisme durable qui respecte l’environnement.</p>
                </div>
            ],
            image :<img src='/images/aire_marines/presentation/img4.jpg'alt="Aire marine" className="w-full  h-auto rounded-lg" />
        },
        {
            title : <h3 className='font-bold text-[24px] sm:text-[28px]'>Zonage</h3>,
            description : [
                <PageParagraph fontWeight='font-semibold'>Pour assurer une gestion durable et efficace, l'Aire Marine et Côtière Protégée des Îlots Nord de Kerkennah est divisée en différentes zones aux fonctions spécifiques. Ce zonage permet de protéger la biodiversité tout en permettant des activités économiques durables.</PageParagraph>,
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><span className='font-semibold'>Zone de Protection Intégrale :</span> Accès strictement restreint pour préserver les écosystèmes les plus fragiles et sensibles. Cette zone est dédiée à la conservation stricte sans aucune activité humaine.</p>
                </div>,
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><span className='font-semibold'>Zone de Pêche Réglementée :</span> Secteurs où les pratiques de pêche durable sont autorisées, respectant des quotas et des saisons pour protéger les populations marines.</p>
                </div>,
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><span className='font-semibold'>Zone de Recherche et Éducation :</span> Espace dédié aux projets de recherche scientifique, au suivi écologique et aux activités éducatives pour sensibiliser à la préservation des écosystèmes.</p>
                </div>,
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><span className='font-semibold'>Zone de Récréation :</span> Destinée aux activités éco-touristiques comme la plongée, les excursions en mer et l'observation de la faune, tout en respectant des règles strictes pour minimiser l'impact environnemental.</p>
                </div>
            ],
            image :<img src='/images/aire_marines/presentation/img4.jpg'alt="Aire marine" className="w-full  h-auto rounded-lg" />
        },
    
    ];
    

    return (    
                       
        <div className=''>  
            <HeroSection title="Les Îlots Nord de Kerkennah: Un Refuge de Biodiversité Marine" subTitle="Une protection renforcée pour préserver la beauté naturelle et la biodiversité exceptionnelle de la région" imgSrc={presentationHero} />
                
                    <PageTitle 
                        title="Présentation"
                        width="w-[160px]"
                    />
                <section className='px-4 sm:px-0'>
                    <div className='max-w-6xl mx-auto'>
                <section className='w-full flex flex-col sm:flex-row relative gap-4 md:gap-8 py-2 md:py-10'>
                    <AMCPSidebar />
                    <section className='w-fit text-[22px] flex flex-col gap-8'>
                            
                                <SectionTitle title="Aire Marine et Cotiere Protégée des Ilots Nord de L'archipel Kerkennah" 
                                    width='w-[160px]'
                                    customClassName='!w-auto'
                                    fontSize='text-[27px] sm:text-[40px] leading-[48px]'
                                    spacing="mt-8 sm:mt-0"
                                />  
                       
                        <PageParagraph>L'Aire Marine et Côtière Protégée des Îlots Nord de l'Archipel de Kerkennah (AMCP) a été créée dans le but de préserver les écosystèmes marins fragiles de la région. Située au large des côtes tunisiennes, cette zone protégée vise à protéger la biodiversité unique des îlots de Kerkennah tout en soutenant les communautés locales. La mission de l'AMCP est de garantir la conservation des ressources marines, de promouvoir une pêche durable, et de sensibiliser à l'importance de la protection des écosystèmes marins. En collaborant avec les pêcheurs, les chercheurs, et les institutions, l'AMCP œuvre pour un développement équilibré entre la protection de l'environnement et les besoins socio-économiques de la région.</PageParagraph>
                        
                        <img src='/images/aire_marines/presentation/img1.jpg'alt="Aire marine" className="w-full  h-auto rounded-lg" />
                        
                        <TitleParagraphPrersentation doc={tab} />

                        <div>
                            <img src='/images/aire_marines/presentation/gestion.png'alt="Aire marine"  />
                        </div>

                        <div className=' flex items-center p-2'>
                            <img src="/images/Pdf.png" alt="item" className="w-[40px] h-[45px] object-cover" />
                            <span className="text-[12px] md:text-[16px] ml-[16px] text-[#0270A0] underline">Plan_de_gestion_AMCP.pdf</span>
                        </div>

                    </section>

                </section>   

                <hr className='my-6 border-[2px] text-custom-gray'/>

                <section className='flex items-start justify-center '>

                     <div className='w-full flex items-center justify-center '>
                        <ContainerImageMarine images={images}/>
                    </div>
                            
                </section>

                <div className='mt-20'></div>

                    </div>
                </section>
            </div>            
    )
}
