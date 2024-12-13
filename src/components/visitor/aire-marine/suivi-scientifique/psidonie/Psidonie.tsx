import React from 'react'
import PageTitle from '../../../../PageTitle';
import Sidebar from '../../../../layout/Sidebar';
import achievementsHero from "../../../../../assets/images/achievements-hero.jpg";
import Etiquette from './Etiquette';
import TableF from '../../../who-are-we/rapports/Table';
import Media2 from '../../../who-are-we/our-achievements/acheivement2/Media2';


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
                                />
                    </div> 
                    </div>            
                <section className='px-4'>
                    <div className='max-w-6xl mx-auto '>
                    <section className='w-full flex flex-col sm:flex-row relative sm:gap-8 sm:py-10'>
                                <Sidebar />

                                <section className='w-fit flex flex-col gap-4'>
                                
                                    <PageTitle title="Posidonie"
                                        width='w-[160px]'
                                        color='#000000'
                                                                     
                                    />   


                                    <div className=''>
                                        <div className='text-center sm:text-start'><p className='font-semibold text-[32px] italic'>Pilier Écologique de Kerkennah</p></div>
                                    </div>

                                    <div className='text-justify  text-[20px] font-semibold'>
                                    La Posidonia oceanica est une plante marine endémique de la Méditerranée, souvent confondue avec une algue. Elle forme de vastes herbiers sous-marins qui jouent un rôle écologique crucial :
                                    </div>

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Production d'oxygéne : </b>Les herbiers de psidonie sont responsables d'une production importante d'oxygéne sous-marin .</span>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Séquestration du carbone : </b>Ils capturent et stockent du carbone, contribuant ainsi à lutter contre le changement climatique.</span>
                                        </div>
                                    </div>

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
                                     />

                                    <div className='flex items-center relative '>
                                        <div className='absolute top-[10px] '><img src="/images/marine_images/rectangle.png" alt="" /></div>
                                        <div className='ml-4'><p className='font-bold text-[25px] sm:text-[28px] '>La Psidonie à Kerkennah : Un écosystéme Unique</p></div>
                                    </div>

                                    <div>

                                    <div className='text-[20px] font-bold mt-4'>
                                        Présentation Locale
                                    </div>

                                    <br />

                                    <div className='text-justify  text-[20px] font-semibold'>
                                        Dans l'archipel de Kerkennah, la psidonie se développe dans des zones spécifiques, formant un écosystéme unique : 
                                    </div>
                                    
                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Elle soutient des espèces endémiques et migratrices, offrant nourriture et abri.</span>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Les pêcheurs locaux dépendent indirectement de cet écosystème pour maintenir leurs activités traditionnelles.</span>
                                            </div>
                                        </div>

                                        <div className='text-[20px] font-bold'>    
                                            Un Rôle Socio-Économique
                                         </div>

                                         <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Les herbiers de posidonie sont un atout pour les pêcheries locales, attirant les poissons dans les zones côtières.</span>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Ils constituent également une protection naturelle contre les tempêtes et l’érosion, préservant ainsi les côtes des îles.</span>
                                            </div>
                                        </div>


                                    </div>
                                    <img src='/suivi_images/suivi3.png'alt="Aire marine" className="w-full  h-auto rounded-lg" />
                                    
                                    <div className='flex items-center relative '>
                                        <div className='absolute top-[10px] '><img src="/images/marine_images/rectangle.png" alt="" /></div>
                                        <div className='ml-4'><p className='font-bold text-[25px] sm:text-[28px] '>Rôle Écologique de la Posidonie dans l’Archipel</p></div>
                                    </div>

                                    <div className='text-[20px] font-bold'>
                                        Stabilisation des Fonds Marins
                                    </div>
                                    
                                    <div>


                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                        
                                        <div className=' col-span-2 '>
                                            <span className='text-[18px] sm:text-[20px] leading-[50px]'>Les racines et rhizomes de la posidonie fixent les sédiments, empêchant leur dispersion et réduisant l'impact des vagues sur les plages.</span>
                                        </div>

                                    </div>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                      
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Refuge pour la Biodiversité</b></span>
                                             </div>  
                                        </div>

                                    


                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Habitat pourbde nombreuses espéces marines : tortues, poissons, mollusqques, etc.</span>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                            <div className=' flex justify-center mt-2'>
                                                <span className='px-4 font-bold text-[20px]'>.</span>
                                            </div>
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Couloir de migration pour certaines espéces protégées.</span>
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                      
                                      <div className=' col-span-2 '>
                                          <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Protection Contre l’Érosion</b></span>
                                       </div>  
                                  </div>

                                  <div className='grid grid-cols-[30px_auto_auto] '>
                                          
                                            <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>La posidonie forme une barriére naturelle contre les vagues, limitant l'érosion cotiére et contribuant à la résillence des plages.</span>
                                            </div>
                                        </div>

                                        
                                        
                                        

                                    </div>
                                    <img src='/images/marine_images/marine6.jpg' alt="" className="w-full  h-auto rounded-lg" />

                                    <div className='flex items-center relative '>
                                        <div className='absolute top-[10px] '><img src="/images/marine_images/rectangle.png" alt="" /></div>
                                        <div className='ml-4'><p className='font-bold text-[25px] sm:text-[28px] '>Menaces Locales sur la Posidonie</p></div>
                                    </div>

                                    <div className='ml-10'>
                                        <span className='text-[20px] font-bold'>Activités humaines</span>

                                            
                                           

                                            <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Indicateur d'impact : </b> Cette méthode de péche détruit les herbiers en les arrachant.</span>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Pollution des eaux cotiéres : </b>Déchets plastiques, hydrocarbures, et eaux usées .</span>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Aménagement cotiers : </b> Ports et infrastructures modifient les courants et l'habitat naturel.</span>
                                                </div>
                                            </div>

                                        <span className='text-[20px] font-bold'>Changement Climatique</span>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'>Augmentation des températures de l'eau.</span>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'>Acidification des océans qui affiblit la croissance des herbiers.</span>
                                                </div>
                                            </div>

                                          
                                       
                                    </div>
                                    <img src='/images/marine_images/marine7.jpg' alt="" className="w-full  h-auto rounded-lg" />

                                    <div className='flex items-center relative '>
                                        <div className='absolute top-[10px] '><img src="/images/marine_images/rectangle.png" alt="" /></div>
                                        <div className='ml-4'><p className='font-bold text-[25px] sm:text-[28px] '>Suivi Scientifique de la Posidonie à Kerkennah</p></div>
                                    </div>

                                    <span className='text-[20px] font-bold'>Objectifs du Suivi</span>                                   
                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'>Evaluer l'état de santé des herbiers.</span>
                                                </div>
                                    </div>                                          
                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'>Mesurer leur contribution à la biodiversité locale.</span>
                                                </div>
                                    </div>                                       
                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'>Identifier les zones vulnérables et les pressions écologiques.</span>
                                                </div>
                                    </div>                                    
                                    <span className='text-[20px] font-bold'>Méthodologies Utilisées</span>
                                    <span className='text-[20px] font-bold'>1. Relevvés sous-marins : </span>
                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'>Mesurer la densité des herbiers.</span>
                                                </div>
                                    </div>   

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'>Evaluation de la longeur et de la largeur des feuilles.</span>
                                                </div>
                                    </div>   



                                    <span className='text-[20px] font-bold'>2. Images par drone : </span>

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Cartographie des zones herbeuses.</span>
                                                </div>
                                    </div>   

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                <span className='text-[18px] :tsmext-[20px] leading-[50px]'>Suivi des dégradations visibles.</span>
                                                </div>
                                    </div>   

                                    <span className='text-[20px] font-bold'>2. Etudes de biodiversité : </span>

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Recensement des espéces marines associées.</span>
                                                </div>
                                    </div>   

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Analyse des interaction écologique dans l'écosystéme.</span>
                                                </div>
                                    </div>   

                                    <span className='text-[20px] font-bold'> Indicateurs Suivis </span>

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Densité des rhizomes.</span>
                                                </div>
                                    </div>   

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Longueur moyenne des feilles.</span>
                                                </div>
                                    </div>  

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>Présence de macro-déchets ou de signes de pollution.</span>
                                                </div>
                                    </div>  

                                    <span className='text-[20px] font-bold'> Résultats et Découvertes </span>

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Zones en bonne santé : </b> Herbiers denses et biodiversité abondante .</span>
                                                </div>
                                    </div>   

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'><b>Zones menacées : </b> Prés des ports et dans les zones chalutage illégal .</span>
                                                </div>
                                    </div>   
                                    
                                    <span className='text-[20px] font-bold'> Implication Communautaire :  </span>

                                    <span className='text-[20px] '>Les pecheurs locaux participent aux suivi :  </span>

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>En signalant les zones à risque.</span>
                                                </div>
                                    </div>   

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                <div className=' flex justify-center mt-2'>
                                                    <span className='px-4 font-bold text-[20px]'>.</span>
                                                </div>
                                                <div className=' col-span-2 '>
                                                <span className='text-[18px] sm:text-[20px] leading-[50px]'>En intégrant les relevés dans leurs pratiques de peche.</span>
                                                </div>
                                    </div>   

                                    <img src='/images/marine_images/marine7.jpg' alt="" className="w-full  h-auto rounded-lg" />
                                    <div className='flex items-center relative '>
                                        <div className='absolute top-[10px] '><img src="/images/marine_images/rectangle.png" alt="" /></div>
                                        <div className='ml-4'><p className='font-bold text-[25px] sm:text-[28px] '>Recommendation à la protection de la posidonie</p></div>
                                    </div>
                                    <span className='text-[20px] font-bold'>Mesurers Réglementaires</span>

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                    <div className=' flex justify-center mt-2'>
                                                        <span className='px-4 font-bold text-[20px]'>.</span>
                                                    </div>
                                                    <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'>Interdire les pratiques de peche dustrictrices comme le chalutage dans les zones sensibles.</span>
                                                    </div>
                                    </div>  

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                    <div className=' flex justify-center mt-2'>
                                                        <span className='px-4 font-bold text-[20px]'>.</span>
                                                    </div>
                                                    <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'>Metter en place des zones marines protégées autour des herbiers .</span>
                                                    </div>
                                    </div>  

                                    <span className='text-[20px] font-bold'>Sensibilisation et Education</span>

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                    <div className=' flex justify-center mt-2'>
                                                        <span className='px-4 font-bold text-[20px]'>.</span>
                                                    </div>
                                                    <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'>Compagne éducative pour innformer la communauté sur l'importance écologique des herbiers.</span>
                                                    </div>
                                    </div>  

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                    <div className=' flex justify-center mt-2'>
                                                        <span className='px-4 font-bold text-[20px]'>.</span>
                                                    </div>
                                                    <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'>Formations des pécheurs et des jeunes locaux aux bones pratique de préservation.</span>
                                                    </div>
                                    </div>  
                                   

                                        <span className='text-[20px] font-bold'>Suivi à Long Terme</span>

                                        <div className='grid grid-cols-[30px_auto_auto] '>
                                                    <div className=' flex justify-center mt-2'>
                                                        <span className='px-4 font-bold text-[20px]'>.</span>
                                                    </div>
                                                    <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'>Intégrer des technologies comme ds capteurs environnementaux  pour un suivi continu .</span>
                                                    </div>
                                    </div>  

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                                    <div className=' flex justify-center mt-2'>
                                                        <span className='px-4 font-bold text-[20px]'>.</span>
                                                    </div>
                                                    <div className=' col-span-2 '>
                                                    <span className='text-[18px] sm:text-[20px] leading-[50px]'>Publier des rapports annuels sur l'état des herbiers.</span>
                                        </div>
                                    </div>  

                                    <div className='flex items-center relative '>
                                        <div className='absolute top-[10px] '><img src="/images/marine_images/rectangle.png" alt="" /></div>
                                        <div className='ml-4'><p className='font-bold text-[25px] sm:text-[28px] '>Importance Globale de la Posidonie</p></div>
                                    </div>

                                    <div className='grid grid-cols-[30px_auto_auto] '>
                                        <div className=' col-span-2 ml-8'>
                                            <span className='text-[18px] sm:text-[20px] leading-[50px]'>Les herbiers de la posidonie ne sont pas uniquement une ressource locale, mais un atout global dans la lutte contre ola crise climatique et la perte de biodiversité . Leur préservation est essentielle pour garantir l'équilibre écologique des écosystémes marins de Kerkennah et au-déla</span>
                                        </div>
                                </div>      

                                </section>
                             

                            </section>
                            <div className=' grid grid-cols-[10%_auto_10%] '>
                               
                                <div></div>
                                <div>
                                    <span className='text-[36px] font-bold'>
                                        <p className='text-center'><span className='text-[#0270A0]'>Immersion visuelle</span> dans L'Ecosystéme de la </p>
                                        <p className='text-center'>Posidonie</p>
                                    </span>
                                    <br />
                                    <span className=''>
                                        <p className='text-center text-[20px] font-semibold'>Découvrez la richesse visuelle de la posidonie à travers les images</p>
                                        <p className='text-center text-[20px] font-semibold'>captivantes et des vidéos éducatives</p>
                                    </span>
                                    <br />


                                    
                                </div>
                                <div></div>
                            </div>
                            <br />
                            <Media2/>

                            <span className='text-[36px] font-bold'>
                                <p className='text-center'><span className='text-[#0270A0]'>Recherche</span> et Connaissances sur la Posidonie </p>
                            </span>
                            <div className='font-semibold text-[20px]'>
                                <p className='text-center'>La recherche scienntifique sue la Posidonie, plante emblématique de la </p>
                                <p className='text-center'>Méditerannée, est essentielle pour comprendre son roleécologique et les menaces</p>
                                <p className='text-center'>auxquelles, elle fait face. Cette section regroupedes rapports et des articles </p>
                                <p className='text-center'>détaillant les résultats des suivis scientifiques, les méthodologies utilisées,et les </p> 
                                <p className='text-center'> recommendations pour préserver cet écosystémeclé dans l'archipelde </p>
                                <p className='text-center'>Kerkennah</p>

                            </div>  
                            <br />
                            
                            <TableF data={dataTable}   />
                            
                            <section className='border-t border-[#ADA5A5] my-[20px]'>
                                <br />
                            <span className='text-[36px] font-bold '>
                                <p className='text-center'><span className='text-[#0270A0]'>Découvrez</span> d'autres espèces fascinantes qui </p>
                                <p className='text-center'>peuplent nos écosystèmes marins</p>
                                <p className='text-center text-[16px]'>Découvrez les trésors marins que nous préservons</p>

                            </span>
                            <br />
                            </section>
                    </div>
                </section>
        </div>
    )
}
