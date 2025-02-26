<<<<<<< HEAD
import React from 'react'

import ContainerImageMarine from '../aire-marine/CotainerImageMarine';
import GallerySection from '../../../pages/our-festival/GallerySection';

const images = [
    {
        title :'Revivez les Éditions Passées',
        description : 'Découvrez les moments marquants des festivals ',
        imageUrl : '/images/festival/fest1.jpg',
    },
    {   
        title :"Découvrez le Prochain Festival",
        description : 'Restez informé des dates et du programme à venir',
        imageUrl : '/images/festival/fest2.jpg',
    }
]

const gallery = [
  '/images/festival/gallery/Mask.png',
  '/images/festival/gallery/Mask-1.png',
  '/images/festival/gallery/Mask-2.png',
  '/images/festival/gallery/Mask-3.png',
  '/images/festival/gallery/Mask-4.png',
  '/images/festival/gallery/Mask-5.png',
  '/images/festival/gallery/Mask-6.png',
  '/images/festival/gallery/Mask-7.png',
  '/images/festival/gallery/Mask-8.png',
  '/images/festival/gallery/Mask-9.png',
  '/images/festival/gallery/Mask-10.png',
]


export default function Festival() {

    return (
        <div className=''>

            <img className='w-full object-cover h-[80vh]' src="/images/festival/cadre.jpg" />

             <div className='flex  items-ceter justify-center'>
                <div className='text-white absolute top-[200px] text-center text-[40px] sm:text-[64px]  font-bold'>
                    <span>Festival de La Culture des </span>
                    <span>Îles Méditerranéennes</span>
                </div>
            
             </div>

             <section className=' flex flex-col md:flex-row  md:justify-center grid-cols-[30%_auto_50%]'>
                      <GallerySection/>
                      <div> </div>
                      <div className='  w-[100%] p-20'>
                              <div className='title text-[32px] sm:text-[40px] font-bold '>
                                <span><span className='text-[#0270A0]'>Un Festival</span> au Cœur de la Culture et de la Nature Méditerranéennes</span>
                              </div>
                              <div className='description text-[18px] sm:text-[20px] text-justify '>
                                <p className='my-2'>
                                  Le Festival de la Culture des Îles Méditerranéennes est un événement annuel emblématique qui célèbre la richesse et la diversité du patrimoine culturel et naturel de l’archipel de Kerkennah. Depuis sa création, il rassemble chaque été des passionnés, des artistes, des habitants et des visiteurs venus des quatre coins du pays et d’ailleurs, autour d’activités culturelles, artistiques et écologiques uniques.
                                </p>
                                <p className='my-2'>
                                  À travers ses différentes éditions, ce festival est devenu un véritable rendez-vous incontournable pour la préservation et la promotion des traditions locales : les arts, la musique, la pêche traditionnelle, et l’artisanat y occupent une place centrale. Les visiteurs y découvrent des moments forts comme les régates de barques à voile, les expositions d’art, les soirées culturelles animées par des troupes traditionnelles, ou encore des sorties immersives pour explorer les îlots préservés et les merveilles naturelles de l’archipel.
                                </p>
                                <p className='my-2'>
                                  Mais le Festival ne s’arrête pas là. Il incarne également une démarche écologique et durable, en sensibilisant les visiteurs et les habitants à la préservation de l’environnement marin et côtier, grâce à des collaborations avec des acteurs locaux et des projets comme ceux de l’Aire Marine Protégée des îlots nord de Kerkennah. Ainsi, les activités culturelles s’entrelacent avec des initiatives de protection de la biodiversité, faisant du festival un modèle de tourisme responsable et respectueux.
                                </p>
                                <p className='my-2'>
                                  Plongez avec nous dans cette aventure unique où tradition, nature et avenir s’unissent pour écrire une histoire commune.
                                </p>
                              </div>
                      </div>
             </section>

             <section className='px-4 '>


                <div className='max-w-6xl mx-auto'>
                    <section className='flex items-start justify-center'>
                        <div className='w-full flex items-center justify-center my-10'>
                            <ContainerImageMarine images={images} />
                        </div>
                    </section>
                </div>
            
            </section>


        </div>
    )
}
=======
import React from 'react'

import ContainerImageMarine from '../aire-marine/CotainerImageMarine';
import GallerySection from '../../../pages/our-festival/GallerySection';

const images = [
    {
        title :'Revivez les Éditions Passées',
        description : 'Découvrez les moments marquants des festivals ',
        imageUrl : '/images/festival/fest1.jpg',
    },
    {   
        title :"Découvrez le Prochain Festival",
        description : 'Restez informé des dates et du programme à venir',
        imageUrl : '/images/festival/fest2.jpg',
    }
]

const gallery = [
  '/images/festival/gallery/Mask.png',
  '/images/festival/gallery/Mask-1.png',
  '/images/festival/gallery/Mask-2.png',
  '/images/festival/gallery/Mask-3.png',
  '/images/festival/gallery/Mask-4.png',
  '/images/festival/gallery/Mask-5.png',
  '/images/festival/gallery/Mask-6.png',
  '/images/festival/gallery/Mask-7.png',
  '/images/festival/gallery/Mask-8.png',
  '/images/festival/gallery/Mask-9.png',
  '/images/festival/gallery/Mask-10.png',
]


export default function Festival() {

    return (
        <div className=''>

            <img className='w-full object-cover h-[80vh]' src="/images/festival/cadre.jpg" />

             <div className='flex  items-ceter justify-center'>
                <div className='text-white absolute top-[200px] text-center text-[40px] sm:text-[64px]  font-bold'>
                    <span>Festival de La Culture des </span>
                    <span>Îles Méditerranéennes</span>
                </div>
            
             </div>

             <section className=' flex flex-col md:flex-row  md:justify-center grid-cols-[30%_auto_50%]'>
                      <GallerySection/>
                      <div> </div>
                      <div className='  w-[100%] p-20'>
                              <div className='title text-[32px] sm:text-[40px] font-bold '>
                                <span><span className='text-[#0270A0]'>Un Festival</span> au Cœur de la Culture et de la Nature Méditerranéennes</span>
                              </div>
                              <div className='description text-[18px] sm:text-[20px] text-justify '>
                                <p className='my-2'>
                                  Le Festival de la Culture des Îles Méditerranéennes est un événement annuel emblématique qui célèbre la richesse et la diversité du patrimoine culturel et naturel de l’archipel de Kerkennah. Depuis sa création, il rassemble chaque été des passionnés, des artistes, des habitants et des visiteurs venus des quatre coins du pays et d’ailleurs, autour d’activités culturelles, artistiques et écologiques uniques.
                                </p>
                                <p className='my-2'>
                                  À travers ses différentes éditions, ce festival est devenu un véritable rendez-vous incontournable pour la préservation et la promotion des traditions locales : les arts, la musique, la pêche traditionnelle, et l’artisanat y occupent une place centrale. Les visiteurs y découvrent des moments forts comme les régates de barques à voile, les expositions d’art, les soirées culturelles animées par des troupes traditionnelles, ou encore des sorties immersives pour explorer les îlots préservés et les merveilles naturelles de l’archipel.
                                </p>
                                <p className='my-2'>
                                  Mais le Festival ne s’arrête pas là. Il incarne également une démarche écologique et durable, en sensibilisant les visiteurs et les habitants à la préservation de l’environnement marin et côtier, grâce à des collaborations avec des acteurs locaux et des projets comme ceux de l’Aire Marine Protégée des îlots nord de Kerkennah. Ainsi, les activités culturelles s’entrelacent avec des initiatives de protection de la biodiversité, faisant du festival un modèle de tourisme responsable et respectueux.
                                </p>
                                <p className='my-2'>
                                  Plongez avec nous dans cette aventure unique où tradition, nature et avenir s’unissent pour écrire une histoire commune.
                                </p>
                              </div>
                      </div>
             </section>

             <section className='px-4 '>


                <div className='max-w-6xl mx-auto'>
                    <section className='flex items-start justify-center'>
                        <div className='w-full flex items-center justify-center my-10'>
                            <ContainerImageMarine images={images} />
                        </div>
                    </section>
                </div>
            
            </section>


        </div>
    )
}
>>>>>>> 92e42f645dca74d846795714bae508fc2edc6a79
