import React from 'react'
import achievementsHero from "../../../../../../assets/images/achievements-hero.jpg";
import Etiquette from './Etiquette';
import PageTitle from '@/components/atoms/titles/PageTitle';
import AMCPSidebar from '@/components/layout/AMCPSidebar';
import SectionTitle from '@/components/atoms/titles/SectionTitle';
import Table from '@/components/visitor/who-are-we/rapports/Table';
import Media from '@/components/visitor/who-are-we/our-achievements/acheivement2/Media2';
import List from '@/components/atoms/List';
import Title from '@/components/atoms/titles/Title';
import PageParagraph from '@/components/atoms/PageParagraph';


export default function Psidonie() {
    const dataTable = [
        { title: "Posidonie_Kerkennah_Suivi.pdf", date: "Ce rapport résume les résultats du suivi écologique des herbiers de posidonie, incluant leur état de santé et les impacts environnementaux observés", image: "/images/Pdf.png" },
        { title: "Posidonie_Kerkennah_Suivi.pdf", date: "Ce rapport résume les résultats du suivi écologique des herbiers de posidonie, incluant leur état de santé et les impacts environnementaux observés", image: "/images/Pdf.png" },
        { title: "Posidonie_Kerkennah_Suivi.pdf", date: "Ce rapport résume les résultats du suivi écologique des herbiers de posidonie, incluant leur état de santé et les impacts environnementaux observés", image: "/images/Pdf.png" },
        { title: "Posidonie_Kerkennah_Suivi.pdf", date: "Ce rapport résume les résultats du suivi écologique des herbiers de posidonie, incluant leur état de santé et les impacts environnementaux observés", image: "/images/Pdf.png" },
        { title: "Posidonie_Kerkennah_Suivi.pdf", date: "Ce rapport résume les résultats du suivi écologique des herbiers de posidonie, incluant leur état de santé et les impacts environnementaux observés", image: "/images/Pdf.png" },
        { title: "Posidonie_Kerkennah_Suivi.pdf", date: "Ce rapport résume les résultats du suivi écologique des herbiers de posidonie, incluant leur état de santé et les impacts environnementaux observés", image: "/images/Pdf.png" },
      ];


    return (
        <div className=''>
            <img className='w-full object-cover h-[80vh]' src={achievementsHero} />
                    <div className="flex justify-center sm:justify-center pb-4 ">
                    <div className="flex justify-center sm:justify-center pb-4 ">
                                <PageTitle
                                    title="Suivi Marin"
                                    width="w-[160px]"
                                    fontSize="text-[48px] md:text-[64px] text-start"
                                />
                    </div> 
                    </div>            
                <section className='px-4'>
                    <div className='max-w-6xl mx-auto '>
                    <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
                                <AMCPSidebar />

                                <section className='w-fit flex flex-col'>
                                
                                    <SectionTitle title="Posidonie"
                                        width='w-[160px]'
                                        color='#000000'
                                        fontSize=' text-[28px] lg:text-[40px] text-center sm:text-start'
                                        spacing='my-8 sm:mt-0'
                                    />   

                                    <Title size="text-[32px] sm:text-[28px] italic" spacing='mb-4'>
                                    Pilier Écologique de Kerkennah
                                    </Title>

                                    <PageParagraph fontWeight='font-semibold' spacing='mb-4'>
                                    La Posidonia oceanica est une plante marine endémique de la Méditerranée, souvent confondue avec une algue. Elle forme de vastes herbiers sous-marins qui jouent un rôle écologique crucial :
                                    </PageParagraph>

                                    <List
                                    spacing='mb-8'
                                    items={[{
                                        title:"Production d'oxygéne :",
                                        content:"Les herbiers de psidonie sont responsables d'une production importante d'oxygéne sous-marin ."
                                    },
                                    {
                                        title:"Séquestration du carbone :",
                                        content:"Ils capturent et stockent du carbone, contribuant ainsi à lutter contre le changement climatique."
                                    }]} />

                                    <Etiquette
                                        image={'/suivi_icons/icon2.png'} 
                                        titre={'Nom scientifique'} 
                                        description={'Psidonia oceanica'}
                                     />
                                    <hr />
                                    <Etiquette
                                        image={'/suivi_icons/icon3.png'} 
                                        titre={'Réparation / Habitat'} 
                                        description={"Mer Médieteranée.Les herbiers de psidonie à leurs fonds marins sablonneux ou rocheux peu profonds(Jusqu'a 40 métres)."}
                                     />
                                    <hr />
                                    <Etiquette
                                        image={'/suivi_icons/regle 1.png'} 
                                        titre={'Taille'} 
                                        description={'La psidonie est une plante à fleurs qui est formée de longues feuilles(de 20 à 100 cm de long,pour 6 à 10 mm de large). son fruit ressemble à une olive verte.'}
                                     />
                                    <hr />
                                    <Etiquette
                                        image={'/suivi_icons/icon1.png'} 
                                        titre={'Régime alimentaire'} 
                                        description={"en prélevant les nutriments(azote, phophore,CO2...) présents dans l'eau ou dans des sidéments et grace à la lumiére du soleil(énergie), la psidonie produit sa propre matiére organique(autrophie) et peut donc croitre et se produire."}
                                     />
                                    <hr />
                                    <Etiquette
                                        image={'/suivi_icons/icon4.png'} 
                                        titre={'Statut'} 
                                        description={"En danger en Région Provence Alpes Cote d'Azur, C'est aussi une espéce protégée depuis 1988 en France et habitat d'intéret caumunaitaire."}
                                        spacing='mb-8'
                                     />

                                    
                                    <Title size="text-[25px] sm:text-[28px]" variant="pill" spacing='mb-4'>La Psidonie à Kerkennah : Un écosystéme Unique</Title>


                                    <Title spacing='mb-2'>Présentation Locale</Title>

                                    <PageParagraph fontWeight='font-semibold' spacing='mb-4'>
                                        Dans l'archipel de Kerkennah, la psidonie se développe dans des zones spécifiques, formant un écosystéme unique : 
                                    </PageParagraph>
                                    
                                       <List
                                       spacing='mb-4'
                                        items={[
                                        {
                                            title:"",
                                            content:"Elle soutient des espèces endémiques et migratrices, offrant nourriture et abri."
                                        },
                                        {
                                            title:"",
                                            content:"Les pêcheurs locaux dépendent indirectement de cet écosystème pour maintenir leurs activités traditionnelles."
                                        }
                                       ]} />

                                        <Title spacing='mb-4'>Un Rôle Socio-Économique</Title>

                                        <List
                                        spacing='mb-4'
                                        items={[{
                                            title:"",
                                            content:"Les herbiers de posidonie sont un atout pour les pêcheries locales, attirant les poissons dans les zones côtières."
                                        },
                                        {
                                            title:"",
                                            content:"Ils constituent également une protection naturelle contre les tempêtes et l’érosion, préservant ainsi les côtes des îles."
                                        },
                                        ]} />


                                    <img src='/suivi_images/suivi3.png'alt="Aire marine" className="w-full  h-auto rounded-lg mb-12" />
                                    
                                    <Title size="text-[25px] sm:text-[28px]" variant="pill" spacing='mb-4'>Rôle Écologique de la Posidonie dans l’Archipel</Title>

                                    <Title spacing='mb-2'>
                                        Stabilisation des Fonds Marins
                                    </Title>

                                    <PageParagraph spacing='mb-2'>
                                    Les racines et rhizomes de la posidonie fixent les sédiments, empêchant leur dispersion et réduisant l'impact des vagues sur les plages.
                                    </PageParagraph>
                                    
                                    <Title spacing='mb-2'>Refuge pour la Biodiversité</Title>

                                    <List
                                    spacing='mb-2'
                                    items={[{
                                        title:"",
                                        content:"Habitat pourbde nombreuses espéces marines : tortues, poissons, mollusqques, etc."
                                    },
                                    {
                                        title:"",
                                        content:"Couloir de migration pour certaines espéces protégées."
                                    }]} />

                                    <Title spacing='mb-2'>Protection Contre l’Érosion</Title>

                                    <PageParagraph spacing='mb-2'>La posidonie forme une barriére naturelle contre les vagues, limitant l'érosion cotiére et contribuant à la résillence des plages.</PageParagraph>

                                    <img src='/images/marine_images/marine14.jpeg' alt="" className="w-full  h-auto rounded-lg mb-12" />

                                    <Title spacing='mb-4' size="text-[25px] sm:text-[28px]" variant="pill">Menaces Locales sur la Posidonie</Title>

                                    
                                        <Title spacing='mb-2'>Activités humaines</Title>

                                        <List
                                        spacing='mb-2'
                                        items={[{
                                            title:"Chalutage illégal :",
                                            content:"Cette méthode de pêche détruit les herbiers en les arrachant ."
                                        },
                                        {
                                            title:"Pollution des eaux cotiéres :",
                                            content:"Déchets plastiques, hydrocarbures, et eaux usées ."
                                        },
                                        {
                                            title:"Aménagement cotiers :",
                                            content:"Ports et infrastructures modifient les courants et l'habitat naturel."
                                        }]} />

                                        <Title spacing='mb-2'>Changement Climatique</Title>

                                        <List
                                        spacing='mb-4'
                                        items={[{
                                            title:"",
                                            content:"Augmentation des températures de l'eau."
                                        },{
                                            title:"",
                                            content:"Acidification des océans qui affiblit la croissance des herbiers."
                                        }]} />
                                          
                                    <img src='/images/marine_images/marine7.jpg' alt="" className="w-full  h-auto rounded-lg mb-12" />

                                    <Title spacing='mb-4' size="text-[25px] sm:text-[28px]" variant="pill">Suivi Scientifique de la Posidonie à Kerkennah</Title>

                                    <Title spacing='mb-2'>Objectifs du Suivi</Title>
                                    <List
                                    spacing='mb-2'
                                    items={[
                                        {
                                            title:"",
                                            content:"Evaluer l'état de santé des herbiers."
                                        },
                                        {
                                            title:"",
                                            content:"Mesurer leur contribution à la biodiversité locale."
                                        },
                                        {
                                            title:"",
                                            content:"Identifier les zones vulnérables et les pressions écologiques."
                                        }
                                    ]} />                                 
                                                          
                                    <Title spacing='mb-2'>Méthodologies Utilisées</Title>
                                    <Title spacing='mb-2'>1. Relevvés sous-marins : </Title>
                                    <List 
                                    spacing='mb-2'
                                    items={[
                                        {
                                            title:"",
                                            content:"Mesurer la densité des herbiers."
                                        },
                                        {
                                            title:"",
                                            content:"Evaluation de la longeur et de la largeur des feuilles."
                                        }
                                    ]}
                                    />

                                    <Title spacing='mb-2'>2. Images par drone : </Title>
                                    <List
                                    spacing='mb-2'
                                    items={[{
                                            title:"",
                                            content:"Cartographie des zones herbeuses."
                                    },
                                    {
                                        title:"",
                                        content:"Suivi des dégradations visibles."
                                }
                                ]}
                                    />

                                    <Title spacing='mb-2'>2. Etudes de biodiversité : </Title>

                                    <List
                                    spacing='mb-2'
                                    items={[{
                                        title:"",
                                        content:"Suivi des dégradations visibles."
                                    },
                                    {
                                        title:"",
                                        content:"Analyse des interaction écologique dans l'écosystéme."
                                    },
                                    ]} />

                                    <Title spacing='mb-2'> Indicateurs Suivis </Title>

                                    <List
                                    spacing='mb-2'
                                    items={[
                                        {
                                            title:"",
                                            content:"Densité des rhizomes."
                                        },
                                        {
                                            title:"",
                                            content:"Longueur moyenne des feilles."
                                        },
                                        {
                                            title:"",
                                            content:"Présence de macro-déchets ou de signes de pollution."
                                        },
                                        {
                                            title:"",
                                            content:"Présence de macro-déchets ou de signes de pollution."
                                        },
                                    ]}
                                    />

                                    <Title spacing='mb-2'> Résultats et Découvertes </Title>

                                    <List
                                    spacing='mb-2'
                                    items={[
                                        {
                                    title:"Zones en bonne santé :",
                                    content:"Herbiers denses et biodiversité abondante ."
                                        },
                                        {
                                            title:"Zones menacées :",
                                            content:"Prés des ports et dans les zones chalutage illégal ."
                                                }
                                    ]}
                                    />

                                    <Title spacing='mb-2'>Implication Communautaire :</Title>

                                    <PageParagraph spacing='mb-2'>Les pecheurs locaux participent aux suivi :  </PageParagraph>

<List 
spacing='mb-2'
items={[{
title:"",
content:"En signalant les zones à risque."
},
{
title:"",
content:"En intégrant les relevés dans leurs pratiques de peche."
}]} />

                                    <img src='/images/marine_images/marine7.jpg' alt="" className="w-full  h-auto rounded-lg mb-12" />

                                    
                                    <Title spacing='mb-4' size="text-[25px] sm:text-[28px]" variant="pill">Recommendation à la protection de la posidonie</Title>
                                    
                                    <Title spacing='mb-2'>Mesurers Réglementaires</Title>

                                    <List
                                    spacing='mb-2'
                                    items={[{
                                    title:"",
                                    content:"Interdire les pratiques de peche dustrictrices comme le chalutage dans les zones sensibles."
                                    },
                                    {
                                    title:"",
                                    content:"Metter en place des zones marines protégées autour des herbiers ."
                                    }]}
                                    />

                                    <Title spacing='mb-2'>Sensibilisation et Education</Title>

                                    <List
                                    items={[
                                        {
                                            title:"",
                                            content:"Compagne éducative pour innformer la communauté sur l'importance écologique des herbiers."
                                    },
                                    {
                                        title:"",
                                        content:"Formations des pécheurs et des jeunes locaux aux bones pratique de préservation."
                                }
                                ]}
                                    />
                                   
                                        <Title spacing='mb-2'>Suivi à Long Terme</Title>

<List
spacing='mb-2'
items={[
    {
        title:"",
        content:"Intégrer des technologies comme ds capteurs environnementaux  pour un suivi continu ."
    },
    {
        title:"",
        content:"Publier des rapports annuels sur l'état des herbiers"
    }
]}
/>


<Title spacing='mb-4' size="text-[25px] sm:text-[28px]" variant="pill">Importance Globale de la Posidonie</Title>

                                 <PageParagraph spacing='mb-2'>Les herbiers de la posidonie ne sont pas uniquement une ressource locale, mais un atout global dans la lutte contre ola crise climatique et la perte de biodiversité . Leur préservation est essentielle pour garantir l'équilibre écologique des écosystémes marins de Kerkennah et au-déla</PageParagraph>


                                </section>
                             

                            </section>

                            
                            <div className=' grid grid-cols-[10%_auto_10%] '>
                               
                                <div></div>
                                <div>
                                    <span className=' text-[28px] sm:text-[36px] font-bold'>
                                        <p className='text-center'><span className='text-[#0270A0]'>Immersion visuelle</span> dans L'Ecosystéme de la </p>
                                        <p className='text-center'>Posidonie</p>
                                    </span>
                                    <span className=''>
                                        <p className='text-center text-[20px] font-semibold'>Découvrez la richesse visuelle de la posidonie à travers les images</p>
                                        <p className='text-center text-[20px] font-semibold'>captivantes et des vidéos éducatives</p>
                                    </span>
                                </div>
                                <div></div>
                            </div>
                            <Media/>
                            <hr  className='border-2 border-[#ADA5A5] my-10'/>
                            <span className='text-[28px] sm:text-[36px] font-bold'>
                                <p className='text-center'><span className='text-[#0270A0]'>Recherche</span> et Connaissances sur la Posidonie </p>
                            </span>
                            <div className='my-10'></div>
                            <div className='font-semibold text-[18px] sm:text-[20px]'>
                                <p className='text-center'>La recherche scienntifique sue la Posidonie, plante emblématique de la </p>
                                <p className='text-center'>Méditerannée, est essentielle pour comprendre son roleécologique et les menaces</p>
                                <p className='text-center'>auxquelles, elle fait face. Cette section regroupedes rapports et des articles </p>
                                <p className='text-center'>détaillant les résultats des suivis scientifiques, les méthodologies utilisées,et les </p> 
                                <p className='text-center'> recommendations pour préserver cet écosystémeclé dans l'archipelde </p>
                                <p className='text-center'>Kerkennah</p>

                            </div>  
                            
                            <Table data={dataTable} />
                            
                            <section className='border-t border-[#ADA5A5] my-[20px]'>
                            <span className='font-bold '>
                                <p className='text-center text-[28px] sm:text-[36px] '><span className='text-[#0270A0] '>Découvrez</span> d'autres espèces fascinantes qui </p>
                                <p className='text-center text-[28px] sm:text-[36px]'>peuplent nos écosystèmes marins</p>
                                <p className='text-center text-[18px] sm:text-[20px]'>Découvrez les trésors marins que nous préservons</p>

                            </span>
                            </section>
                    </div>
                </section>
        </div>
    )
}
