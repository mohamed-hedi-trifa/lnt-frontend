import React from 'react'

import CardIntroduction from '../../../components/visitor/our-festival/CardIntroduction';
import CarouselCard from '@/components/visitor/our-festival/CarouselCard';
import ListCardFestivales from '@/components/visitor/our-festival/ListCardsFestival';
import HeroSection from '@/components/visitor/HeroSection';
import PageTitle from '@/components/atoms/titles/PageTitle';
import Title from '@/components/atoms/titles/Title';
import Partners from '@/components/visitor/who-are-we/partners/Partners';
import PinnedImageSwap from '@/components/visitor/our-festival/upcoming/SwappingImagesOnScroll';


const cardData = [
    { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Uen soiree musicalen envoutate avec le célébre groupe Seven Skies Band,Offrant une expérience unique melatn rythmes moderens et mélodies envoutates.", 
        titre: "Spectacle musicale avec Seven Skies Badn " ,
        imageUrl : '/team/Image.png',
        lien : '/events/event-details/'
      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Uen soiree musicalen envoutate avec le célébre groupe Seven Skies Band,Offrant une expérience unique melatn rythmes moderens et mélodies envoutates.", 
        titre: "Spectacle musicale avec Seven Skies Badn " ,
        imageUrl : '/team/Image.png',
        lien : '/events/event-details/'


      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Uen soiree musicalen envoutate avec le célébre groupe Seven Skies Band,Offrant une expérience unique melatn rythmes moderens et mélodies envoutates.", 
        titre: "Spectacle musicale avec Seven Skies Badn ",
        imageUrl : '/team/Image.png',
        lien : '/events/event-details/'

 
      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Uen soiree musicalen envoutate avec le célébre groupe Seven Skies Band,Offrant une expérience unique melatn rythmes moderens et mélodies envoutates.", 
        titre: "Spectacle musicale avec Seven Skies Badn ",
        imageUrl : '/team/Image.png',
        lien : '/events/event-details/'

 
      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Uen soiree musicalen envoutate avec le célébre groupe Seven Skies Band,Offrant une expérience unique melatn rythmes moderens et mélodies envoutates.", 
        titre: "Spectacle musicale avec Seven Skies Badn ",
        imageUrl : '/team/Image.png',
        lien : '/events/event-details/'

 
      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Uen soiree musicalen envoutate avec le célébre groupe Seven Skies Band,Offrant une expérience unique melatn rythmes moderens et mélodies envoutates.", 
        titre: "Spectacle musicale avec Seven Skies Badn ",
        imageUrl : '/team/Image.png',
        lien : '/events/event-details/'

 
      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Uen soiree musicalen envoutate avec le célébre groupe Seven Skies Band,Offrant une expérience unique melatn rythmes moderens et mélodies envoutates.", 
        titre: "Spectacle musicale avec Seven Skies Badn ",
        imageUrl : '/team/Image.png',
        lien : '/events/event-details/'

 
      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Uen soiree musicalen envoutate avec le célébre groupe Seven Skies Band,Offrant une expérience unique melatn rythmes moderens et mélodies envoutates.", 
        titre: "Spectacle musicale avec Seven Skies Badn ",
        imageUrl : '/team/Image.png',
        lien : '/events/event-details/'

 
      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Uen soiree musicalen envoutate avec le célébre groupe Seven Skies Band,Offrant une expérience unique melatn rythmes moderens et mélodies envoutates.", 
        titre: "Spectacle musicale avec Seven Skies Badn ",
        imageUrl : '/team/Image.png',
        lien : '/events/event-details/'

 
      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Uen soiree musicalen envoutate avec le célébre groupe Seven Skies Band,Offrant une expérience unique melatn rythmes moderens et mélodies envoutates.", 
        titre: "Spectacle musicale avec Seven Skies Badn " ,
        imageUrl : '/team/Image.png',
        lien : '/events/event-details/'


      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Uen soiree musicalen envoutate avec le célébre groupe Seven Skies Band,Offrant une expérience unique melatn rythmes moderens et mélodies envoutates.", 
        titre: "Spectacle musicale avec Seven Skies Badn ",
        imageUrl : '/team/Image.png',
        lien : '/events/event-details/'

 
      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "Uen soiree musicalen envoutate avec le célébre groupe Seven Skies Band,Offrant une expérience unique melatn rythmes moderens et mélodies envoutates.", 
        titre: "Spectacle musicale avec Seven Skies Badn ",
        imageUrl : '/team/Image.png',
        lien : '/events/event-details/'

 
      },
  ];

  const cardCarousel = [
    { 
        date: "Du 01 au 06 août 2024", 
        lieu : 'teKraten, Kerkennahst',
        description :"Cette édition spéciale a rendu hommage au regretté Farid Khcharem à travers un tournoi qui a célébré la richesse culturelle et les traditions authentiques de Kerkennah. Entre compétitions sportives, rencontres conviviales et moments de partage, cet événement a marqué les esprits en honorant la mémoire d'un grand contributeur au patrimoine local",
        titre: "Festival de la Culture des Îles Méditerranéennes de Kerkennah( Tournoi du Regretté Farid Khcharem )" ,
        properties : 'flex flex-col sm:flex-row',
        buttonsTitles : 'Explorer',
        buttonPosition : 'items-end justify-end'
        
      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "ggggggggggggggggggggggggggg", 
        titre: "Spectacle musicale avec Seven Skies Badn " ,
        properties : 'flex flex-col sm:flex-row',
        buttonsTitles : 'Explorer',
        buttonPosition : 'items-end justify-end',


        
      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", 
        titre: "Spectacle musicale avec Seven Skies Badn " ,
        properties : 'flex flex-col sm:flex-row',
        buttonsTitles : 'Explorer',
        buttonPosition : 'items-end justify-end',


        
      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 
        titre: "Spectacle musicale avec Seven Skies Badn " ,
        properties : 'flex flex-col sm:flex-row',
        buttonsTitles : 'Explorer',
        buttonPosition : 'items-end justify-end'

        
      },
      { 
        lieu : 'teKraten, Kerkennahst',
        date: "Du 01 au 06 août 2024", 
        description: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", 
        titre: "Spectacle musicale avec Seven Skies Badn " ,
        properties : 'flex flex-col sm:flex-row',
        buttonsTitles : 'Explorer',
        buttonPosition : 'items-end justify-end'

        
      },
   
   
   
   
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
  '/festivales_images/img10.jpg',
  '/festivales_images/img.jpg',



]

    const images = [
      '/festivales_images/img1.jpg',
      '/festivales_images/img2.jpg',
      '/festivales_images/img3.jpg',
      '/festivales_images/img4.jpg',
      '/festivales_images/img5.jpg',
      '/festivales_images/img6.jpg',
      '/festivales_images/img7.jpg',
      '/festivales_images/img8.jpg',
      '/festivales_images/img9.jpg',
      '/festivales_images/img10.jpg',
      '/festivales_images/img.jpg',

        // "/carousel_images/c1.png",
        // "/carousel_images/c2.png",
        // "/carousel_images/c4.png",
        // "/carousel_images/c5.png",
        // "/carousel_images/c6.png",
        // "/carousel_images/c7.png",
        // "/carousel_images/c8.png",
        // "/carousel_images/c9.png",
        // "/carousel_images/c10.png",
        // "/carousel_images/c11.png",
        

    ]

    const videos = [
        "/images/images_histoire/img1.png",
        "/images/images_histoire/img2.png",
        "/images/images_histoire/img3.png",
        "/images/images_histoire/img4.png", 

    ]

export default function FestivalVenir() {

    return (
        <div className=''>

            <HeroSection imgSrc={gallery[9]} title='Festival à Venir' subTitle="Une Nouvelle Aveture Culturelle vous Attend !" />


            <div className='flex items-ceter justify-center'>
            
            </div>
                <div className='w-full  flex items-center  justify-center  p-4'>
                        <section className='max-w-7xl'>
                          <div style={{display:""}}></div>
                          <PageTitle title={<div className=''><span className='block leading-[55px]'>Festival de La Culture des iles Méditerranéees</span> <span className='block leading-[55px]'>(Edition 2025)</span></div>} />
                                <p className='text-[24px] sm:text-[32px] text-[#0270A0] text-center font-semibold my-4'>Tournoi du regretté Farid Khcharem</p>
                              

                              {/* <CardIntroduction 
                                    lieu={'teKraten, Kerkennahst'}
                                    date={"Du 01 au 06 août 2024"}
                                    description={"Le Festival de la Culture Des iles Méditérraéees Revient Bietot Avec Ue ouvelle Edition Pleiene de découverte, De célébratios Et D'émotions.Chaque Année Cet Evenement emblématique Réunnit Les amoureux de la culture  de la nature et des traditions offrant un espace unique pour partager apprendre et célébrer.Alors que nous finalisons les détails du prochains festival,rester connnectés pour etre les premiers A Découvrir les programmes et les surprises qui vous attendent.Préparer vous à vivre une expérience Inoubliable au coeur de l'Archipel de Kerkennah, Ou chaque Instant Célébre l'authenticité et la beauté des iles."}
                                    titre={"Rejoigez-Nous Pour une Editio Inoubliable, Célébrat La Culture, La Nature Et Les Traditios de Kerkennah"}
                              />   */}

                              <PinnedImageSwap />

                              <div className='flex justify-center flex-col items-center'>
                              <Title size='text-[36px]'><span className='text-primary'>Programme</span> du Festival</Title>
                              <div className='font-semibold'>Explorez les moments forts et les activités qui rythmeront cette édition unique du festival</div>
                              </div>

                              <ListCardFestivales
                                    cards={cardData}
                                    hiddenPagiation='block'
                                    itemsPerPage={9}
                                    gridSystem={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex items-center justify-center gap-6'}
                                    buttonsTitles={'En savoir plus'}
                                    properties={''}
                                    buttonPosition={''}                                
                                  />

                                  <hr className='border-2 my-20 border-[#ADA5A5]' />  

                                <div className=' flex items-center justify-center'>
                                    <span className='text-[28px] sm:text-[36px] font-bold text-center'>
                                        <span className='text-[#0270A0]'>Soutiens</span> <span>Officiels de cette Edition</span>
                                    </span>
                                </div>

                                <div className='text-center text-[18px] sm:text-[20px] font-semibold leading-[30px] my-6'>
                                      <p>Découvrez les organisations et entreprises qui, par leur soutien et leur collaboration</p>
                                      <p>rendent possible la célébration de notre patrimoine culturel, naturel et maritime</p>
                                      <p>Leur engagement est au soeur de la réussite de cette édition exceptionelle</p>
                                </div>
                                                   
                              <div className='mt-12'>
                                  <Partners />
                              </div>

                              <div className=' text-center my-10'>
                                    <span className='text-[28px] sm:text-[36px] font-bold'>
                                        <span className='text-[#0270A0]'>Immersion Visuelle</span> <span>dans Nos Editions Passées</span>
                                    </span>
                                </div>

                                <div className='text-center text-[18px] sm:text-[20px] font-semibold leading-[30px] my-10'>
                                      <p>Reviver les momets les plus marquats des festivals précédets à traves une </p>
                                      <p>sélection captivante de photos et vidéos </p>
                                </div>

                              {/* <Media2 images={images} videos={videos}/> */}

                              <div className='text-center my-10'>
                                    <span className='text-[28px] sm:text-[36px] font-bold'>
                                        <span className='text-[#0270A0]'>Découvrez </span> <span>Nos Editions Precédetes </span>
                                    </span>
                                </div>

                                <div className='text-center text-[18px] sm:text-[20px] font-semibold leading-[30px] my-5'>
                                      <p>Plongez dans l'histoire et les moments marquants des festivales passés qui ont marqué Kerkenah </p>
                                </div>
                                <CarouselCard cards={cardCarousel}/>

                        </section>
                  
              </div>

              <div className='flex items-center justify-center py-4'>
                    <button className=" px-8 py-3 my-4 bg-gradient-to-r from-[#51ADC6] to-[#006E9F] text-white font-bold rounded-full hover:shadow-lg ">
                            Voir Toutes les Éditions Précédentes
                    </button>
              </div>
              
        </div>
    )
}



