import React, { useEffect, useState } from 'react'
import HeroSection from '../HeroSection';

import newsImage from '../../../assets/images/news.jpg'
import NewsImage from './NewsImage';
import PageParagraph from '@/components/atoms/PageParagraph';
import PageTitle from '@/components/atoms/titles/PageTitle';


import FollowUs from './FollowUs';
import RecentArticle from './RecentArticle';
import PopularNews from './PopularNews';
import Question from './Question';
import PopularCategory from './PopularCategory';
import AllNews from './AllNews';
export default function News() {
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        if (isOpened) {
            document.querySelector("body")!.style.overflow = "hidden";
        } else {
            document.querySelector("body")!.style.overflow = "visible";
        }
    })


    return (

        <main className={`relative`}>

            <div className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${isOpened ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpened(false)}></div>
            <NewsImage imgSrc={newsImage} btnText="Evénement culrurel" paragraph="Journées d'Échange Culturel à Kerkennah : Valorisation du Patrimoine Naturel et Culturel" date="LE 4 OCTOBRE 2024" />

            <section className="my-5 text-center max-w-7xl mx-auto w-full  mt-20 px-10">
                   <PageTitle title='Actualités'  />
                 <PageParagraph fontWeight="font-semibold" spacing="leading-[1.4] mt-10">Découvrez toutes les actualités de l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL). À travers cette page, restez informé des dernières initiatives, des projets en cours, des événements marquants, et des actions menées pour préserver et valoriser le patrimoine naturel et culturel de l’archipel de Kerkennah. Que ce soit des actualités scientifiques, culturelles, ou associatives, chaque article reflète notre engagement envers un avenir durable et solidaire. Explorez, partagez, et plongez au cœur de nos réalisations et de nos ambitions.</PageParagraph>
                                           
            </section>

            <section className='grid grid-cols-3 gap-5 h-7 my-5 text-center max-w-7xl mx-auto w-full  mt-20 px-10 h-fit '>

                <div className='bg-transparent h-full w-full col-span-2 '>
                    <RecentArticle/>
                    <PopularNews/>
                </div>
             
                <div className='h-full w-full col-span-1'>
                    <FollowUs/>
                    <Question/>
                    <PopularCategory/>
                </div>
              
            </section>

            <section className='my-5 text-center max-w-7xl mx-auto w-full  mt-20 px-10'>
            <AllNews/>
            </section>
        </main>
    )
}
