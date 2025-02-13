import React from 'react';


export default function CulturelEventsCard({ image, slug, category, title, date }: { image: string, slug: string, category: string, title: string, date: string }) {

    return (
        <>
            {/* Mobile View */}


            <div className='flex sm:hidden flex-col bg-white shadow-xl gap-4 items-start rounded-2xl sm:min-h-[432px] sm:pb-0 pb-5'>
                <img className="w-full h-[170px] object-cover rounded-t-md" src={image} alt={title} />
                <div className='sm:py-5 sm:px-4 pt-3 sm:pt-0  px-6 text-start w-full sm:w-fit'>
                    <h3 className='font-bold sm:text-sm text-lg'>
                        Atelier de Pêche Durable
                    </h3>
                    <hr className='mt-4' />

                    <div className='text-start sm:text-sm  mt-3 font-medium '>
                        <span className='text-[#0270A0] font-bold '>Lieu : </span>
                        Port de pêche, Kraten
                    </div>

                    <div className='text-start sm:text-sm mt-1 font-medium '>
                        <span className='text-[#0270A0] font-bold'>Date : </span>
                        15 février 2025 à 10:30
                    </div>


                </div>

                <button className="text-white sm:text-xs font-medium self-center rounded-3xl bg-gradient-to-r from-[#51ADC6] to-[#006E9F] w-fit max-w-md sm:py-2 py-[6px] px-6 sm:px-4 
 shadow-[0px_6px_12px_rgba(0,0,0,0.3)] 
 hover:shadow-[0px_10px_20px_rgba(0,0,0,0.4)] 
 hover:opacity-90 transition duration-300 ease-in-out">En savoir plus</button>
            </div>

            {/* Larger Screens */}
            <div className='hidden sm:flex flex-col bg-white rounded-md shadow-xl  pb-4 items-start h-fit '>

                <img className="w-full h-[122px] object-cover rounded-t-md" src={image} alt={title} />

                <div className='py-5 px-4 text-start'>
                    <h3 className='font-bold text-sm '>
                        Atelier de Pêche Durable
                    </h3>
                    <hr className='mt-4' />

                    <div className='text-start text-sm mt-3 font-medium '>
                        <span className='text-[#0270A0] font-bold'>Lieu : </span>
                        Port de pêche, Kraten
                    </div>

                    <div className='text-start text-sm mt-1 font-medium '>
                        <span className='text-[#0270A0] font-bold'>Date : </span>
                        15 février 2025 à 10:30
                    </div>


                </div>

                <button className="text-white text-xs font-medium self-center rounded-3xl bg-gradient-to-r from-[#51ADC6] to-[#006E9F] w-fit max-w-md py-2 px-4 
 shadow-[0px_6px_12px_rgba(0,0,0,0.3)] 
 hover:shadow-[0px_10px_20px_rgba(0,0,0,0.4)] 
 hover:opacity-90 transition duration-300 ease-in-out">En savoir plus</button>

            </div>
        </>
    );
}

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={20} height={20}>
        <path d="M152 64c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16V16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v48zm192 0c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16V16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v48zM0 128c0-35.3 28.7-64 64-64h32v16c0 26.5 21.5 48 48 48h16c26.5 0 48-21.5 48-48V64h128v16c0 26.5 21.5 48 48 48h16c26.5 0 48-21.5 48-48V64h32c35.3 0 64 28.7 64 64v336c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm48 80v256c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V208H48z"></path>
    </svg>
);

