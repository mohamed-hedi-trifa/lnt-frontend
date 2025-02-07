import React from 'react'
import HeaderSection from './HeaderSection'
import recentArticle1 from '../../../assets/images/recentArticle1.jpg'
import recentArticle2 from '../../../assets/images/recentArticle2.jpg'
import NewsImage from './NewsImage';
export default function RecentArticle() {
  return (
    <div >
      <HeaderSection headerName="Articles Récents" />

      <div className="flex justify-between gap-1 h-fit mt-10">

        <div className="relative text-start w-[50.67%] h-[560px]">
          <img className="w-full h-full object-cover rounded-xl" src={recentArticle1} />


          <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 rounded-xl"></div>

          <div className="absolute left-[10px] bottom-[50px] right-[60px]  sm:left-[40px] text-white max-w-3xl flex flex-col gap-2 sm:gap-4">
            <button type="submit" className="rounded-lg bg-black/40 text-white font-semibold py-2 w-fit px-3 text-sm">
              Formation
            </button>
            <div className=" sm:leading-6 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Formation Sur Les Fondamentaux De La Gestion Des Aires Marines Protégées (MPA) Organisée Par MedPAN En Turquie
            </div>

            <div className="flex gap-2 text-white">
              <CalendarIcon />
              <span className="uppercase font-light text-sm">LE 4 OCTOBRE 2024</span>
            </div>
          </div>
        </div>



        <div className="flex flex-col gap-4 items-center justify-between w-[47.67%] h-[560px]">
          {[1, 2, 3].map((item, index) => (
            <div key={index} className="flex items-center overflow-hidden h-1/3 w-full justify-center">
              <div className="flex flex-col p-3 flex-grow text-start gap-1">
                <button type="submit" className="rounded-lg bg-sky-700 hover:bg-sky-900 text-white font-normal py-1 px-3 text-sm w-fit">
                  Suivi scientifique
                </button>
                <div className=" font-semibold mt-2 text-gray-800">
                  Suivi Du Pinna Nobilis (Grande Nacre) À Kerkennah
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Le 2 octobre 2024</span>
                </div>
              </div>
              <img src={recentArticle2} className=" object-cover rounded-xl max-w-[37.67%] h-full" alt="" />
            </div>
          ))}
        </div>
      </div>




    </div>
  )
}

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={20} height={20}>
    <path d="M152 64c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16V16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v48zm192 0c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16V16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v48zM0 128c0-35.3 28.7-64 64-64h32v16c0 26.5 21.5 48 48 48h16c26.5 0 48-21.5 48-48V64h128v16c0 26.5 21.5 48 48 48h16c26.5 0 48-21.5 48-48V64h32c35.3 0 64 28.7 64 64v336c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm48 80v256c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V208H48z"></path>
  </svg>
);