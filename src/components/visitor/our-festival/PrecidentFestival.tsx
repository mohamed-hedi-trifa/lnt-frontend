import React from 'react'

import SearchBar from '../../SearchBar';
import ButtonDropdown from '../../ButtonDropdown';
import DateRangeSelector from '../who-are-we/our-achievements/DateRangeSelector';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import ListCardFestivales from './ListCardsFestival';
import ImageFestival from '../../components/visitor/our-festival/ImageFestival';


const cardData = [
    { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Cette édition spéciale a rendu hommage au regretté Farid Khcharem à travers un tournoi qui a célébré la richesse culturelle et les traditions authentiques de Kerkennah. Entre compétitions sportives, rencontres conviviales et moments de partage, cet événement a marqué les esprits en honorant la mémoire d'un grand contributeur au patrimoine local.", 
        titre: "Festival de la Culture des Îles Méditerranéennes de Kerkennah (Tournoi du Regretté Farid Khcharem)" ,
        buttonPosition : 'flex items-end justify-end',
        imageUrl : '/festivales_images/img.jpg',
        lien : '/events/event-details/'

      },
    { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Cette édition spéciale a rendu hommage au regretté Farid Khcharem à travers un tournoi qui a célébré la richesse culturelle et les traditions authentiques de Kerkennah. Entre compétitions sportives, rencontres conviviales et moments de partage, cet événement a marqué les esprits en honorant la mémoire d'un grand contributeur au patrimoine local.", 
        titre: "Festival de la Culture des Îles Méditerranéennes de Kerkennah (Tournoi du Regretté Farid Khcharem)" ,
        imageUrl : '/festivales_images/img.jpg',
        lien : '/events/event-details/'


      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Cette édition spéciale a rendu hommage au regretté Farid Khcharem à travers un tournoi qui a célébré la richesse culturelle et les traditions authentiques de Kerkennah. Entre compétitions sportives, rencontres conviviales et moments de partage, cet événement a marqué les esprits en honorant la mémoire d'un grand contributeur au patrimoine local.", 
        titre: "Festival de la Culture des Îles Méditerranéennes de Kerkennah (Tournoi du Regretté Farid Khcharem)" ,
        buttonPosition : 'items-end justify-end',
        imageUrl : '/festivales_images/img.jpg',
        lien : '/events/event-details/'


      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Cette édition spéciale a rendu hommage au regretté Farid Khcharem à travers un tournoi qui a célébré la richesse culturelle et les traditions authentiques de Kerkennah. Entre compétitions sportives, rencontres conviviales et moments de partage, cet événement a marqué les esprits en honorant la mémoire d'un grand contributeur au patrimoine local.", 
        titre: "Festival de la Culture des Îles Méditerranéennes de Kerkennah (Tournoi du Regretté Farid Khcharem)" ,
        buttonPosition : 'items-end justify-end',
        imageUrl : '/festivales_images/img.jpg',       
         lien : '/events/event-details/'


      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Cette édition spéciale a rendu hommage au regretté Farid Khcharem à travers un tournoi qui a célébré la richesse culturelle et les traditions authentiques de Kerkennah. Entre compétitions sportives, rencontres conviviales et moments de partage, cet événement a marqué les esprits en honorant la mémoire d'un grand contributeur au patrimoine local.", 
        titre: "Festival de la Culture des Îles Méditerranéennes de Kerkennah (Tournoi du Regretté Farid Khcharem)" ,
        buttonPosition : 'items-end justify-end',
        imageUrl : '/festivales_images/img.jpg',
        lien : '/events/event-details/'


      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Cette édition spéciale a rendu hommage au regretté Farid Khcharem à travers un tournoi qui a célébré la richesse culturelle et les traditions authentiques de Kerkennah. Entre compétitions sportives, rencontres conviviales et moments de partage, cet événement a marqué les esprits en honorant la mémoire d'un grand contributeur au patrimoine local.", 
        titre: "Festival de la Culture des Îles Méditerranéennes de Kerkennah (Tournoi du Regretté Farid Khcharem)" ,
        buttonPosition : 'items-end justify-end',
        imageUrl : '/festivales_images/img.jpg',
        lien : '/events/event-details/'


      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Cette édition spéciale a rendu hommage au regretté Farid Khcharem à travers un tournoi qui a célébré la richesse culturelle et les traditions authentiques de Kerkennah. Entre compétitions sportives, rencontres conviviales et moments de partage, cet événement a marqué les esprits en honorant la mémoire d'un grand contributeur au patrimoine local.", 
        titre: "Festival de la Culture des Îles Méditerranéennes de Kerkennah (Tournoi du Regretté Farid Khcharem)" ,
        buttonPosition : 'items-end justify-end',
        imageUrl : '/festivales_images/img.jpg',
        lien : '/events/event-details/'


      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Cette édition spéciale a rendu hommage au regretté Farid Khcharem à travers un tournoi qui a célébré la richesse culturelle et les traditions authentiques de Kerkennah. Entre compétitions sportives, rencontres conviviales et moments de partage, cet événement a marqué les esprits en honorant la mémoire d'un grand contributeur au patrimoine local.", 
        titre: "Festival de la Culture des Îles Méditerranéennes de Kerkennah (Tournoi du Regretté Farid Khcharem)" ,
        buttonPosition : 'items-end justify-end',
        imageUrl : '/festivales_images/img.jpg',
        lien : '/events/event-details/'


      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Cette édition spéciale a rendu hommage au regretté Farid Khcharem à travers un tournoi qui a célébré la richesse culturelle et les traditions authentiques de Kerkennah. Entre compétitions sportives, rencontres conviviales et moments de partage, cet événement a marqué les esprits en honorant la mémoire d'un grand contributeur au patrimoine local.", 
        titre: "Festival de la Culture des Îles Méditerranéennes de Kerkennah (Tournoi du Regretté Farid Khcharem)",
        buttonPosition : 'items-end justify-end', 
        imageUrl : '/festivales_images/img.jpg',
        lien : '/events/event-details/'


      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Cette édition spéciale a rendu hommage au regretté Farid Khcharem à travers un tournoi qui a célébré la richesse culturelle et les traditions authentiques de Kerkennah. Entre compétitions sportives, rencontres conviviales et moments de partage, cet événement a marqué les esprits en honorant la mémoire d'un grand contributeur au patrimoine local.", 
        titre: "Festival de la Culture des Îles Méditerranéennes de Kerkennah (Tournoi du Regretté Farid Khcharem)",
        buttonPosition : 'items-end justify-end', 
        imageUrl : '/festivales_images/img.jpg',
        lien : '/events/event-details/'


      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Cette édition spéciale a rendu hommage au regretté Farid Khcharem à travers un tournoi qui a célébré la richesse culturelle et les traditions authentiques de Kerkennah. Entre compétitions sportives, rencontres conviviales et moments de partage, cet événement a marqué les esprits en honorant la mémoire d'un grand contributeur au patrimoine local.", 
        titre: "Festival de la Culture des Îles Méditerranéennes de Kerkennah (Tournoi du Regretté Farid Khcharem)" ,
        buttonPosition : 'items-end justify-end',
        imageUrl : '/festivales_images/img.jpg',
        lien : '/events/event-details/'


      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Cette édition spéciale a rendu hommage au regretté Farid Khcharem à travers un tournoi qui a célébré la richesse culturelle et les traditions authentiques de Kerkennah. Entre compétitions sportives, rencontres conviviales et moments de partage, cet événement a marqué les esprits en honorant la mémoire d'un grand contributeur au patrimoine local.", 
        titre: "Festival de la Culture des Îles Méditerranéennes de Kerkennah (Tournoi du Regretté Farid Khcharem)",
        buttonPosition : 'items-end justify-end', 
        imageUrl : '/festivales_images/img.jpg',
        lien : '/events/event-details/'


      }
  ];
const gallery = [
  '/festivales_images/img1.jpg',
  '/festivales_images/img2.jpg',
  '/festivales_images/img3.jpg',
  '/festivales_images/img4.jpg',
  '/festivales_images/img5.jpg',
  '/festivales_images/img6.jpg',
  '/festivales_images/img7.jpg',
  '/festivales_images/img8.jpg',
  '/festivales_images/img9.jpg',
  '/festivales_images/img.jpg',


]

export default function PrecidentFestival() {

    return (
        <div className=''>

            <img className='w-full object-cover h-[80vh]' src="/images/festival/gallery/img6.jpg" />

             <div className='flex items-ceter justify-center'>
                <div className='text-white absolute top-[200px] text-center font-bold'>
                    <span className='text-[36px] sm:text-[64px]'>Editions précidetes Revivez nos festivals passés</span>
                    <p className='text-[24px] sm:text-[36px]'>Revivez nos festivals passés</p>
                </div>
            
             </div>

             <section className=''>
                <div className="flex flex-col sm:flex-row flex-wrap h-auto overflow-hidden bg-white px-10 rounded-lg mt-8">
                    <div className="w-full sm:w-1/2 pr-6 ">
                        <div className=" p-6">                                                              
                            <p className="text-[35px] md:text-[60px] font-bold  text-center sm:text-start break-words"><span className='text-[#0270A0]'>Festival</span> de La Culture des Îles Méditerranéennes</p>                       
                            <div className="flex gap-6 justify-center sm:justify-start">
                                <div className="w-[148px] h-[127px] bg-[#0270A0] rounded-lg shadow-md flex items-center justify-center flex-col">
                                    <span className="text-white text-[32px] font-bold">8+</span>
                                    <span className="text-white text-[16px] font-bold">Éditions</span>
                                    <span className="text-white text-[16px] font-bold">Organisées</span>
                                </div>
                                <div className="w-[148px] h-[127px] bg-[#0270A0] rounded-lg shadow-md flex items-center justify-center flex-col">
                                    <span className="text-white text-[32px] font-bold">40+</span>
                                    <span className="text-white text-[16px] font-bold">Événements</span>
                                    <span className="text-white text-[16px] font-bold">Réalisés</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 w-full sm:w-1/2 ">
                        <img src={gallery[0]} alt="Image 1" className="w-full h-full rounded-tl-[10px] object-cover"/>
                        <img src={gallery[1]} alt="Image 2" className="w-full h-full object-cover"/>
                        <img src={gallery[2]} alt="Image 3" className="w-full h-full  object-cover"/>
                        <img src={gallery[3]} alt="Image 4" className="w-full h-full  rounded-tr-[10px]  object-cover"/>
                        <img src={gallery[4]} alt="Image 5" className="w-full h-full  rounded-bl-[10px]  object-cover"/>
                        <img src={gallery[5]} alt="Image 6" className="w-full h-full  object-cover"/>
                        <img src={gallery[6]} alt="Image 7" className="w-full h-full  object-cover"/>
                        <img src={gallery[7]} alt="Image 8" className="w-full h-full  rounded-br-[10px]  object-cover"/>
                    </div>
                </div>
             </section>
             <section className='mt-4 px-10'>
                <hr className='border-2 border-[#ADADA5]'/>
                    <div className="grid w-full gap-2 md:grid-cols-[25%_auto_25%]  my-8">

                        <div className="hidden sm:block px-4 py-2  ">
                            <ButtonDropdown
                                item={<DateRangeSelector />}
                                position="left"
                                renderItem={(item) => (
                                    <div className='py-1'>{item.name}</div>
                                )}
                                >
                                {(isOpen) => (
                                    <button className={`flex items-center gap-2  underline-offset-4 border-black border-2 rounded-full px-6 py-2`}>
                                    Published at
                                    <ChevronDownIcon className={`w-6 h-6 duration-200 ${isOpen ? "-rotate-180" : ""}`} />
                                    </button>
                                )}
                            </ButtonDropdown> 
                        </div>

                        <div className="hidden sm:block px-4 py-2 text-center  ">
                            <SearchBar/>
                        </div>

                        <div className="hidden sm:block px-4 py-2 text-center  ">
                            <ButtonDropdown
                                item={<DateRangeSelector />}
                                position="left"
                                renderItem={(item) => (
                                    <div className='py-1'>{item.name}</div>
                                )}
                                >
                                {(isOpen) => (
                                    <button className={`flex items-center gap-2  underline-offset-4 border-black border-2 rounded-full px-6 py-2`}>
                                    Published at
                                    <ChevronDownIcon className={`w-6 h-6 duration-200 ${isOpen ? "-rotate-180" : ""}`} />
                                    </button>
                                )}
                            </ButtonDropdown> 
                        </div>
                        {/* ****************************************************** */}
                        <div className="block sm:hidden col-span-3 px-4 py-2 text-center">
                            <SearchBar/>
                        </div>
                        <div className="block sm:hidden grid grid-cols-2 gap-4 col-span-3">
                            <div className="px-4 py-2 text-center ">
                            <ButtonDropdown
                            item={<DateRangeSelector />}
                            position="left"
                            renderItem={(item) => (
                                <div className='py-1'>{item.name}</div>
                            )}
                            >
                            {(isOpen) => (
                                <button className={`flex items-center gap-2  underline-offset-4 border-black border-2 rounded-full px-6 py-2`}>
                                Published at
                                <ChevronDownIcon className={`w-6 h-6 duration-200 ${isOpen ? "-rotate-180" : ""}`} />
                                </button>
                            )}
                        </ButtonDropdown> 
                            </div>
                            <div className="px-4 py-2 text-center ">
                            <ButtonDropdown
                            item={<DateRangeSelector />}
                            position="left"
                            renderItem={(item) => (
                                <div className='py-1'>{item.name}</div>
                            )}
                            >
                            {(isOpen) => (
                                <button className={`flex items-center gap-2  underline-offset-4 border-black border-2 rounded-full px-6 py-2`}>
                                Published at
                                <ChevronDownIcon className={`w-6 h-6 duration-200 ${isOpen ? "-rotate-180" : ""}`} />
                                </button>
                            )}
                            </ButtonDropdown> 
                            </div>
                        </div>
                    </div>
                <hr className='border-2 border-[#ADADA5]'/>
             </section>
             <section className=' flex items-center justify-center'>
           
            <div className='px-10 '>
            <ListCardFestivales 
                        cards={cardData}
                        itemsPerPage={5}
                        properties={'flex flex-col sm:flex-row'}
                        gridSystem={'flex flex-col '}
                        buttonsTitles={'Explorer'}
                        buttonPosition={'items-end justify-end'} 
                        hiddenPagiation={'block'}            />

            </div>

            </section>
            <div className='flex items-center justify-center'>
                <hr className='my-10 border-1 sm:border-2 border-[#ADADA5] w-[95%] '/>
            </div>

            <section className=''>


                <div className='max-w-6xl mx-auto'>
                    <section className='flex items-center justify-center'>
                        <div className='w-full flex items-center justify-center my-10'>
                            <ImageFestival title={'Découvrez le Prochain Festival'} description={'Restez informé des dates et du programme à venir'} imageUrl={gallery[0]}  />
                        </div>
                    </section>
                </div>
            
            </section>


        </div>
    )
}
