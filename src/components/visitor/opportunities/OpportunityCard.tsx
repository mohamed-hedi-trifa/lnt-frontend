import { Link } from 'gatsby';
import React from 'react';


export default function OpportunityCard({ opportunity }: { opportunity: any }) {
    const lang = typeof window !== 'undefined' && location?.pathname.startsWith("/fr/") ? "fr" : "en";
    return (
        <>
            {/* Mobile View */}



            {/* Larger Screens */}
            <div className=' sm:flex flex-col  bg-white rounded-xl shadow-2xl    items-start  w-fit sm:h-[402px] h-fit '>
                <div className="flex w-full justify-between px-4 sm:py-2 py-3 items-center">
                    <h4 className='font-bold sm:text-xs '>{opportunity.type}</h4>
                    <span className={`sm:w-2 sm:h-2 w-3 h-3 rounded-[50%] ${opportunity.status === "active" ? "bg-[#29F11B]" : "bg-[#FF0000]"}`}></span>

                </div>

                <img className="w-full sm:h-[122px] h-[202px] object-cover rounded-t-md " src={opportunity.image} alt={opportunity.title} />

                <div className={`py-5 text-start px-5`}>

                    <h3 className='font-medium sm:text-xs  min-h-[29px] '>
                        {opportunity.title}
                    </h3>
                    <h3 className='font-normal text-[10px] mt-2 min-h-[55px] sm:block hidden'>
                        {opportunity.description.length > 120
                            ? opportunity.description.slice(0, opportunity.description.lastIndexOf(" ", 120)) + "..."
                            : opportunity.description}
                    </h3>
                    <h3 className='font-normal sm:text-[10px] text-sm mt-2 sm:min-h-[55px] sm:hidden block'>
                        {opportunity.description}
                    </h3>

                    <hr className='mt-2' />

                    <div className='text-start sm:text-xs  mt-3 font-medium '>
                        <span className='text-[#0270A0] font-bold'>Lieu : </span>
                        Port de pêche, Kraten
                    </div>

                    <div className='text-start sm:text-xs mt-1 font-medium '>
                        <span className='text-[#FF0000] font-bold'>Expire dans : </span>
                        15 Jours
                    </div>


                </div>
                <div  className='w-full text-start self-start  mx-3 '>
                    <Link to={`/event/category1?lang=${lang}`}>
                        <button className="text-white sm:mb-0  mb-5 sm:text-xs  font-medium  self-start rounded-3xl bg-gradient-to-r from-[#51ADC6] to-[#006E9F] w-fit py-2 px-6 
 shadow-[0px_6px_12px_rgba(0,0,0,0.3)] 
 hover:shadow-[0px_10px_20px_rgba(0,0,0,0.4)] 
 hover:opacity-90 transition duration-300 ease-in-out">Voir les détails</button>
                    </Link>
                </div>

            </div>
        </>
    );
}



