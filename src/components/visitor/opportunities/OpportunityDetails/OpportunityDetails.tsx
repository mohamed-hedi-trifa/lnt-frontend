import React, { useState, useEffect } from 'react'
import axios from "axios";
import OpportunityDetailsImage from './OpportunityDetailsImage'

import RightSideOpportunityDetails from './RightSideOpportunityDetails';
import OpportunityDetailsContent from './OpportunityDetailsContent';
import JoinUs from '../JoinUs';
import OtherOppertunities from './OtherOppertunities';
import CandidateApplicationForm from './CandidateApplicationFormModal';

export default function OpportunityDetails({ location, params }: { location: any; params: any }) {
    const [modalShow, setModalShow] = useState(false);
    const searchParams = new URLSearchParams(location?.search);

    const paramLang = searchParams.get("lang");
    const [language, setLanguage] = useState<string>(paramLang === "fr" ? "fr" : "en");




    const [opportunity, setEvent] = useState([]);
    const [moreOpportunities, setMoreOpportunities] = useState([]);

    const getOpportunity = async (slugOpportunity) => {
        try {
            const response = await axios.get(`/api/opportunities/${slugOpportunity}`);
            setEvent(response.data);
        } catch (error) {
            console.error("Error fetching opportunity types:", error);
        }
    };

    const getMoreOpportunities = async (slugOpportunity) => {
        try {
            const response = await axios.get(`/api/more-opportunities/${slugOpportunity}`);
            setMoreOpportunities(response.data);


        } catch (error) {
            console.error("Error fetching opportunity types:", error);
        }
    };

    useEffect(() => {
        const slugOpportunity = params.slug;
        getOpportunity(slugOpportunity);
        getMoreOpportunities(slugOpportunity);

    }, [location]);
    return (
        <div>
            <main className={`relative`}>

                {/* <div className={`fixed z-40 inset-0 bg-black transition-all duration-500 ${isOpened ? "opacity-50" : "opacity-0 pointer-opportunities-none"}`} onClick={() => setIsOpened(false)}></div> */}
                <OpportunityDetailsImage opportunity={opportunity} />

                <section className='flex sm:gap-20 gap-12 flex-col sm:grid sm:grid-cols-3    my-5 text-center max-w-7xl w-full mx-auto justify-between  sm:mt-20 mt-10 px-5 h-fit   '>

                    <div className='h-full w-full sm:col-span-2' >
                        <OpportunityDetailsContent params={params} location={location} />

                    </div>

                    <div className='flex flex-col h-full w-full sm:col-span-1  gap-10'>
                        <RightSideOpportunityDetails opportunity={opportunity} language={language}/>



                    </div>

                </section>
                <div className=' text-center mt-5'>
                    <button className="bg-[#006E9F] w-fit px-7 py-2 rounded-lg text-white font-semibold shadow-lg"       onClick={() => { setModalShow(true) }}>Postuler Maintenant</button>
                </div>



                <CandidateApplicationForm opportunity={opportunity} show={modalShow} hide={() => { setModalShow(false);  }} />
                <section className=' flex-col  text-center max-w-7xl w-full mx-auto justify-between   px-5 h-fit  my-10 '>

                    <hr className="border-black mb-8" />
                    <OtherOppertunities  moreOpportunities={moreOpportunities}/>
                </section>
            </main>
        </div>
    )
}
