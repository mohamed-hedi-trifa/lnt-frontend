import HeroSection from '@/components/visitor/HeroSection'
import React from 'react'
import festivalHero from '@/assets/images/festival-hero.jpeg'
import PageParagraph from '@/components/atoms/PageParagraph'
import works from "@/assets/images/works.png";
import Title from '@/components/atoms/titles/Title';
import ContainerImageFestival from './ContainerImageFestival';
import path from 'path';

const images = [
    {
      title: 'Revivez les Éditions Passées',
      description: 'Découvrez les moments marquants des festivals précédents',
      imageUrl: '/images/Festival/PreviousEdition.jpg',
      path: '/our-festival/previous'
    },

    {
        title: 'Découvrez le Prochain Festival',
        description: 'Restez informé des dates et du programme à venir',
        imageUrl: '/images/Festival/UpcomingFestival.jpg',
        path: '/our-festival/upcoming'
    }
    
]

export default function OurFestivalPage() {
    return (
        <main className='flex flex-col pb-[80px]'>

            <HeroSection title='Festival de La Culture des Îles Méditerranéennes' subTitle='' imgSrc={festivalHero} />
            <div className='relative flex my-[80px]'>
                <div className='bg-[#0270A0] absolute top-0 left-0 h-full w-[40vw] z-0 hidden lg:block'></div>
                <div className='flex flex-col lg:flex-row max-w-7xl mx-auto w-full gap-[65px] relatiev z-10'>
                    <div className='lg:w-[55%] flex items-center justify-center lg:justify-end '>
                        <div className='bg-white p-[21px] w-[320px] h-[402px] lg:w-full lg:h-full max-h-[832px] max-w-[661px] shadow-helmi'>
                            <img src={works} />
                        </div>
                    </div>
                    <div className='lg:w-[45%] flex flex-col gap-5 px-3 lg:px-0'>
                        <Title size='text-[30px] lg:text-[40px]' customClassName='!block text-center lg:text-start'><span className='text-primary'>Un Festival</span> au Cœur de la Culture et de la Nature Méditerranéennes</Title>
                        <PageParagraph>
                            Le Festival de la Culture des Îles Méditerranéennes est un événement annuel emblématique qui célèbre la richesse et la diversité du patrimoine culturel et naturel de l’archipel de Kerkennah. Depuis sa création, il rassemble chaque été des passionnés, des artistes, des habitants et des visiteurs venus des quatre coins du pays et d’ailleurs, autour d’activités culturelles, artistiques et écologiques uniques.
                        </PageParagraph>
                        <PageParagraph>
                            À travers ses différentes éditions, ce festival est devenu un véritable rendez-vous incontournable pour la préservation et la promotion des traditions locales : les arts, la musique, la pêche traditionnelle, et l’artisanat y occupent une place centrale. Les visiteurs y découvrent des moments forts comme les régates de barques à voile, les expositions d’art, les soirées culturelles animées par des troupes traditionnelles, ou encore des sorties immersives pour explorer les îlots préservés et les merveilles naturelles de l’archipel.
                        </PageParagraph>
                        <PageParagraph>
                            Mais le Festival ne s’arrête pas là. Il incarne également une démarche écologique et durable, en sensibilisant les visiteurs et les habitants à la préservation de l’environnement marin et côtier, grâce à des collaborations avec des acteurs locaux et des projets comme ceux de l’Aire Marine Protégée des îlots nord de Kerkennah. Ainsi, les activités culturelles s’entrelacent avec des initiatives de protection de la biodiversité, faisant du festival un modèle de tourisme responsable et respectueux.
                        </PageParagraph>
                        <PageParagraph>
                            Plongez avec nous dans cette aventure unique où tradition, nature et avenir s’unissent pour écrire une histoire commune.
                        </PageParagraph>
                    </div>
                </div>
            </div>
            <div className='max-w-7xl mx-auto border-t border-black '>
               <ContainerImageFestival images={images} />
            </div>
        </main>
    )
}


// import React from 'react'

// import ContainerImageFestival from './ContainerImageFestival';
// import GallerySection from  './GallerySection';
// import path from 'path';

// const images = [
//     {
//         title :'Revivez les Éditions ',
//         description : 'Découvrez les moments marquants des festivals ',
//         imageUrl : '/images/festival/fest1.jpg',
//         path : '/festival/edition-passees'
//     },
//     {   
//         title :"Découvrez le Prochain Festival",
//         description : 'Restez informé des dates et du programme à venir',
//         imageUrl : '/images/festival/fest2.jpg',
//         path : '/festival/prochain-festival'
//     }
// ]

// const gallery = [
//   '/images/festival/gallery/Mask.png',
//   '/images/festival/gallery/Mask-1.png',
//   '/images/festival/gallery/Mask-2.png',
//   '/images/festival/gallery/Mask-3.png',
//   '/images/festival/gallery/Mask-4.png',
//   '/images/festival/gallery/Mask-5.png',
//   '/images/festival/gallery/Mask-6.png',
//   '/images/festival/gallery/Mask-7.png',
//   '/images/festival/gallery/Mask-8.png',
//   '/images/festival/gallery/Mask-9.png',
//   '/images/festival/gallery/Mask-10.png',
// ]


// export default function Festival() {

//     return (
//         <div className=''>

//             <img className='w-full object-cover h-[80vh]' src="/images/festival/cadre.jpg" />

//              <div className='flex  items-ceter justify-center'>
//                 <div className='text-white absolute top-[200px] text-center text-[40px] sm:text-[64px]  font-bold'>
//                     <span>Festival de La Culture des </span>
//                     <span>Îles Méditerranéennes</span>
//                 </div>
            
//              </div>

//              <section className=' flex flex-col md:flex-row  md:justify-center grid-cols-[30%_auto_50%]'>
//                       <GallerySection/>
//                       <div> </div>
//                       <div className='  w-[100%] p-20'>
//                               <div className='title text-[32px] sm:text-[40px] font-bold '>
//                                 <span><span className='text-[#0270A0]'>Un Festival</span> au Cœur de la Culture et de la Nature Méditerranéennes</span>
//                               </div>
//                               <div className='description text-[18px] sm:text-[20px] text-justify '>
//                                 <p className='my-2'>
//                                   Le Festival de la Culture des Îles Méditerranéennes est un événement annuel emblématique qui célèbre la richesse et la diversité du patrimoine culturel et naturel de l’archipel de Kerkennah. Depuis sa création, il rassemble chaque été des passionnés, des artistes, des habitants et des visiteurs venus des quatre coins du pays et d’ailleurs, autour d’activités culturelles, artistiques et écologiques uniques.
//                                 </p>
//                                 <p className='my-2'>
//                                   À travers ses différentes éditions, ce festival est devenu un véritable rendez-vous incontournable pour la préservation et la promotion des traditions locales : les arts, la musique, la pêche traditionnelle, et l’artisanat y occupent une place centrale. Les visiteurs y découvrent des moments forts comme les régates de barques à voile, les expositions d’art, les soirées culturelles animées par des troupes traditionnelles, ou encore des sorties immersives pour explorer les îlots préservés et les merveilles naturelles de l’archipel.
//                                 </p>
//                                 <p className='my-2'>
//                                   Mais le Festival ne s’arrête pas là. Il incarne également une démarche écologique et durable, en sensibilisant les visiteurs et les habitants à la préservation de l’environnement marin et côtier, grâce à des collaborations avec des acteurs locaux et des projets comme ceux de l’Aire Marine Protégée des îlots nord de Kerkennah. Ainsi, les activités culturelles s’entrelacent avec des initiatives de protection de la biodiversité, faisant du festival un modèle de tourisme responsable et respectueux.
//                                 </p>
//                                 <p className='my-2'>
//                                   Plongez avec nous dans cette aventure unique où tradition, nature et avenir s’unissent pour écrire une histoire commune.
//                                 </p>
//                               </div>
//                       </div>
//              </section>

//              <section className='px-4 '>


//                 <div className='max-w-6xl mx-auto'>
//                     <section className='flex items-start justify-center'>
//                         <div className='w-full flex items-center justify-center my-10'>
//                             <ContainerImageFestival images={images} />
//                         </div>
//                     </section>
//                 </div>
            
//             </section>


//         </div>
//     )
// }

// import React from 'react'

// import ContainerImageMarine from '../aire-marine/CotainerImageMarine';
// import GallerySection from '../../../pages/our-festival/GallerySection';

// const images = [
//     {
//         title :'Revivez les Éditions Passées',
//         description : 'Découvrez les moments marquants des festivals ',
//         imageUrl : '/images/festival/fest1.jpg',
//     },
//     {   
//         title :"Découvrez le Prochain Festival",
//         description : 'Restez informé des dates et du programme à venir',
//         imageUrl : '/images/festival/fest2.jpg',
//     }
// ]

// const gallery = [
//   '/images/festival/gallery/Mask.png',
//   '/images/festival/gallery/Mask-1.png',
//   '/images/festival/gallery/Mask-2.png',
//   '/images/festival/gallery/Mask-3.png',
//   '/images/festival/gallery/Mask-4.png',
//   '/images/festival/gallery/Mask-5.png',
//   '/images/festival/gallery/Mask-6.png',
//   '/images/festival/gallery/Mask-7.png',
//   '/images/festival/gallery/Mask-8.png',
//   '/images/festival/gallery/Mask-9.png',
//   '/images/festival/gallery/Mask-10.png',
// ]


// export default function Festival() {

//     return (
//         <div className=''>

//             <img className='w-full object-cover h-[80vh]' src="/images/festival/cadre.jpg" />

//              <div className='flex  items-ceter justify-center'>
//                 <div className='text-white absolute top-[200px] text-center text-[40px] sm:text-[64px]  font-bold'>
//                     <span>Festival de La Culture des </span>
//                     <span>Îles Méditerranéennes</span>
//                 </div>
            
//              </div>

//              <section className=' flex flex-col md:flex-row  md:justify-center grid-cols-[30%_auto_50%]'>
//                       <GallerySection/>
//                       <div> </div>
//                       <div className='  w-[100%] p-20'>
//                               <div className='title text-[32px] sm:text-[40px] font-bold '>
//                                 <span><span className='text-[#0270A0]'>Un Festival</span> au Cœur de la Culture et de la Nature Méditerranéennes</span>
//                               </div>
//                               <div className='description text-[18px] sm:text-[20px] text-justify '>
//                                 <p className='my-2'>
//                                   Le Festival de la Culture des Îles Méditerranéennes est un événement annuel emblématique qui célèbre la richesse et la diversité du patrimoine culturel et naturel de l’archipel de Kerkennah. Depuis sa création, il rassemble chaque été des passionnés, des artistes, des habitants et des visiteurs venus des quatre coins du pays et d’ailleurs, autour d’activités culturelles, artistiques et écologiques uniques.
//                                 </p>
//                                 <p className='my-2'>
//                                   À travers ses différentes éditions, ce festival est devenu un véritable rendez-vous incontournable pour la préservation et la promotion des traditions locales : les arts, la musique, la pêche traditionnelle, et l’artisanat y occupent une place centrale. Les visiteurs y découvrent des moments forts comme les régates de barques à voile, les expositions d’art, les soirées culturelles animées par des troupes traditionnelles, ou encore des sorties immersives pour explorer les îlots préservés et les merveilles naturelles de l’archipel.
//                                 </p>
//                                 <p className='my-2'>
//                                   Mais le Festival ne s’arrête pas là. Il incarne également une démarche écologique et durable, en sensibilisant les visiteurs et les habitants à la préservation de l’environnement marin et côtier, grâce à des collaborations avec des acteurs locaux et des projets comme ceux de l’Aire Marine Protégée des îlots nord de Kerkennah. Ainsi, les activités culturelles s’entrelacent avec des initiatives de protection de la biodiversité, faisant du festival un modèle de tourisme responsable et respectueux.
//                                 </p>
//                                 <p className='my-2'>
//                                   Plongez avec nous dans cette aventure unique où tradition, nature et avenir s’unissent pour écrire une histoire commune.
//                                 </p>
//                               </div>
//                       </div>
//              </section>

//              <section className='px-4 '>


//                 <div className='max-w-6xl mx-auto'>
//                     <section className='flex items-start justify-center'>
//                         <div className='w-full flex items-center justify-center my-10'>
//                             <ContainerImageMarine images={images} />
//                         </div>
//                     </section>
//                 </div>
            
//             </section>


//         </div>
//     )
// }

