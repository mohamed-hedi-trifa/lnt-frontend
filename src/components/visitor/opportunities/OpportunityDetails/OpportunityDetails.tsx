import React, { useState } from 'react'
import OpportunityDetailsImage from './OpportunityDetailsImage'
import opportunityDetails from '../../../../assets/images/opportunityDetails.jpg'
import RightSideOpportunityDetails from './RightSideOpportunityDetails';
import OpportunityDetailsContent from './OpportunityDetailsContent';
import JoinUs from '../JoinUs';
import OtherOppertunities from './OtherOppertunities';
import CandidateApplicationForm from './CandidateApplicationForm';

export default function OpportunityDetails() {
    const [isOpened, setIsOpened] = useState(false);
        const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <main className={`relative`}>

                <div className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${isOpened ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpened(false)}></div>
                <OpportunityDetailsImage imgSrc={opportunityDetails} />

                <section className='flex sm:gap-20 gap-12 flex-col sm:grid sm:grid-cols-3    my-5 text-center max-w-7xl w-full mx-auto justify-between  sm:mt-20 mt-10 px-5 h-fit   '>

                    <div className='h-full w-full sm:col-span-2' >
                        <OpportunityDetailsContent />

                    </div>

                    <div className='flex flex-col h-full w-full sm:col-span-1  gap-10'>
                        <RightSideOpportunityDetails />



                    </div>

                </section>
                <div className=' text-center mt-5'>
                    <button className="bg-[#006E9F] w-fit px-7 py-2 rounded-lg text-white font-semibold shadow-lg" onClick={() => setIsOpen(true)}>Postuler Maintenant</button>
                </div>
                
        
                
                            <CandidateApplicationForm isOpen={isOpen} setIsOpen={setIsOpen} />
                <section className=' flex-col  text-center max-w-7xl w-full mx-auto justify-between   px-5 h-fit  my-10 '>

                    <hr className="border-black mb-8" />
                    <OtherOppertunities />
                </section>
            </main>
        </div>
    )
}
