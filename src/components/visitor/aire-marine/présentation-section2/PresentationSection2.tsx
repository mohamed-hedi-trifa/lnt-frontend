import React from 'react'
import PageTitle from '../../../PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ContainerImageMarine from './CotainerImageMarine'
import TitleParagraphPrersentation from './TitleParagraphPresentation'
import { title } from 'process'

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
            title : <p className='font-bold text-[28px]'>Objectif et conservation</p>,
            description : [
                
                <p>L'AMCP se concentre sur plusieurs objectifs clés pour la conservation de l'écosystème marin :</p>,
                <div className=' relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4 '/>
                    <p className='ml-4 '><b>Protection des habitats sensibles :</b> Sauvegarder   les herbiers de posidonie, essentiels pour la reproduction de nombreuses espèces marines.</p>
                </div>,
                
                 <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4 '/>
                    <p className='ml-4'><b>Préservation des espèces menacées :</b> Protéger des espèces comme la grande nacre (Pinna nobilis), les tortues marines, et diverses espèces d'oiseaux migrateurs.</p>
                </div>,

                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4 '/>
                    <p className='ml-4'><b>Réduction de la pêche illégale :</b> Collaborer avec les autorités locales pour limiter la pêche destructrice et promouvoir des pratiques durables.</p>
                </div>,

                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><b>Sensibilisation et éducation :</b> Engager la communauté locale dans des initiatives de conservation, tout en offrant des formations et des ateliers sur l'importance de la biodiversité marine.</p>
                </div>

            ],
            image :<img src='/images/aire_marines/presentation/img2.jpg'alt="Aire marine" className="w-full  h-auto rounded-lg" />

        },

        {
            title : <p className='font-bold text-[28px]'>Importance Ecologique de l'AMCP</p>,
            description : [
                
                <p>L'AMCP joue un rôle fondamental dans le maintien de l'équilibre écologique de la Méditerranée. En protégeant les écosystèmes côtiers et marins, cette aire contribue à  :</p>,
                    <div className='relative'>
                        <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                        <p className='ml-4'><b>La régulation du climat :</b>  Les herbiers marins stockent le carbone, aidant ainsi à réduire les effets du changement climatique.</p>
                    </div>,

                    <div className='relative'>
                        <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                        <p className='ml-4'><b>La productivité des pêcheries locales :</b> En protégeant les zones de reproduction, l'AMCP garantit des ressources halieutiques durables pour les pêcheurs de Kerkennah.</p>
                    </div>,

                    <div className='relative'>
                        <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                        <p className='ml-4'><b>La résilience des écosystèmes : </b> En limitant l'impact des activités humaines, l'AMCP aide à préserver la diversité génétique et à renforcer la résilience face aux menaces environnementales telles que la pollution et le changement climatique.</p>
                    </div>,

                    <div className='relative'>
                        <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                        <p className='ml-4'><b>Le développement d’un écotourisme responsable : </b>En valorisant les richesses naturelles de la région, l'AMCP encourage un tourisme durable qui respecte l’environnement.</p>
                    </div>,

            ],
            image :<img src='/images/aire_marines/presentation/img3.png'alt="Aire marine" className="w-full  h-auto rounded-lg" />

        },
        {
            title : <p className='font-bold text-[28px]'>Biodiversité</p>,
            description : [
                
                <p>L'AMCP abrite une richesse écologique remarquable avec des espèces rares et endémiques. Parmi les espèces protégées, on trouve :</p>,
                
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><b>Herbiers de Posidonie : </b>  Ces prairies marines jouent un rôle crucial dans la purification de l'eau, la stabilisation des fonds marins, et la protection contre l'érosion.</p>
                </div>,

                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><b>LGrande Nacre (Pinna nobilis)  :</b> Un mollusque emblématique de la Méditerranée, aujourd'hui menacé par la surpêche et la pollution.</p>
                </div>,

                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><b>Espèces de Tortues Marines : </b> Les îlots de Kerkennah servent de refuge à plusieurs espèces de tortues marines, dont la tortue caouanne (Caretta caretta).  </p>
                </div>,

                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><b>Avifaune : </b>La région est un point de passage important pour les oiseaux migrateurs, offrant des habitats pour la reproduction et le repos.</p>
                </div>,

            ],
            image :<img src='/images/aire_marines/presentation/img3.png'alt="Aire marine" className="w-full  h-auto rounded-lg" />

        },  
        {
            title : <p className='font-bold text-[28px]'>Importance Ecologique de l'AMCP</p>,
            description : [
                
                <p>L'AMCP joue un rôle fondamental dans le maintien de l'équilibre écologique de la Méditerranée. En protégeant les écosystèmes côtiers et marins, cette aire contribue à :</p>,
                
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><b>La régulation du climat :</b>  Les herbiers marins stockent le carbone, aidant ainsi à réduire les effets du changement climatique.</p>
                </div>,

                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><b>La résilience des écosystèmes : </b> En limitant l'impact des activités humaines, l'AMCP aide à préserver la diversité génétique et à renforcer la résilience face aux menaces environnementales telles que la pollution et le changement climatique.</p>
                </div>,

                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><b>La productivité des pêcheries locales :</b> En protégeant les zones de reproduction, l'AMCP garantit des ressources halieutiques durables pour les pêcheurs de Kerkennah.</p>
                </div>,

                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><b>Le développement d’un écotourisme responsable : </b>En valorisant les richesses naturelles de la région, l'AMCP encourage un tourisme durable qui respecte l’environnement.</p>
                </div>
                
            ],
            image :<img src='/images/aire_marines/presentation/img4.jpg'alt="Aire marine" className="w-full  h-auto rounded-lg" />

        },
        {
            title : <p className='font-bold text-[28px]'>Zonage</p>,
            description : [
                
                <p>Pour assurer une gestion durable et efficace, l'Aire Marine et Côtière Protégée des Îlots Nord de Kerkennah est divisée en différentes zones aux fonctions spécifiques. Ce zonage permet de protéger la biodiversité tout en permettant des activités économiques durables.</p>,
                
                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><b>Zone de Protection Intégrale : </b> Accès strictement restreint pour préserver les écosystèmes les plus fragiles et sensibles. Cette zone est dédiée à la conservation stricte sans aucune activité humaine.</p>
                </div>,

                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><b>Zone de Pêche Réglementée : </b>  Secteurs où les pratiques de pêche durable sont autorisées, respectant des quotas et des saisons pour protéger les populations marines.</p>
                </div>,

                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><b>Zone de Recherche et Éducation : </b> Espace dédié aux projets de recherche scientifique, au suivi écologique et aux activités éducatives pour sensibiliser à la préservation des écosystèmes.</p>
                </div>,

                <div className='relative'>
                    <img src="/images/aire_marines/presentation/eclipse.png" alt="" className='w-[5px] h-[5px] absolute top-4'/>
                    <p className='ml-4'><b>Zone de Récréation : </b>Destinée aux activités éco-touristiques comme la plongée, les excursions en mer et l'observation de la faune, tout en respectant des règles strictes pour minimiser l'impact environnemental.</p>
                </div>,
                
            ],
            image :<img src='/images/aire_marines/presentation/img5.jpg'alt="Aire marine" className="w-full  h-auto rounded-lg" />

        },
        

    ]

    return (    
                       
        <div className='max-w-6xl mx-auto px-4'>  
            <section className="w-full grid grid-cols-[auto]  sm:grid-cols-[310px_auto_auto]  gap-8">
                {/* Première colonne */}
                <div className="flex justify-center"></div>

                {/* Deuxième colonne */}
                <div className="flex justify-center sm:justify-start">
                    <PageTitle 
                        title="Présentation"
                        width="w-[160px]"
                        fontSize="text-[48px] md:text-[64px] text-center sm:text-center "
                        itemsAlignment="items-start"
                        marginTop="mt-10"
                        marginYaxe=""
                        alignment="flex gap-2 items-start justify-start"
                        devider1="w-[19.83px] h-[6px] md:h-[9px] sm:w-[19.83px] bg-primary"
                        devider2="w-[160.25px] h-[6px] md:h-[9px] md:w-[168.58px] bg-primary"
                        styleTitle1=''
                        styleTitle2=''
                    />
                </div>

                {/* Troisième colonne */}
                <div className="flex justify-center "> </div>
            </section>

                
                <section className='w-full flex flex-col sm:flex-row relative gap-4 md:gap-8 py: py-2 md:py-10 '>
                    <Sidebar />
                    <section className='w-fit text-justify text-[22px] flex flex-col gap-10'>
                            
                                <PageTitle title="Aire Marine et Cotiere Protégée des Ilots Nord de L'archipel Kerkennah" 
                                    width='w-[160px]'
                                    color='#000000'
                                    fontSize=' text-[28px] lg:text-[40px] text-center sm:text-start '
                                    alignment={'flex gap-2  '}                
                                    devider1={'w-[19.83px] h-[6px] md:h-[9px] sm:w-[19.83px] bg-primary'}
                                    devider2={'w-[160.25px] h-[6px] md:h-[9px] md:w-[168.58px] bg-primary '}
                                    itemsAlignment={''}
                                    marginTop='0px'
                                    marginYaxe=''
                                    styleTitle1=''
                                    styleTitle2=''
                                />  
                       
                        <div className='leading-10 '>
                            <div className='text-[18px] md:text[22px] font-medium flex flex-col gap-6'>
                                <p>
                                L'Aire Marine et Côtière Protégée des Îlots Nord de l'Archipel de Kerkennah (AMCP) a été créée dans le but de préserver les écosystèmes marins fragiles de la région. Située au large des côtes tunisiennes, cette zone protégée vise à protéger la biodiversité unique des îlots de Kerkennah tout en soutenant les communautés locales. La mission de l'AMCP est de garantir la conservation des ressources marines, de promouvoir une pêche durable, et de sensibiliser à l'importance de la protection des écosystèmes marins. En collaborant avec les pêcheurs, les chercheurs, et les institutions, l'AMCP œuvre pour un développement équilibré entre la protection de l'environnement et les besoins socio-économiques de la région.
                                </p>
                            </div>                                        
                        </div>

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
    )
}
