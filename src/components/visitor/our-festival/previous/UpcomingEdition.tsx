// import React from 'react'
// import edition8 from '../../../../assets/images/edition9.jpg'
// export default function UpcomingEdition() {
//     return (
//         <div>
//             <div className="relative text-center w-full flex justify-center cursor-pointer">
//                 <div className="relative w-[80%] ">
//                     <img
//                         src={edition8}
//                         alt=""
//                         className="h-[250px] w-full rounded-xl shadow-helmi  "
//                     />
//                     <div className="absolute top-0 right-0 w-full h-full bg-black/50" ></div>
//                     <div className="absolute inset-y-0 left-5 max-w-[432px] text-start  flex flex-col justify-center text-white rounded-xl p-3 items-start gap-4">
//                         <h1 className="text-2xl font-bold shadow-lg">Découvrez le Prochain Festival</h1>
//                         <h2 className="text-lg font-bold shadow-lg">Restez informé des dates et du programme à venir</h2>
//                     </div>
//                 </div>
//             </div>



//         </div>
//     )
// }

import React from 'react';
import { Link } from "gatsby";
import LangLink from '@/components/LangLink';


interface UpcomingEditionProps {
    title: string;
    description: string;
    imageUrl: string;
    path: string;
}

const UpcomingEdition: React.FC<UpcomingEditionProps> = ({ title, description, imageUrl, path }) => {
    return (
        <div
            className=" max-w-[355px] lg:w-full lg:max-w-[800px] h-[200px] md:h-[297px] relative bg-cover rounded-[15px] flex items-center justify-center transition-all duration-500 group shadow-helmi"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',       // ou 'contain' selon l'effet souhaité
                backgroundPosition: 'center',  // centre l'image dans le conteneur
                backgroundRepeat: 'no-repeat', // évite la répétition de l'image
            }}
        >
            
            <div className='h-full w-full absolute group-hover:bg-[rgba(0,0,0,0.4)] rounded-[15px]'></div>

            <div className="text-white flex flex-col md:flex items-start justify-center gap-4 sm:gap-6 px-4 sm:px-6 relative">
                <div className="transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-5 flex flex-col gap-6">
                    <p className="font-bold text-[20px] sm:text-[30px] transition-all drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
                        {title}
                    </p>
                    <p className="text-sm font-semibold text-[18px] sm:text-[28px] leading-[20px] sm:leading-[28px] md:leading-[32px] transition-all drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
                        {description}
                    </p>
                </div>
                <div className="images">
                    <div
                        className="justify-center overflow-hidden absolute top-16 md:top-20  right-4  bottom-20 md:right-10  w-[100px] h-[0px] group-hover:h-[100px] duration-300"
                        style={{
                            transition: 'height 2s',
                        }}
                    >
                        <img
                            src="/images/aire_marines/arrow.svg"
                            alt=""
                            className="absolute scale-110 md:scale-150 md:top-4 right-0 md:right-2 "
                            />
                    </div>
                    {/* Image becomes visible after height transition */}
                  
                </div>
            </div>
            <div
                        className="absolute right-2 bottom-2 md:right-8 md:bottom-8  scale-110 md:scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                    >
                        <LangLink to={path}>
                          <img src="/images/aire_marines/button.svg" alt="" className="w-full h-auto "/>
                        </LangLink>
                        
            </div>
        </div>
    );
};

export default UpcomingEdition;

