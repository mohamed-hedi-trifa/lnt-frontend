import React, { useState } from 'react'
import newsDeteails from '../../../../assets/images/newsDeteails.jpg'
import NewsImage from '../NewsImage';
import Breadcrumbs from '@/components/Breadcumbs';
import LeftSideNewsDetails from './LeftSideNewsDetails';
import FollowUs from '../FollowUs';
import Question from '../Question';
import RelatedNews from './RelatedNews';


export default function NewsDetails() {
    const [isOpened, setIsOpened] = useState(false);
    return (
        <div>
            <main className={`relative`}>

                <div className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${isOpened ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpened(false)}></div>
                <NewsImage imgSrc={newsDeteails} btnText="" paragraph="" date="" />

                {/* <div className="max-w-[1223px] mx-auto mt-3 lg:mt-6 ml-5 sm:ml-0" > */}
                <div className="max-w-[1223px] mx-auto mt-4 lg:mt-6  pl-6 sm:pl-0 ">
                    <Breadcrumbs />
                </div>

                <section className='flex gap-20 sm:flex-row flex-col   my-5 text-center max-w-7xl w-full mx-auto   mt-20 px-5 h-fit  '>

                    <div className=''>
                        <LeftSideNewsDetails />
                    </div>

                    <div className='h-full w-full md:col-span-1 col-span-2 flex flex-col gap-10'>
                        <FollowUs />
                        <Question />
                        <RelatedNews/>

                    </div>

                </section>


            </main>
        </div>
    )
}
