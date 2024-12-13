import React from 'react'
import PageTitle from '../../../PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ContainerImageMarine from '../présentation-section2/CotainerImageMarine'
import Partners from '../../who-are-we/partners/Partners'

export default function PresentationPartenaire() {

    const images = [
        {
            title :'Explorez l’Aire Marine Protégée',
            description : 'Préservons ensemble les Îlots Nord de Kerkennah',
            imageUrl : '/images/aire_marines/marine1.jfif'
        },
        {   
            title :'Découvrez nos Partenaires',
            description : 'Engagés pour la Protection des Îles de Kerkennah',
            imageUrl : '/images/aire_marines/marine2.jfif'
        }
    ]

    return (    
                       
        <div className='max-w-7xl mx-auto px-4 '>  
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
                        styleTitle1={'grid grid-cols-[22%_auto_22%] sm:grid-cols-[0_auto_0]'} 
                        styleTitle2={'grid grid-cols-[22%_auto_22%] sm:grid-cols-[0_auto_0] ml-2'} 
                    />
                </div>

                {/* Troisième colonne */}
                <div className="flex justify-center "> </div>
            </section>


            <section className='w-full flex flex-col sm:flex-row relative gap-4 md:gap-8 py: py-2 md:py-10 '>
                    <Sidebar />
                    <section className='w-fit text-justify text-[22px] flex flex-col gap-10 '>
                     
                        <PageTitle title="Partenaires AMCP "
                            width='w-[160px]'
                            color='#000000'
                            fontSize=' text-[28px] md:text-[40px] text-center sm:text-center'
                            alignment={'flex gap-2  '}
                            devider1={'w-[19.83px] h-[6px] md:h-[9px] sm:w-[19.83px] bg-primary'}
                            devider2={'w-[160.25px] h-[6px] md:h-[9px] md:w-[168.58px] bg-primary '}
                            itemsAlignment={'items-center sm:items-start'}
                            marginTop='0px'
                            marginYaxe='' 
                            styleTitle1={''} 
                            styleTitle2={''}     
                        />  
                        <div className='leading-10'>
                            <div className='text-[20px] md:text[22px] font-medium flex flex-col gap-6'>
                                <p className='font-semibold '>Les Aires Marines et Côtière Protégées (ACMP) sont des zones marines et côtières placées sous protection en raison de leur importance écologique.</p>
                                <p>Les AMCP sont de plus en plus reconnues dans le monde entier comme l'un des outils les plus efficaces pour la conservation et la protection de l'environnement marin lorsqu'elles sont gérées efficacement et disposent des moyens adaptés aux problèmes locaux de gestion.</p>
                                <p>Outre leur rôle dans la conservation de la biodiversité, les AMP ont prouvé leur efficacité dans le rétablissement des espèces, des habitats et des communautés biologiques en déclin et sont également reconnues pour leur rôle dans le renforcement de la résilience des écosystèmes. Elles peuvent contribuer, dans une approche de gestion partagée (cogestion), au développement durable d'activités socio-économiques telles que la pêche artisanale et l'écotourisme.</p>
                                <p>Elles représentent l'un des outils de gestion disponibles que le secteur de la pêche commence à utiliser sous forme de réserves de pêche ou d’AMP. Elles contribuent au bien-être des populations et à l'attractivité des territoires et stimulent ainsi le développement durable des économies locales.</p>
                                <p>Les bénéfices et les services offerts par la conservation de la biodiversité, les enjeux liés à la gestion des AMP et des ressources naturelles marines (pêche en particulier) permettent aujourd'hui de rassembler les défenseurs de la conservation, ceux du secteur de la pêche et les acteurs de la gouvernance de la biodiversité dans un processus intégré avec les autres politiques sectorielles.</p>
                            </div>                                        
                        </div>
                    </section>
            </section>  
            <Partners/>

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
