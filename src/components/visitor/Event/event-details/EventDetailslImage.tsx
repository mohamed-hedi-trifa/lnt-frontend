import LocationIcon from '@/assets/icons/LocationIcon';
import React from 'react'



export default function EventDetailslImage({ event }: { event: any }) {
    return (
        <>
            <div className='relative text-start sm:block hidden'>
                <img className='w-full object-cover h-[301px] sm:h-[607px]' src={event.image} />
                <div className='absolute bg-[rgba(0,0,0,0.2)] h-full w-full top-0 left-0'></div>
                <div className='absolute left-[40px] bottom-[40px] right-[60px] sm:bottom-[70px] sm:left-[70px]  text-white max-w-lg flex flex-col gap-3 sm:gap-6'>

                    <div className="flex flex-col gap-5">
                        <h2 className="font-bold text-5xl" style={{ textShadow: "2px 5px rgba(0, 0, 0, 0.5)" }}>
                            {event.title}
                        </h2>


                        <h4 className='text-2xl italic ' style={{ textShadow: "3px 3px rgba(0, 0, 0, 0.3)" }}>{event.description}</h4>
                        <div className="flex items-center sm:gap-4 gap-2">
                            <div className="flex flex-col items-center">
                                <div className="sm:text-3xl text-xl font-bold text-white" style={{ textShadow: "0px 0px 10px #00FFFF" }}>
                                    20
                                </div>
                                <div
                                    className="font-semibold text-[#00FFFF] sm:text-lg text-sm"
                                    style={{ textShadow: "0px 0px 10px #00FFFF" }}
                                >
                                    Jours
                                </div>

                            </div>
                            <div className="w-1 sm:h-16 h-11  bg-[#00FFFF] shadow-lg" style={{ boxShadow: "0px 0px 20px #00FFFF" }}></div>

                            <div className="flex flex-col items-center">
                                <div className="sm:text-3xl text-xl font-bold text-white" style={{ textShadow: "0px 0px 20px #00FFFF" }}>
                                    05
                                </div>
                                <div className="font-bold text-[#00FFFF] sm:text-lg text-sm" style={{ textShadow: "0px 0px 20px #00FFFF" }}>Heures</div>
                            </div>
                            <div className="w-1  sm:h-16 h-11 bg-[#00FFFF] shadow-lg" style={{ boxShadow: "0px 0px 20px #00FFFF" }}></div>

                            <div className="flex flex-col items-center">
                                <div className="sm:text-3xl text-xl font-bold text-white" style={{ textShadow: "0px 0px 20px #00FFFF" }}>
                                    30
                                </div>
                                <div className="font-bold text-[#00FFFF] sm:text-lg text-sm" style={{ textShadow: "0px 0px 20px #00FFFF" }}>Minutes</div>
                            </div>
                        </div>


                    </div>


                </div>

                <div className='absolute  bottom-[40px]  bg-white right-[60px]   w-[400px] flex flex-col gap-3 sm:gap-6 px-5 py-7 rounded-xl'>
                    <div className="flex flex-col gap-5 max-w-xs
                ">
                        <div className="flex flex-col gap-1">
                            <h1 className='font-bold text-xl'>
                                Date & Heure
                            </h1>
                            <p className='text-[#7E7E7E] font-semibold '>24 février 2025, de 9h00 à 13h00</p>
                        </div>

                        <div className="flex flex-col text-[#7E7E7E] gap-1">
                            <h1 className='font-bold text-xl text-black'>
                                Lieu
                            </h1>
                            <p className=' font-semibold'>Port de pêche maritime de Kraten, Kerkennah</p>
                            <a href="" className='flex gap-2 font-semibold '>
                                <span className='text-[#0270A0]'><LocationIcon /></span>
                                Voir la carte
                            </a>
                        </div>



                    </div>
                    <button className='bg-[#0270A0] w-full px-5 py-3 rounded-lg text-white font-semibold'>
                        Ajouter à votre calendrier
                    </button>

                </div>

            </div>

            <div className='relative text-start sm:hidden block'>
                <img className='w-full object-cover h-[301px] sm:h-[607px]' src={event.image} />
                <div className='absolute bg-[rgba(0,0,0,0.2)] h-full w-full top-0 left-0'></div>
                <div className='absolute px-3 left-[40px] bottom-[20px] right-[60px] sm:bottom-[70px] sm:left-[70px]  text-white max-w-lg flex flex-col  '>

                    <div className="flex flex-col gap-3 items-center ">
                        <h2 className="font-bold text-3xl text-center"  style={{ textShadow: "2px 5px rgba(0, 0, 0, 0.5)" }}>
                            {event.title}
                        </h2>


                        <h4 className='text-xl italic text-center font-semibold ' style={{ textShadow: "3px 3px rgba(0, 0, 0, 0.3)" }}>{event.description}</h4>
                        <div className="flex items-center sm:gap-4 gap-2">
                            <div className="flex flex-col items-center">
                                <div className="sm:text-3xl text-xl font-bold text-white" style={{ textShadow: "0px 0px 10px #00FFFF" }}>
                                    20
                                </div>
                                <div
                                    className="font-semibold text-[#00FFFF] sm:text-lg text-sm"
                                    style={{ textShadow: "0px 0px 10px #00FFFF" }}
                                >
                                    Jours
                                </div>

                            </div>
                            <div className="w-1 sm:h-16 h-11  bg-[#00FFFF] shadow-lg" style={{ boxShadow: "0px 0px 20px #00FFFF" }}></div>

                            <div className="flex flex-col items-center">
                                <div className="sm:text-3xl text-xl font-bold text-white" style={{ textShadow: "0px 0px 20px #00FFFF" }}>
                                    05
                                </div>
                                <div className="font-bold text-[#00FFFF] sm:text-lg text-sm" style={{ textShadow: "0px 0px 20px #00FFFF" }}>Heures</div>
                            </div>
                            <div className="w-1  sm:h-16 h-11 bg-[#00FFFF] shadow-lg" style={{ boxShadow: "0px 0px 20px #00FFFF" }}></div>

                            <div className="flex flex-col items-center">
                                <div className="sm:text-3xl text-xl font-bold text-white" style={{ textShadow: "0px 0px 20px #00FFFF" }}>
                                    30
                                </div>
                                <div className="font-bold text-[#00FFFF] sm:text-lg text-sm" style={{ textShadow: "0px 0px 20px #00FFFF" }}>Minutes</div>
                            </div>
                        </div>


                    </div>


                </div>

          

            </div>
        </>

    )
}
