import React from 'react'
import HeaderSection from './HeaderSection'
import recentArticle1 from '../../../assets/images/recentArticle1.jpg'
import recentArticle2 from '../../../assets/images/recentArticle2.jpg'
import Calendar from "@/assets/icons/Calendar.svg"
export default function RecentArticle() {
  return (
    <div >
      <HeaderSection headerName="Articles Récents" />

      <div className="flex justify-between flex-col sm:flex-row w-full gap-1 h-fit mt-10  font-['Montserrat']">

        <div className="relative text-start sm:w-[52.67%] sm:h-[560px] h-[416px]">
          <img className="w-full h-full object-cover rounded-xl" src={recentArticle1} />


          <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 rounded-xl"></div>

          <div className="absolute left-[30px] bottom-[30px] right-[60px]  sm:left-[40px] text-white max-w-3xl flex flex-col gap-5 sm:gap-5">
            <button type="submit" className="rounded-[3px] bg-white/30 text-white font-semibold py-2 w-fit px-3 text-sm">
              Formation
            </button>
            <div className=" sm:leading-[35.84px] leading-[35.84px] font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-base font-['Montserrat']">
              Formation Sur Les Fondamentaux De La Gestion Des Aires Marines Protégées (MPA) Organisée Par MedPAN En Turquie
            </div>

            <div className="flex gap-2 text-white">
              <img src={Calendar} className='size-6 ' /> 
              <span className="uppercase font-light text-sm">LE 4 OCTOBRE 2024</span>
            </div>
          </div>
        </div>



        <div className="flex flex-col gap-4 items-center justify-between w-full sm:w-[45.67%] h-[560px] mt-10 sm:mt-0 ">
          {[1, 2, 3].map((item, index) => (
            <div key={index} className="flex items-center overflow-hidden h-1/3 w-full justify-center">
              <div className="flex flex-col py-2 sm:p-3 flex-grow text-start gap-2 sm:h-fit h-full justify-between ">
                <button type="submit" className="rounded-lg bg-[#0270A0]  text-white font-normal py-1 px-3 text-sm w-fit">
                  Suivi scientifique
                </button>
                <div className=" font-semibold mt-2 text-gray-800   sm:text-base  text-base  ">
                  Suivi Du Pinna Nobilis (Grande Nacre) À Kerkennah
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                <img src={Calendar} className='size-6' />
                  <span>Le 2 octobre 2024</span>
                </div>
              </div>
              <img src={recentArticle2} className=" object-cover rounded-xl max-w-[46%] sm:max-w-[37.67%] h-full" alt="" />
            </div>
          ))}
        </div>
      </div>




    </div>
  )
}

