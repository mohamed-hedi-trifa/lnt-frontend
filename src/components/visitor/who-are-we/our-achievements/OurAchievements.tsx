import React from 'react'
import PageTitle from '../../../PageTitle'
import Sidebar from '../../../layout/Sidebar'
import ImageHistoire from '../our-team/ImageHistoire'
import achievementsHero from "../../../../images/achievements-hero.jpg";
import AchievementsCards from './AchievementsCards';

export default function OurAchievements() {

    return (
        <div className=''>
            <img className='w-full object-cover h-[80vh]' src={achievementsHero} />
            <PageTitle title='Our Achievements' width='w-[160px]' />
            <section>
                <div className='max-w-6xl mx-auto'>
                    <section className='w-full flex relative gap-8 py-10'>
                    <Sidebar />

                    <section className='w-fit flex flex-col gap-12'>
                        <div className='text-justify leading-10 text-[22px]'>Depuis sa création, l’Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) s'engage activement pour la préservation de l'archipel de Kerkennah, en alliant développement durable, protection de l’environnement, et valorisation de la culture locale. Nos projets visent à créer un impact positif pour la communauté, en renforçant les pratiques de pêche durable, en célébrant le patrimoine unique de Kerkennah, et en sensibilisant aux défis écologiques de demain. Grâce au soutien de nos partenaires et de la communauté, chaque réalisation contribue à l'essor et à la pérennité de notre île, tout en honorant les anciens membres fondateurs qui ont bâti les bases de cette mission essentielle.</div>
                    </section>
                    </section>

<section>
  <AchievementsCards />
</section>

                <section className='border-t border-[#ADA5A5]'>
                    <ImageHistoire />
                </section>
                </div>
            </section>
        </div>
    )
}
