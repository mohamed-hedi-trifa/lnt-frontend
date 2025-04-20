import React, { useState } from 'react'
import opportunityImage from '../../../assets/images/opportunityImage.jpg'

import PageTitle from '@/components/atoms/titles/PageTitle';
import BenevoleImage from './BenevoleImage';
import PageParagraph from '@/components/atoms/PageParagraph';
import BenevoleForm from './BenevoleForm';
import QuestionEvent from '../Event/QuestionEvent';
import FollowUsEvent from '../Event/FollowUsEvent';
import Question from '@/components/atoms/Question';
import FollowUs from './FollowUs';




export default function Benevole() {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div>
            <main className={`relative`}>

                <div className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${isOpened ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpened(false)}></div>
                <BenevoleImage imgSrc={opportunityImage} />

                <section className="my-5 text-center max-w-7xl mx-auto w-full  mt-20 px-5 ">
                    <PageTitle title='Bénévolat' />
                    <PageParagraph fontWeight="font-semibold" spacing="leading-[1.4]">Bienvenue dans notre programme de bénévolat ! Chez l'Association Kratten du Développement Durable de la Culture et du Loisir, nous valorisons l'engagement communautaire et la participation active pour promouvoir le développement durable et la préservation de l'environnement à Kerkennah</PageParagraph>

                </section>



                <section className='flex gap-15 flex-col sm:flex-row   text-center max-w-7xl w-full mx-auto justify-start items-start  my-16 px-5 h-fit   '>

                    <div className='h-full w-full ' >
                        <BenevoleForm />
                    </div>

                    <div className='flex flex-col h-full w-full md:col-span-1 col-span-2 gap-10  sm:w-[300px] mb-6 sm:mt-0 mt-10'>

                        <FollowUs />
                        <Question />

                    </div>

                </section>




            </main>
        </div>
    )
}
