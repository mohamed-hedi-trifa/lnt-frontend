import React, { useState } from 'react';
import OpportunityCard from '../OpportunityCard';

export default function OtherOppertunities({moreOpportunities} : {moreOpportunities:any}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex flex-col gap-6 items-center sm:px-44'>
            <h2 className='font-bold text-2xl '>
                <span className='text-[#0270A0]'>Découvrez</span> d'autres Opportunités
            </h2>

            <p>
                Explorez nos autres offres et trouvez l'opportunité qui correspond à vos aspirations
            </p>
            <div className='grid sm:grid-cols-3 gap-4 px-4 sm:px-0'>
                {moreOpportunities?.map((opportunity) => (

                    <OpportunityCard opportunity={opportunity} />

                ))}
            </div>





            <div className='w-full '>
                <button className="text-white sm:mb-0  mb-5 sm:text-xs  font-medium  self-start rounded-3xl bg-gradient-to-r from-[#51ADC6] to-[#006E9F] w-fit py-2 px-6 
 shadow-[0px_6px_12px_rgba(0,0,0,0.3)] 
 hover:shadow-[0px_10px_20px_rgba(0,0,0,0.4)] 
 hover:opacity-90 transition duration-300 ease-in-out"
                    >Voir Tous les Opportunités </button>
            </div>

     
        </div >
    );
}
