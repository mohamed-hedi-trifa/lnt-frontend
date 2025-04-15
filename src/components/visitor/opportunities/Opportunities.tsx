
import React, { useEffect, useState } from "react";
import opportunityImage from '../../../assets/images/opportunityImage.jpg'
import OpportunityImage from './OpportunityImage';
import DisplayOpportinitiesList from './DisplayOpportinitiesList';
import PageTitle from '@/components/atoms/titles/PageTitle';
import JoinUs from './JoinUs';




export default function Opportunities() {
    const [isOpened, setIsOpened] = useState(false);



    return (
        <div>
            <main className={`relative`}>

                <div className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${isOpened ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpened(false)}></div>
                <OpportunityImage imgSrc={opportunityImage} />

                <section className="my-5 text-center max-w-7xl mx-auto w-full  mt-11 px-5 ">
                    <PageTitle title='Opportunités' />

                </section>



                    <div className='w-full ' >
                        <DisplayOpportinitiesList opportunities={[]} />
                    </div>

                <section className=' flex-col  text-center max-w-7xl w-full mx-auto justify-between px-5 h-fit my-20 '>

                    <hr className="border-black mb-8" />
                    <JoinUs />
                </section>



            </main>
        </div>
    )
}
