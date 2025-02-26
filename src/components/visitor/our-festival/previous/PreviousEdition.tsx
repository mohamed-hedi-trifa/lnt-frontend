import React, { useState } from 'react'
import previousEditionImage from '../../../../assets/images/previousEdition.jpg'

import PageTitle from '@/components/atoms/titles/PageTitle';
import FollowUsOpportunity from '../../opportunities/FollowUsOpportunity';
import QuestionEvent from '../../Event/QuestionEvent';
import PreviousEditionImage from './PreviousEditionImage';
import AboutFestival from './AboutFestival';
import DisplayEditionList from './DisplayEditionList';
import { Upcoming } from '@mui/icons-material';
import UpcomingEdition from './UpcomingEdition';




export default function PreviousEdition() {
    const [isOpened, setIsOpened] = useState(false);
    return (
        <div>
            <main className={`relative`}>

                <div className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${isOpened ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpened(false)}></div>
                <PreviousEditionImage imgSrc={previousEditionImage} />

                <section className="my-16 text-center max-w-7xl mx-auto w-full  mt-11 px-5 ">
                    <AboutFestival />
                    <div className="h-[1px] w-full bg-black mb-8 mt-16" />
                </section>



                <section className='flex  flex-col sm:flex-row   text-center sm:max-w-7xl w-full sm:mx-auto justify-start items-start  mt-4 sm:px-5 h-fit   '>

                    <div className='h-full w-full sm:px-6' >
                        <DisplayEditionList />
                    </div>

                    <div className='flex flex-col h-full w-full md:col-span-1 col-span-2 gap-10  sm:w-[260px] mb-6  '>
                        <FollowUsOpportunity />
                        <QuestionEvent />

                    </div>

                </section>
                <section className=' flex-col  text-center max-w-7xl w-full mx-auto justify-between   px-5 h-fit  my-10 '>
                    <div className="h-[1px] w-full bg-black mb-8 mt-16" />

                    <UpcomingEdition />

                </section>



            </main>
        </div>
    )
}
