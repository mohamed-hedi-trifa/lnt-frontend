import React from 'react'
import edition1 from '../../../../assets/images/edition1.jpg'
import edition2 from '../../../../assets/images/edition2.jpg'
import edition3 from '../../../../assets/images/edition3.jpg'
import edition4 from '../../../../assets/images/edition4.jpg'
import edition5 from '../../../../assets/images/edition5.jpg'
import edition6 from '../../../../assets/images/edition6.jpg'
import edition7 from '../../../../assets/images/edition7.jpg'
import edition8 from '../../../../assets/images/edition8.jpg'


export default function AboutFestival() {

    return (
        <div>
            <div className="flex w-full justify-center sm:px-16 md:flex-row flex-col  h-full items-center gap-10">
                <div className="flex flex-col h-full sm:items-start items-center sm:gap-4 gap-8 ">
                    <h1 className='font-bold text-4xl sm:text-start text-center max-w-[400px]'>
                        <span className='text-[#0270A0] mr-1  '>Festival</span>
                        de La Culture des Îles Méditerranéennes
                    </h1>

                    <div className="flex gap-5 ">
                        <div className="flex bg-[#0270A0] rounded-lg px-4 py-3 flex-col max-w-[130px] w-fit justify-start text-start text-white gap-2">
                            <span className='text-2xl font-bold'>8+</span>
                            <p className='font-semibold leading-[17px] text-sm'>Éditions Organisées</p>
                        </div>

                        <div className="flex bg-[#0270A0] rounded-lg p-4 flex-col max-w-[130px] w-fit justify-start text-start text-white gap-2">
                            <span className='text-2xl font-bold'>40+</span>
                            <p className='font-semibold leading-[17px] text-sm'>Événements Réalisés</p>
                        </div>

                     
                    </div>

                </div>

                <div className="flex flex-col rounded-md">
                    <div className="flex">
                        <img className=' object-cover  sm:h-[140px] sm:w-[140px] h-[85px] w-[85px]  rounded-tl-lg' src={edition1} />
                        <img className=' object-cover  sm:h-[140px] sm:w-[140px] h-[85px] w-[85px]' src={edition2} />
                        <img className=' object-cover  sm:h-[140px] sm:w-[140px] h-[85px] w-[85px]' src={edition3} />
                        <img className=' object-cover  sm:h-[140px] sm:w-[140px] h-[85px] w-[85px] rounded-tr-lg' src={edition4} />

                    </div>

                    <div className="flex">
                        <img className=' object-cover  sm:h-[140px] sm:w-[140px] h-[85px] w-[85px]  rounded-bl-lg' src={edition5} />
                        <img className=' object-cover  sm:h-[140px] sm:w-[140px] h-[85px] w-[85px]' src={edition6} />
                        <img className=' object-cover  sm:h-[140px] sm:w-[140px] h-[85px] w-[85px]' src={edition7} />
                        <img className=' object-cover  sm:h-[140px] sm:w-[140px] h-[85px] w-[85px]  rounded-br-lg' src={edition8} />

                    </div>
                </div>
            </div>
        </div>
    )
}
